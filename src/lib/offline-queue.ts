/**
 * Cola de operaciones pendientes para el modo offline.
 *
 * Cuando el dispositivo no tiene conexión, las escrituras a Firestore se
 * encolan automáticamente por el SDK. Sin embargo, las notificaciones
 * (emails, in-app) las maneja el servidor (Server Actions). Este módulo
 * guarda en IndexedDB los metadatos necesarios para que el servidor las
 * envíe cuando se recupere la conexión.
 *
 * Estructura de cada entrada:
 * - id          → UUID único de la tarea pendiente
 * - permitId    → ID del documento en Firestore
 * - permitNumber→ Número legible del permiso (ej. PT-1234-ABC123)
 * - type        → Tipo de evento que disparó la notificación
 * - message     → Texto del mensaje de notificación
 * - triggeredBy → {uid, displayName} del usuario que hizo la acción
 * - createdAt   → Timestamp de cuando se encoló (ms)
 * - processed   → true cuando ya fue enviada al servidor con éxito
 */

export type OfflineQueueEntryType =
  | 'permit_created'
  | 'permit_signed'
  | 'status_changed';

export interface OfflineQueueEntry {
  id: string;
  permitId: string;
  permitNumber: string;
  type: OfflineQueueEntryType;
  message: string;
  triggeredBy: { uid: string; displayName: string | null };
  createdAt: number;
  processed: boolean;
}

// ─── IndexedDB helpers ────────────────────────────────────────────────────────

const DB_NAME = 'sgtc_offline';
const STORE_NAME = 'pending_notifications';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('processed', 'processed', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** Genera un UUID v4 simple sin dependencias externas. */
function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * Agrega una nueva tarea pendiente de notificación a la cola.
 */
export async function enqueueNotification(
  entry: Omit<OfflineQueueEntry, 'id' | 'createdAt' | 'processed'>
): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).add({
      ...entry,
      id: uuid(),
      createdAt: Date.now(),
      processed: false,
    } satisfies OfflineQueueEntry);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Devuelve todas las entradas que aún no han sido procesadas.
 * Nota: IDBKeyRange.only() no acepta boolean como clave válida, por lo que
 * se usa getAll() y se filtra en JS.
 */
export async function getPendingEntries(): Promise<OfflineQueueEntry[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () =>
      resolve((req.result as OfflineQueueEntry[]).filter(e => !e.processed));
    req.onerror = () => reject(req.error);
  });
}

/**
 * Marca una entrada como procesada (notificación enviada con éxito).
 */
export async function markEntryProcessed(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(id);
    getReq.onsuccess = () => {
      const entry = getReq.result as OfflineQueueEntry;
      if (entry) {
        store.put({ ...entry, processed: true });
      }
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Elimina todas las entradas ya procesadas (limpieza periódica).
 */
export async function clearProcessedEntries(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => {
      (req.result as OfflineQueueEntry[])
        .filter(e => e.processed)
        .forEach(e => store.delete(e.id));
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Devuelve el número de notificaciones pendientes (para mostrar en el banner).
 * Nota: IDBKeyRange.only() no acepta boolean como clave válida.
 */
export async function getPendingCount(): Promise<number> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () =>
      resolve((req.result as OfflineQueueEntry[]).filter(e => !e.processed).length);
    req.onerror = () => reject(req.error);
  });
}
