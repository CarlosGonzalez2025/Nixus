
'use server';

import twilio from 'twilio';
import type { Permit } from '@/types';

// Load credentials directly from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppFrom = process.env.TWILIO_WHATSAPP_FROM;
const whatsAppTo = process.env.WHATSAPP_TO;

const workTypesMap: {[key: string]: string} = {
  'altura': 'Trabajo en Alturas',
  'confinado': 'Espacios Confinados',
  'energia': 'Control de Energías',
  'izaje': 'Izaje de Cargas',
  'caliente': 'Trabajo en Caliente',
  'excavacion': 'Excavaciones',
  'general': 'Trabajo General'
};

const getWorkTypesString = (types: string[]): string => {
  if (!Array.isArray(types) || types.length === 0) return workTypesMap['general'];
  return types.map(key => workTypesMap[key] || key).join(', ');
}

interface NotificationPayload {
    permitNumber: string;
    solicitante: string;
    workTypes: string[];
    permitId: string;
}

export async function sendWhatsAppNotification(payload: NotificationPayload) {
  if (!accountSid || !authToken || !twilioWhatsAppFrom || !whatsAppTo) {
    console.error('⚠️ [Twilio] Error: Credenciales no configuradas. Las variables de entorno (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM, WHATSAPP_TO) deben estar definidas.');
    // No lanzar error para no detener el flujo principal, solo registrar.
    return { success: false, error: 'Servicio de notificaciones no configurado en el servidor.' };
  }

  const client = twilio(accountSid, authToken);

  const workTypesText = getWorkTypesString(payload.workTypes);

  const messageBody = `*¡Alerta de Seguridad SGPT!* 🚨
Se ha creado una nueva solicitud de permiso de trabajo.

📄 *Número:* ${payload.permitNumber}
👤 *Solicitante:* ${payload.solicitante}
🛠️ *Tipo de Trabajo:* ${workTypesText}

Por favor, revise la solicitud para su aprobación en el siguiente enlace:
https://sgpt-movil.web.app/permits/${payload.permitId}`;

  try {
    console.log(`[Twilio] Intentando enviar notificación a ${whatsAppTo}...`);
    const message = await client.messages.create({
      body: messageBody,
      from: twilioWhatsAppFrom,
      to: whatsAppTo,
    });
    console.log(`✅ [Twilio] Notificación enviada con éxito. SID: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('❌ [Twilio] Falló el envío de la notificación por WhatsApp:', error);
    // No relanzar el error para no afectar la experiencia de usuario.
    // El error ya está registrado en el servidor para depuración.
    return { success: false, error: 'No se pudo enviar la notificación por WhatsApp.' };
  }
}
