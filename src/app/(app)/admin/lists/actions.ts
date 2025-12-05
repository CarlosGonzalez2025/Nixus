'use server';

import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

type ListName = 'areas' | 'plantas' | 'procesos' | 'contratos' | 'empresas';

/**
 * Adds a new item to a specified list in Firestore.
 */
export async function addListItem(listName: ListName, item: string) {
  try {
    const trimmedItem = item.trim();
    if (!trimmedItem) {
      return { success: false, error: 'El elemento no puede estar vacío' };
    }

    const docRef = adminDb.collection('dynamic_lists').doc(listName);
    
    // Verificar si ya existe
    const doc = await docRef.get();
    const currentItems = doc.data()?.items || [];
    
    if (currentItems.includes(trimmedItem)) {
      return { success: false, error: 'El elemento ya existe en la lista' };
    }

    await docRef.set({
      items: FieldValue.arrayUnion(trimmedItem),
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });
    
    revalidatePath('/admin/lists');
    revalidatePath('/permits/create');

    return { success: true };
  } catch (error: any) {
    console.error(`Error adding item to ${listName}:`, error);
    return { success: false, error: `No se pudo agregar el elemento: ${error.message}` };
  }
}

/**
 * Adds multiple items to a specified list in Firestore.
 */
export async function addMultipleListItems(listName: ListName, items: string[]) {
  try {
    const docRef = adminDb.collection('dynamic_lists').doc(listName);
    const doc = await docRef.get();
    const currentItems = doc.data()?.items || [];

    // Filtrar duplicados y vacíos
    const newItems = items
      .map(item => item.trim())
      .filter(item => item && !currentItems.includes(item));

    if (newItems.length === 0) {
      return { 
        success: false, 
        error: 'Todos los elementos ya existen o están vacíos' 
      };
    }

    // Agregar todos los elementos nuevos de una vez
    await docRef.set({
      items: FieldValue.arrayUnion(...newItems),
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });

    revalidatePath('/admin/lists');
    revalidatePath('/permits/create');

    return { 
      success: true, 
      added: newItems.length,
      skipped: items.length - newItems.length 
    };
  } catch (error: any) {
    console.error(`Error adding multiple items to ${listName}:`, error);
    return { 
      success: false, 
      error: `No se pudieron agregar los elementos: ${error.message}` 
    };
  }
}

/**
 * Updates an existing item in a specified list.
 */
export async function updateListItem(listName: ListName, oldItem: string, newItem: string) {
  try {
    const trimmedNewItem = newItem.trim();
    if (!trimmedNewItem) {
      return { success: false, error: 'El elemento no puede estar vacío' };
    }

    const docRef = adminDb.collection('dynamic_lists').doc(listName);
    const doc = await docRef.get();
    const currentItems = doc.data()?.items || [];

    if (!currentItems.includes(oldItem)) {
      return { success: false, error: 'El elemento original no existe' };
    }

    if (currentItems.includes(trimmedNewItem) && trimmedNewItem !== oldItem) {
      return { success: false, error: 'Ya existe un elemento con ese nombre' };
    }

    // Remover el viejo y agregar el nuevo
    await docRef.update({
      items: FieldValue.arrayRemove(oldItem)
    });

    await docRef.update({
      items: FieldValue.arrayUnion(trimmedNewItem),
      updatedAt: FieldValue.serverTimestamp()
    });

    revalidatePath('/admin/lists');
    revalidatePath('/permits/create');

    return { success: true };
  } catch (error: any) {
    console.error(`Error updating item in ${listName}:`, error);
    return { 
      success: false, 
      error: `No se pudo actualizar el elemento: ${error.message}` 
    };
  }
}

/**
 * Removes an item from a specified list in Firestore.
 */
export async function removeListItem(listName: ListName, item: string) {
  try {
    const docRef = adminDb.collection('dynamic_lists').doc(listName);

    await docRef.update({
      items: FieldValue.arrayRemove(item),
      updatedAt: FieldValue.serverTimestamp()
    });
    
    revalidatePath('/admin/lists');
    revalidatePath('/permits/create');
    
    return { success: true };
  } catch (error: any) {
    console.error(`Error removing item from ${listName}:`, error);
    return { 
      success: false, 
      error: `No se pudo eliminar el elemento: ${error.message}` 
    };
  }
}

/**
 * Removes multiple items from a specified list.
 */
export async function removeMultipleListItems(listName: ListName, items: string[]) {
  try {
    const docRef = adminDb.collection('dynamic_lists').doc(listName);

    await docRef.update({
      items: FieldValue.arrayRemove(...items),
      updatedAt: FieldValue.serverTimestamp()
    });
    
    revalidatePath('/admin/lists');
    revalidatePath('/permits/create');
    
    return { success: true, removed: items.length };
  } catch (error: any) {
    console.error(`Error removing multiple items from ${listName}:`, error);
    return { 
      success: false, 
      error: `No se pudieron eliminar los elementos: ${error.message}` 
    };
  }
}
