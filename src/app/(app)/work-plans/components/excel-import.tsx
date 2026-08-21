'use client';

import { useRef, useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';
import { importTasks } from '@/lib/work-plan-service';
import {
  PHVA_OPTIONS, RESOURCE_OPTIONS, FREQUENCY_OPTIONS, HAZARD_OPTIONS, HAZARD_TRANSVERSAL,
} from './constants';
import type { EtapaPHVA, TipoRecurso, FrecuenciaActividad, TareaPlanTrabajo } from '@/types/work-plan';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Upload, Download, FileSpreadsheet, CheckCircle2, XCircle, Loader2, RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Columnas EXACTAS de la plantilla ────────────────────────────────────────────
// `Hazard` es opcional: los archivos generados con la plantilla anterior siguen
// importando y sus actividades quedan como 'Transversal'.
const COLUMNS = ['Activity', 'Hazard', 'PHVA', 'ResourceType', 'ResponsibleName', 'ResponsibleRole', 'Frequency'] as const;

interface ParsedRow {
  rowIndex: number;
  raw: Record<string, string>;
  valid: boolean;
  errors: string[];
  data?: Partial<TareaPlanTrabajo>;
}

// ── Descarga de plantilla ────────────────────────────────────────────────────────
function downloadTemplate() {
  const wb = XLSX.utils.book_new();
  const example = [{
    Activity: 'Inspección de puntos de anclaje',
    Hazard: 'Alturas',
    PHVA: 'Verificar',
    ResourceType: 'Tecnico',
    ResponsibleName: 'Juan Pérez',
    ResponsibleRole: 'Líder SST',
    Frequency: 'Mensual',
  }];
  const ws = XLSX.utils.json_to_sheet(example, { header: COLUMNS as unknown as string[] });
  ws['!cols'] = COLUMNS.map(() => ({ wch: 26 }));
  XLSX.utils.book_append_sheet(wb, ws, 'Actividades');

  // Hoja de valores permitidos como referencia
  const ref: any[] = [
    { Campo: 'Hazard', 'Valores permitidos': `${HAZARD_OPTIONS.join(' | ')}  (opcional — vacío = ${HAZARD_TRANSVERSAL})` },
    { Campo: 'PHVA', 'Valores permitidos': PHVA_OPTIONS.join(' | ') },
    { Campo: 'ResourceType', 'Valores permitidos': `${RESOURCE_OPTIONS.join(' | ')}  (Tecnico = Técnico)` },
    { Campo: 'Frequency', 'Valores permitidos': FREQUENCY_OPTIONS.join(' | ') },
    { Campo: 'Activity', 'Valores permitidos': 'Texto libre — OBLIGATORIO' },
    { Campo: 'ResponsibleName', 'Valores permitidos': 'Texto libre — OBLIGATORIO' },
    { Campo: 'ResponsibleRole', 'Valores permitidos': 'Texto libre — opcional' },
  ];
  const wsRef = XLSX.utils.json_to_sheet(ref);
  wsRef['!cols'] = [{ wch: 18 }, { wch: 70 }];
  XLSX.utils.book_append_sheet(wb, wsRef, 'Valores permitidos');

  XLSX.writeFile(wb, 'plantilla_actividades_plan_trabajo.xlsx');
}

// ── Validación de fila ────────────────────────────────────────────────────────────
function validateRow(raw: Record<string, string>, rowIndex: number): ParsedRow {
  const errors: string[] = [];
  const get = (k: string) => String(raw[k] ?? '').trim();

  const activity = get('Activity');
  const phva = get('PHVA');
  const resourceType = get('ResourceType');
  const responsibleName = get('ResponsibleName');
  const responsibleRole = get('ResponsibleRole');
  const frequency = get('Frequency');
  // Vacío ⇒ 'Transversal', para no invalidar plantillas anteriores al campo.
  const hazard = get('Hazard') || HAZARD_TRANSVERSAL;

  if (!activity) errors.push('Activity es obligatorio');
  if (!responsibleName) errors.push('ResponsibleName es obligatorio');
  if (!HAZARD_OPTIONS.includes(hazard)) errors.push(`Hazard inválido (use: ${HAZARD_OPTIONS.join(', ')})`);
  if (!PHVA_OPTIONS.includes(phva as EtapaPHVA)) errors.push(`PHVA inválido (use: ${PHVA_OPTIONS.join(', ')})`);
  if (!RESOURCE_OPTIONS.includes(resourceType as TipoRecurso)) errors.push(`ResourceType inválido (use: ${RESOURCE_OPTIONS.join(', ')})`);
  if (!FREQUENCY_OPTIONS.includes(frequency as FrecuenciaActividad)) errors.push(`Frequency inválido (use: ${FREQUENCY_OPTIONS.join(', ')})`);

  const valid = errors.length === 0;
  return {
    rowIndex, raw, valid, errors,
    data: valid ? {
      activity,
      hazard,
      phva: phva as EtapaPHVA,
      resourceType: resourceType as TipoRecurso,
      responsibleName,
      responsibleRole,
      frequency: frequency as FrecuenciaActividad,
    } : undefined,
  };
}

type Stage = 'idle' | 'parsing' | 'preview' | 'importing' | 'done';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: string;
}

export function ExcelImport({ open, onOpenChange, planId }: Props) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>('idle');
  const [fileName, setFileName] = useState('');
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [importedCount, setImportedCount] = useState(0);

  const reset = () => {
    setStage('idle'); setFileName(''); setRows([]); setImportedCount(0);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleClose = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  const parseFile = useCallback(async (file: File) => {
    setStage('parsing');
    setFileName(file.name);
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json<Record<string, string>>(ws, { defval: '' });
      const parsed = raw.map((r, i) => validateRow(r, i + 2)); // +2: fila Excel real (1=encabezado)
      setRows(parsed);
      setStage('preview');
    } catch (err: any) {
      toast({ title: 'Error al leer el archivo', description: err?.message, variant: 'destructive' });
      setStage('idle');
    }
  }, [toast]);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(ext ?? '')) {
      toast({ title: 'Formato no válido', description: 'Use .xlsx, .xls o .csv', variant: 'destructive' });
      return;
    }
    parseFile(file);
  };

  const validRows = rows.filter(r => r.valid);
  const errorCount = rows.length - validRows.length;

  const handleImport = async () => {
    if (validRows.length === 0) return;
    setStage('importing');
    try {
      const n = await importTasks(planId, validRows.map(r => r.data!));
      setImportedCount(n);
      setStage('done');
      toast({ title: 'Importación completada', description: `${n} actividad${n !== 1 ? 'es' : ''} importada${n !== 1 ? 's' : ''}.` });
    } catch (err: any) {
      console.error('[ExcelImport]', err);
      toast({ title: 'Error en la importación', description: err?.message, variant: 'destructive' });
      setStage('preview');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importar actividades desde Excel</DialogTitle>
          <DialogDescription>
            Descargue la plantilla, complete las filas y súbala. Solo se importan las filas válidas.
          </DialogDescription>
        </DialogHeader>

        {(stage === 'idle' || stage === 'parsing') && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={downloadTemplate}>
                <Download className="mr-2 h-4 w-4" /> Descargar plantilla
              </Button>
            </div>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer text-center hover:border-nixus hover:bg-muted/30 transition-colors"
            >
              {stage === 'parsing'
                ? <Loader2 className="h-10 w-10 animate-spin text-nixus" />
                : <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />}
              <p className="font-semibold text-sm">
                {stage === 'parsing' ? 'Procesando archivo…' : 'Haz clic para seleccionar el archivo'}
              </p>
              <p className="text-xs text-muted-foreground">Formatos: .xlsx, .xls, .csv</p>
            </div>
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden"
              onChange={e => handleFiles(e.target.files)} />
            <div className="rounded-lg bg-muted/40 border p-3 text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">Columnas de la plantilla (nombres exactos)</p>
              <p>{COLUMNS.join(' · ')}</p>
              <p><span className="font-medium text-foreground">Hazard</span> es opcional: si se deja vacío la actividad se registra como «{HAZARD_TRANSVERSAL}».</p>
            </div>
          </div>
        )}

        {stage === 'preview' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <FileSpreadsheet className="h-4 w-4 text-nixus" />
              <span className="text-sm font-medium truncate max-w-[200px]">{fileName}</span>
              <div className="flex items-center gap-2 ml-auto">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle2 className="mr-1 h-3 w-3" /> {validRows.length} válidas
                </Badge>
                {errorCount > 0 && (
                  <Badge className="bg-red-100 text-red-700">
                    <XCircle className="mr-1 h-3 w-3" /> {errorCount} con errores
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={reset}>
                  <RefreshCw className="mr-1 h-3 w-3" /> Cambiar
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-x-auto max-h-[40vh] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Actividad</TableHead>
                    <TableHead>Peligro</TableHead>
                    <TableHead>PHVA</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map(r => (
                    <TableRow key={r.rowIndex} className={cn(!r.valid && 'bg-red-50')}>
                      <TableCell className="text-xs text-muted-foreground">{r.rowIndex}</TableCell>
                      <TableCell className="text-sm max-w-[220px]">
                        <span className="truncate block">{r.raw.Activity || '—'}</span>
                        {!r.valid && (
                          <ul className="text-[11px] text-red-700 mt-1 space-y-0.5">
                            {r.errors.map((e, i) => <li key={i}>• {e}</li>)}
                          </ul>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{r.raw.Hazard || HAZARD_TRANSVERSAL}</TableCell>
                      <TableCell className="text-sm">{r.raw.PHVA || '—'}</TableCell>
                      <TableCell className="text-sm">{r.raw.ResponsibleName || '—'}</TableCell>
                      <TableCell>
                        {r.valid
                          ? <Badge className="bg-green-100 text-green-800 text-xs"><CheckCircle2 className="mr-1 h-3 w-3" /> OK</Badge>
                          : <Badge className="bg-red-100 text-red-700 text-xs"><XCircle className="mr-1 h-3 w-3" /> Error</Badge>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={reset}>Cancelar</Button>
              <Button onClick={handleImport} disabled={validRows.length === 0}
                className="bg-nixus hover:bg-nixus/90 text-nixus-foreground">
                <Upload className="mr-2 h-4 w-4" />
                Importar {validRows.length} actividad{validRows.length !== 1 ? 'es' : ''}
              </Button>
            </DialogFooter>
          </div>
        )}

        {stage === 'importing' && (
          <div className="py-10 flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-nixus" />
            <p className="font-semibold text-sm">Importando actividades…</p>
          </div>
        )}

        {stage === 'done' && (
          <div className="py-8 flex flex-col items-center gap-4 text-center">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
            <div>
              <p className="font-semibold text-lg">¡Importación exitosa!</p>
              <p className="text-muted-foreground text-sm mt-1">
                {importedCount} actividad{importedCount !== 1 ? 'es' : ''} agregada{importedCount !== 1 ? 's' : ''} al plan.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={reset}>Importar más</Button>
              <Button onClick={() => handleClose(false)} className="bg-nixus hover:bg-nixus/90 text-nixus-foreground">
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
