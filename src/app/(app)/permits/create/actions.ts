
'use server';

import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

/**
 * Adds a new tool to the global 'herramientas' list in Firestore.
 * This action is safe against race conditions and ensures no duplicates.
 */
export async function addUserDefinedTool(toolName: string) {
  try {
    const trimmedName = toolName.trim();
    if (!trimmedName) {
      return { success: false, error: 'El nombre de la herramienta no puede estar vacío.' };
    }

    const docRef = adminDb.collection('dynamic_lists').doc('herramientas');
    
    // Check if the tool already exists to provide better feedback
    const doc = await docRef.get();
    if (doc.exists) { // ✅ CORRECCIÓN: Se usa la propiedad .exists en lugar del método .exists()
        const currentItems: string[] = doc.data()?.items || [];
        if (currentItems.map(item => item.toLowerCase()).includes(trimmedName.toLowerCase())) {
            return { success: false, error: 'Esta herramienta ya está en el catálogo.' };
        }
    }

    // arrayUnion is idempotent, but the check above gives better UI feedback.
    await docRef.set({ 
      items: FieldValue.arrayUnion(trimmedName) 
    }, { merge: true });

    // Revalidate paths where this list is used.
    revalidatePath('/permits/create');
    revalidatePath('/admin/lists');

    return { success: true };
  } catch (error: any) {
    console.error(`Error adding tool:`, error);
    return { success: false, error: `No se pudo agregar la herramienta: ${error.message}` };
  }
}
    
