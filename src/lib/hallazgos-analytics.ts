import type { Hallazgo, HallazgoEstado } from '@/types';
import { HALLAZGO_PELIGRO_OPTIONS, HALLAZGO_PERSONAL_EXPUESTO_OPTIONS } from '@/types';

// ─── Ciclo de vida del hallazgo ────────────────────────────────────────────────
//
//   Pendiente   → reportado, sin acciones iniciadas.
//   En Progreso → plan de acción en ejecución, con avance parcial.
//   Cerrado     → acción implementada y verificada. Estado terminal.
//
// «Completado» existió como estado intermedio entre los dos últimos y se retiró en
// 08/2026: dentro del proceso resultaba ambiguo frente a «Cerrado» y no había
// registros que lo usaran. `estadoDe()` normaliza el valor heredado a 'Cerrado'
// para que un documento antiguo, un import o una escritura offline en cola no
// desaparezcan de listados ni indicadores.

export const HALLAZGO_ESTADOS: HallazgoEstado[] = [
  'Pendiente', 'En Progreso', 'Cerrado',
];

export interface EstadoMeta {
  label: string;
  /** Color hex para gráficos (recharts no acepta clases de Tailwind). */
  color: string;
  /** Clases para badges en tablas y tarjetas. */
  badgeClass: string;
  /** Explicación corta para tooltips/leyendas. */
  help: string;
}

export const ESTADO_META: Record<HallazgoEstado, EstadoMeta> = {
  'Pendiente': {
    label: 'Pendiente',
    color: '#f59e0b',
    badgeClass: 'bg-yellow-100 text-yellow-800',
    help: 'Hallazgo reportado. Aún no se ha iniciado el plan de acción.',
  },
  'En Progreso': {
    label: 'En Progreso',
    color: '#8b5cf6',
    badgeClass: 'bg-purple-100 text-purple-800',
    help: 'Plan de acción en ejecución, con avance parcial registrado.',
  },
  'Cerrado': {
    label: 'Cerrado',
    color: '#16a34a',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    help: 'Acción implementada y verificada, con fecha de cierre y evidencia. Estado terminal del hallazgo.',
  },
};

/** Valor heredado que ya no es un estado válido, con su equivalencia actual. */
const ESTADO_LEGADO: Record<string, HallazgoEstado> = {
  'Completado': 'Cerrado',
};

/** Estados que todavía consumen gestión (aparecen en el backlog abierto). */
export const ESTADOS_ABIERTOS: HallazgoEstado[] = ['Pendiente', 'En Progreso'];

/**
 * Estado del hallazgo, normalizado: mapea valores heredados y cualquier cadena
 * desconocida a un estado válido, para que ningún registro quede fuera de los
 * filtros por estado.
 */
export const estadoDe = (h: Pick<Hallazgo, 'cumplimientoEstado'>): HallazgoEstado => {
  const raw = h.cumplimientoEstado;
  if (!raw) return 'Pendiente';
  if (HALLAZGO_ESTADOS.includes(raw as HallazgoEstado)) return raw as HallazgoEstado;
  return ESTADO_LEGADO[raw] ?? 'Pendiente';
};

export const esAbierto = (h: Pick<Hallazgo, 'cumplimientoEstado'>) =>
  ESTADOS_ABIERTOS.includes(estadoDe(h));

/** Resuelto = cerrado. Se conserva el nombre porque es el término de los indicadores. */
export const esResuelto = (h: Pick<Hallazgo, 'cumplimientoEstado'>) => !esAbierto(h);

export const avanceDe = (
  h: Pick<Hallazgo, 'porcentajeCumplimientoTotal' | 'porcentajeCumplimiento'>,
) => h.porcentajeCumplimientoTotal ?? h.porcentajeCumplimiento ?? 0;

// ─── Peligros / programas ──────────────────────────────────────────────────────
//
// `peligroInspeccionado` es multi-selección persistida como texto con una opción
// por línea (mismo formato que usan el formulario y la importación masiva). Un
// hallazgo puede pertenecer a varios programas, de modo que la suma por programa
// puede superar el total de hallazgos: es intencional y así se advierte en la UI.

export const PELIGRO_CATALOGO: readonly string[] = HALLAZGO_PELIGRO_OPTIONS;
export const PELIGRO_SIN_CLASIFICAR = 'Sin clasificar';
/** Grupo único donde colapsa todo el texto libre capturado en «Otros». */
export const PELIGRO_OTROS = 'Otros';

/**
 * Ejes fijos de los gráficos: los cinco peligros estándar más «Otros».
 *
 * Deliberadamente NO se abre un eje por cada texto libre: en producción hay decenas
 * de variantes escritas a mano ("Trabajo en alturas: Uso de sistemas de acceso.",
 * "Sustancia quimica", …) que vuelven ilegibles el radar y la matriz. El detalle de
 * esas variantes se consulta con `detalleOtrosPeligros()`.
 */
export const EJES_PELIGRO: string[] = [...PELIGRO_CATALOGO, PELIGRO_OTROS];

/** Paleta estable por programa. */
export const PELIGRO_COLORS: Record<string, string> = {
  'Alturas': '#2563eb',
  'Espacios Confinados': '#7c3aed',
  'Energías Peligrosas': '#f59e0b',
  'Izaje de Cargas': '#0891b2',
  'Excavaciones': '#b45309',
  [PELIGRO_OTROS]: '#64748b',
  [PELIGRO_SIN_CLASIFICAR]: '#cbd5e1',
};

const PALETA_EXTRA = ['#db2777', '#059669', '#4f46e5', '#ea580c', '#0d9488'];

export function colorDePeligro(peligro: string, index = 0): string {
  return PELIGRO_COLORS[peligro] ?? PALETA_EXTRA[index % PALETA_EXTRA.length];
}

/** Separadores de registros heredados que guardaron varias opciones en una línea. */
const SEPARADORES_COMBINADOS = /\s*[,;|]\s*/;

/**
 * Divide un campo de multi-selección (peligro, personal expuesto…) en sus opciones.
 *
 * Además de partir por salto de línea (el formato que escriben el formulario y la
 * importación), desarma las líneas que concatenan varias opciones del catálogo
 * —"Alturas, Espacios Confinados"— para que cada una cuente por separado y no
 * aparezca como una categoría propia. Solo se divide cuando TODOS los trozos son
 * del catálogo: así un texto libre que legítimamente lleva comas queda intacto.
 */
function splitMultiOpcion(raw: string | null | undefined, catalogo: readonly string[]): string[] {
  if (!raw) return [];
  const salida: string[] = [];

  for (const linea of raw.split('\n').map(p => p.trim()).filter(Boolean)) {
    if (catalogo.includes(linea)) {
      salida.push(linea);
      continue;
    }
    const trozos = linea.split(SEPARADORES_COMBINADOS).map(t => t.trim()).filter(Boolean);
    if (trozos.length > 1 && trozos.every(t => catalogo.includes(t))) {
      salida.push(...trozos);
    } else {
      salida.push(linea);
    }
  }

  return Array.from(new Set(salida));
}

export const parsePeligros = (raw?: string | null): string[] =>
  splitMultiOpcion(raw, PELIGRO_CATALOGO);

/** Peligros del hallazgo tal cual se registraron; nunca vacío. */
export function peligrosDe(h: Pick<Hallazgo, 'peligroInspeccionado'>): string[] {
  const list = parsePeligros(h.peligroInspeccionado);
  return list.length > 0 ? list : [PELIGRO_SIN_CLASIFICAR];
}

/**
 * Peligros del hallazgo reducidos a los ejes estándar. Todo texto libre colapsa en
 * «Otros»; el `Set` evita que un hallazgo con tres textos libres cuente tres veces.
 */
export function peligrosEstandar(h: Pick<Hallazgo, 'peligroInspeccionado'>): string[] {
  const lista = parsePeligros(h.peligroInspeccionado);
  if (lista.length === 0) return [PELIGRO_SIN_CLASIFICAR];
  return Array.from(new Set(
    lista.map(p => (PELIGRO_CATALOGO.includes(p) ? p : PELIGRO_OTROS)),
  ));
}

/**
 * Catálogo base + cada peligro "Otros" registrado. Sirve para poblar filtros donde
 * sí interesa elegir un texto libre concreto; NO usar como ejes de un gráfico.
 */
export function catalogoPeligrosDe(hallazgos: Pick<Hallazgo, 'peligroInspeccionado'>[]): string[] {
  const extras = new Set<string>();
  hallazgos.forEach(h => {
    parsePeligros(h.peligroInspeccionado).forEach(p => {
      if (!PELIGRO_CATALOGO.includes(p)) extras.add(p);
    });
  });
  return [...PELIGRO_CATALOGO, ...Array.from(extras).sort()];
}

// ─── Personal expuesto ─────────────────────────────────────────────────────────
//
// Mismo formato que el peligro: multi-selección persistida con una opción por
// línea. Un hallazgo puede exponer a personal propio Y contratista a la vez, así
// que la suma por categoría puede superar el total de hallazgos.

export const PERSONAL_CATALOGO: readonly string[] = HALLAZGO_PERSONAL_EXPUESTO_OPTIONS;
export const PERSONAL_SIN_ESPECIFICAR = 'Sin especificar';

export const PERSONAL_COLORS: Record<string, string> = {
  'Propio': '#0891b2',
  'Contratistas': '#db2777',
  [PERSONAL_SIN_ESPECIFICAR]: '#cbd5e1',
};

export const colorDePersonal = (v: string) => PERSONAL_COLORS[v] ?? '#94a3b8';

export const parsePersonalExpuesto = (raw?: string | null): string[] =>
  splitMultiOpcion(raw, PERSONAL_CATALOGO);

/** Personal expuesto del hallazgo; nunca vacío. */
export function personalExpuestoDe(h: Pick<Hallazgo, 'personalExpuesto'>): string[] {
  const lista = parsePersonalExpuesto(h.personalExpuesto);
  return lista.length > 0 ? lista : [PERSONAL_SIN_ESPECIFICAR];
}

/** Catálogo + «Sin especificar» solo si hay hallazgos que no lo registraron. */
export function catalogoPersonalDe(hallazgos: Pick<Hallazgo, 'personalExpuesto'>[]): string[] {
  const extras = new Set<string>();
  let haySinEspecificar = false;
  hallazgos.forEach(h => {
    const lista = parsePersonalExpuesto(h.personalExpuesto);
    if (lista.length === 0) haySinEspecificar = true;
    lista.forEach(v => { if (!PERSONAL_CATALOGO.includes(v)) extras.add(v); });
  });
  return [
    ...PERSONAL_CATALOGO,
    ...Array.from(extras).sort(),
    ...(haySinEspecificar ? [PERSONAL_SIN_ESPECIFICAR] : []),
  ];
}

// ─── Agregados ─────────────────────────────────────────────────────────────────

const norm = (s?: string | null) => (!s || s.trim() === '' ? 'No especificado' : s.trim());

const pct = (parte: number, total: number) => (total === 0 ? 0 : Math.round((parte / total) * 100));

export interface EstadoBreakdown {
  total: number;
  Pendiente: number;
  'En Progreso': number;
  Cerrado: number;
  /** Pendiente + En Progreso. */
  abiertos: number;
  /** Cerrados. */
  resueltos: number;
  /** % de hallazgos cerrados sobre el total. */
  pctResueltos: number;
  /** Promedio del % de cumplimiento reportado. */
  avancePromedio: number;
}

type HallazgoLike = Pick<
  Hallazgo,
  'cumplimientoEstado' | 'porcentajeCumplimientoTotal' | 'porcentajeCumplimiento' | 'clase'
>;

export function breakdownEstados(hallazgos: HallazgoLike[]): EstadoBreakdown {
  const total = hallazgos.length;
  const conteo: Record<HallazgoEstado, number> = {
    'Pendiente': 0, 'En Progreso': 0, 'Cerrado': 0,
  };
  let sumaAvance = 0;

  hallazgos.forEach(h => {
    conteo[estadoDe(h)] += 1;
    sumaAvance += avanceDe(h);
  });

  const abiertos = conteo['Pendiente'] + conteo['En Progreso'];
  const resueltos = conteo['Cerrado'];

  return {
    total,
    ...conteo,
    abiertos,
    resueltos,
    pctResueltos: pct(resueltos, total),
    avancePromedio: total === 0 ? 0 : Math.round(sumaAvance / total),
  };
}

export interface PersonalResumen extends EstadoBreakdown {
  categoria: string;
  color: string;
}

/**
 * Distribución y desempeño por tipo de personal expuesto (propio / contratistas).
 * Un hallazgo puede exponer a ambos, así que la suma puede superar el total.
 */
export function resumenPorPersonal(hallazgos: Hallazgo[]): PersonalResumen[] {
  return catalogoPersonalDe(hallazgos).map(categoria => ({
    categoria,
    color: colorDePersonal(categoria),
    ...breakdownEstados(hallazgos.filter(h => personalExpuestoDe(h).includes(categoria))),
  }));
}

export interface PlantaCobertura extends EstadoBreakdown {
  planta: string;
  /** Hallazgos por programa (un hallazgo puede sumar en varios). */
  porPrograma: Record<string, number>;
  /** Programas del catálogo con al menos un hallazgo registrado en la planta. */
  programasCubiertos: number;
  /** programasCubiertos / catálogo * 100 — qué tan completo es el barrido. */
  pctCobertura: number;
  /** Clase A todavía sin resolver: el indicador de riesgo más urgente. */
  claseAAbiertos: number;
}

/**
 * Cobertura y desempeño por planta sobre los ejes estándar (5 peligros + «Otros»).
 *
 * La cobertura se mide SOLO contra los cinco peligros del catálogo: «Otros» no es un
 * programa formal, así que sumarlo inflaría artificialmente el porcentaje.
 */
export function coberturaPorPlanta(hallazgos: Hallazgo[]): PlantaCobertura[] {
  const grupos = new Map<string, Hallazgo[]>();
  hallazgos.forEach(h => {
    const planta = norm(h.planta);
    const arr = grupos.get(planta);
    if (arr) arr.push(h);
    else grupos.set(planta, [h]);
  });

  const filas: PlantaCobertura[] = [];
  grupos.forEach((items, planta) => {
    const porPrograma: Record<string, number> = {};
    EJES_PELIGRO.forEach(p => { porPrograma[p] = 0; });

    items.forEach(h => {
      peligrosEstandar(h).forEach(p => {
        porPrograma[p] = (porPrograma[p] ?? 0) + 1;
      });
    });

    const programasCubiertos = PELIGRO_CATALOGO.filter(p => (porPrograma[p] ?? 0) > 0).length;

    filas.push({
      planta,
      ...breakdownEstados(items),
      porPrograma,
      programasCubiertos,
      pctCobertura: pct(programasCubiertos, PELIGRO_CATALOGO.length),
      claseAAbiertos: items.filter(h => h.clase === 'A' && esAbierto(h)).length,
    });
  });

  return filas.sort((a, b) => b.total - a.total);
}

export interface ProgramaResumen extends EstadoBreakdown {
  programa: string;
  color: string;
  /** Plantas distintas donde se ha registrado al menos un hallazgo del programa. */
  plantasCubiertas: number;
}

/** Desempeño por programa sobre los ejes estándar (5 peligros + «Otros»). */
export function resumenPorPrograma(hallazgos: Hallazgo[]): ProgramaResumen[] {
  return EJES_PELIGRO.map((programa, i) => {
    const items = hallazgos.filter(h => peligrosEstandar(h).includes(programa));
    const plantas = new Set(items.map(h => norm(h.planta)));
    return {
      programa,
      color: colorDePeligro(programa, i),
      plantasCubiertas: plantas.size,
      ...breakdownEstados(items),
    };
  });
}

/**
 * Desglose de lo que hay dentro de «Otros»: cada peligro escrito a mano, con su
 * propio desempeño y ordenado por volumen. Es el detalle que los gráficos omiten
 * a propósito para no volverse ilegibles.
 */
export function detalleOtrosPeligros(hallazgos: Hallazgo[]): ProgramaResumen[] {
  const etiquetas = new Set<string>();
  hallazgos.forEach(h => {
    parsePeligros(h.peligroInspeccionado).forEach(p => {
      if (!PELIGRO_CATALOGO.includes(p)) etiquetas.add(p);
    });
  });

  return Array.from(etiquetas)
    .map((programa, i) => {
      const items = hallazgos.filter(h => parsePeligros(h.peligroInspeccionado).includes(programa));
      const plantas = new Set(items.map(h => norm(h.planta)));
      return {
        programa,
        color: colorDePeligro(PELIGRO_OTROS, i),
        plantasCubiertas: plantas.size,
        ...breakdownEstados(items),
      };
    })
    .sort((a, b) => b.total - a.total);
}
