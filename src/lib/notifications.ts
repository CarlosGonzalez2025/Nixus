
'use server';

import twilio from 'twilio';

// Load credentials directly from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppFrom = process.env.TWILIO_WHATSAPP_FROM;
const whatsAppTo = process.env.WHATSAPP_TO;

export async function sendWhatsAppNotification(messageBody: string) {
  if (!accountSid || !authToken || !twilioWhatsAppFrom || !whatsAppTo) {
    console.error('⚠️ [Twilio] Error: Credenciales no configuradas. Las variables de entorno (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM, WHATSAPP_TO) deben estar definidas.');
    // No lanzar error para no detener el flujo principal, solo registrar.
    return { success: false, error: 'Servicio de notificaciones no configurado en el servidor.' };
  }

  const client = twilio(accountSid, authToken);

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
