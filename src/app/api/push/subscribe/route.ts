import { NextResponse } from 'next/server';
import { adminDb, isAdminReady } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

/**
 * POST /api/push/subscribe
 * Guarda o actualiza la suscripción Web Push del usuario en Firestore.
 * Body: { userId: string, subscription: PushSubscriptionJSON }
 */
export async function POST(req: Request) {
  try {
    if (!isAdminReady()) return NextResponse.json({ error: 'Admin SDK no disponible' }, { status: 503 });

    const { userId, subscription } = await req.json();
    if (!userId || !subscription?.endpoint) {
      return NextResponse.json({ error: 'userId y subscription son requeridos' }, { status: 400 });
    }

    // Usamos el endpoint como ID único de suscripción (hash-safe: base64url)
    const endpointHash = Buffer.from(subscription.endpoint).toString('base64').slice(0, 64);
    await adminDb
      .collection('push_subscriptions')
      .doc(`${userId}_${endpointHash}`)
      .set({ userId, subscription, updatedAt: FieldValue.serverTimestamp() });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Push/Subscribe]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE /api/push/subscribe
 * Elimina la suscripción Web Push del usuario (cuando revoca el permiso).
 * Body: { userId: string, endpoint: string }
 */
export async function DELETE(req: Request) {
  try {
    if (!isAdminReady()) return NextResponse.json({ error: 'Admin SDK no disponible' }, { status: 503 });

    const { userId, endpoint } = await req.json();
    if (!userId || !endpoint) {
      return NextResponse.json({ error: 'userId y endpoint son requeridos' }, { status: 400 });
    }

    const endpointHash = Buffer.from(endpoint).toString('base64').slice(0, 64);
    await adminDb
      .collection('push_subscriptions')
      .doc(`${userId}_${endpointHash}`)
      .delete();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Push/Unsubscribe]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
