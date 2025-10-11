
'use server';

import twilio from 'twilio';
import type { Permit } from '@/types';
import { config } from 'dotenv';

// Cargar explícitamente las variables de entorno del archivo .env
config();

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
    console.error('Twilio credentials or phone numbers are not configured in environment variables.');
    throw new Error('Notification service is not configured.');
  }

  const client = twilio(accountSid, authToken);

  const workTypesText = getWorkTypesString(payload.workTypes);

  const messageBody = `*¡Alerta de Seguridad SGPT!* 🚨
Se ha creado una nueva solicitud de permiso de trabajo.

📄 *Número:* ${payload.permitNumber}
👤 *Solicitante:* ${payload.solicitante}
🛠️ *Tipo de Trabajo:* ${workTypesText}

Por favor, revise la solicitud para su aprobación.`;

  try {
    const message = await client.messages.create({
      body: messageBody,
      from: twilioWhatsAppFrom,
      to: whatsAppTo,
    });
    console.log(`Message sent with SID: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    throw error;
  }
}
