'use server';

import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

type ListName = 'areas' | 'plantas' | 'procesos'; // Add more list names as needed

/**
 * Adds a new item to a specified list in Firestore.
 * @param listName - The name of the list document in the `dynamic_lists` collection.
 * @param item - The string item to add to the list.
 */
export async function addListItem(listName: ListName, item: string) {
  try {
    const docRef = adminDb.collection('dynamic_lists').doc(listName);
    
    await docRef.set({
      items: FieldValue.arrayUnion(item)
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
 * Removes an item from a specified list in Firestore.
 * @param listName - The name of the list document in the `dynamic_lists` collection.
 * @param item - The string item to remove from the list.
 */
export async function removeListItem(listName: ListName, item: string) {
  try {
    const docRef = adminDb.collection('dynamic_lists').doc(listName);

    await docRef.update({
      items: FieldValue.arrayRemove(item)
    });
    
    revalidatePath('/admin/lists');
    revalidatePath('/permits/create');
    
    return { success: true };
  } catch (error: any) {
    console.error(`Error removing item from ${listName}:`, error);
    return { success: false, error: `No se pudo eliminar el elemento: ${error.message}` };
  }
}
