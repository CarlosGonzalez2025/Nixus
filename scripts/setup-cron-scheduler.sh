#!/usr/bin/env bash
#
# Registra los crons del sistema en Google Cloud Scheduler.
#
# POR QUÉ ESTE SCRIPT
# El proyecto está desplegado en Firebase App Hosting, que NO ejecuta las
# definiciones de `vercel.json` — ese archivo solo lo lee Vercel. Los endpoints
# /api/cron/* existen y responden, pero sin un disparador externo nadie los
# llama. Cloud Scheduler es ese disparador.
#
# VENTAJAS SOBRE VERCEL CRON
#   · Acepta zona horaria nativa: se programa en America/Bogota directamente,
#     sin convertir a UTC ni compensar horarios de verano.
#   · Sin el límite de 2 jobs diarios del plan Hobby de Vercel, así que el
#     barrido de alertas puede correr cada hora (necesario para que la regla
#     `jornada_por_terminar` caiga dentro de su ventana de 4 h).
#   · Nivel gratuito: 3 jobs por cuenta de facturación. Aquí se usan 2.
#
# USO
#   gcloud auth login                       # las credenciales caducan seguido
#   bash scripts/setup-cron-scheduler.sh    # crea o actualiza ambos jobs
#
# Es idempotente: si el job ya existe lo actualiza en vez de fallar.

set -euo pipefail

PROJECT="${PROJECT:-studio-7636781267-6dc02}"
REGION="${REGION:-us-central1}"
TIMEZONE="America/Bogota"

# URL pública del backend de App Hosting. Debe coincidir con la variable
# NEXT_PUBLIC_BASE_URL del entorno, que es la que arma los enlaces de los
# correos y de las notificaciones push.
# (El dominio sistedigital.net se usa como remitente de correo, no como host
#  de la aplicación.)
BASE_URL="${BASE_URL:-https://studio--studio-7636781267-6dc02.us-central1.hosted.app}"

# Debe coincidir EXACTAMENTE con la variable CRON_SECRET del backend.
# No la escriba aquí: expórtela antes de ejecutar.
#   export CRON_SECRET='...'
CRON_SECRET="${CRON_SECRET:-}"

if [[ -z "$CRON_SECRET" ]]; then
  echo "ERROR: exporte CRON_SECRET antes de ejecutar." >&2
  echo "  export CRON_SECRET='<el mismo valor del backend>'" >&2
  exit 1
fi

echo "Proyecto : $PROJECT"
echo "Región   : $REGION"
echo "Backend  : $BASE_URL"
echo ""

gcloud services enable cloudscheduler.googleapis.com --project="$PROJECT"

# crear_o_actualizar <nombre> <horario> <ruta> <descripción>
crear_o_actualizar() {
  local nombre="$1" horario="$2" ruta="$3" descripcion="$4"
  local accion="create"

  if gcloud scheduler jobs describe "$nombre" \
       --project="$PROJECT" --location="$REGION" >/dev/null 2>&1; then
    accion="update"
  fi

  gcloud scheduler jobs "$accion" http "$nombre" \
    --project="$PROJECT" \
    --location="$REGION" \
    --schedule="$horario" \
    --time-zone="$TIMEZONE" \
    --uri="${BASE_URL}${ruta}" \
    --http-method=GET \
    --headers="Authorization=Bearer ${CRON_SECRET}" \
    --attempt-deadline=540s \
    --description="$descripcion"

  echo "  [$accion] $nombre — $horario ($TIMEZONE) → $ruta"
}

# ── Alertas tempranas de permisos ─────────────────────────────────────────────
# Cada hora: la mayoría de las reglas son de granularidad diaria y se disparan
# en la primera corrida del día, pero `jornada_por_terminar` necesita frecuencia
# horaria para caer dentro de su ventana de 4 h antes del vencimiento.
# El registro anti-duplicados (permit.alertas) impide que las 24 corridas
# repitan un aviso ya enviado.
crear_o_actualizar \
  "permit-alerts" \
  "0 * * * *" \
  "/api/cron/permit-alerts" \
  "SGTC — alertas tempranas de permisos (firmas, jornadas y cierres pendientes)"

# ── Resumen diario de hallazgos ───────────────────────────────────────────────
# 19:00 hora Colombia, que es la hora a la que venía apuntando la configuración
# anterior. Si se quiere cubrir el día completo (hoy los hallazgos creados entre
# las 19:00 y la medianoche no entran en ningún resumen), cambiar a "55 23 * * *"
# — decisión del cliente, porque mueve la hora de llegada del correo.
crear_o_actualizar \
  "hallazgos-daily-summary" \
  "0 19 * * *" \
  "/api/cron/hallazgos-daily-summary" \
  "SGTC — resumen diario de hallazgos para administradores"

echo ""
echo "Listo. Verificar con:"
echo "  gcloud scheduler jobs list --project=$PROJECT --location=$REGION"
echo ""
echo "Ejecución manual de prueba (sin esperar al horario):"
echo "  gcloud scheduler jobs run permit-alerts --project=$PROJECT --location=$REGION"
echo ""
echo "IMPORTANTE: antes de la primera corrida real, lanzar el ensayo en seco:"
echo "  curl -H \"Authorization: Bearer \$CRON_SECRET\" \"$BASE_URL/api/cron/permit-alerts?dryRun=1\""
