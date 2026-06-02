'use client';

import React, { useState, useCallback, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { validateImportRows, executeImport } from './actions';
import type { RawImportRow, RowResult, ValidationResult, ExecuteResult } from './actions';

// Duplicado de la función en actions.ts para evitar importar código server en el cliente.
function normalizeClase(raw: string): string {
  return raw.trim().replace(/^Clase\s*/i, '').toUpperCase();
}
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Upload, Download, FileSpreadsheet, CheckCircle2, XCircle,
  AlertTriangle, ArrowLeft, Loader2, ChevronDown, ChevronRight,
  FileX, RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Mapeo columna Excel → campo interno ─────────────────────────────────────
// Las claves deben coincidir exactamente con los encabezados de la plantilla.
// Se incluyen variantes sin tilde para mayor tolerancia.
const COLUMN_TO_FIELD: Record<string, string> = {
  'Empresa': 'empresa',
  'Planta': 'planta',
  'Área': 'area',
  'Area': 'area',
  'Tipo de Actividad': 'tipoActividad',
  'Fecha Visita': 'fechaVisita',
  'Latitud': 'lat',
  'Longitud': 'lng',
  'Peligro Inspeccionado': 'peligroInspeccionado',
  'Personal Expuesto': 'personalExpuesto',
  'Hallazgo': 'hallazgo',
  'Clase': 'clase',
  'Intervención': 'intervencion',
  'Intervencion': 'intervencion',
  'Descripción (Recomendaciones)': 'descripcion',
  'Descripcion (Recomendaciones)': 'descripcion',
  'Descripción': 'descripcion',
  'Descripcion': 'descripcion',
  'Acción Inmediata': 'accionInmediata',
  'Accion Inmediata': 'accionInmediata',
  'Reportado Por (Nombre)': 'reportadoPorNombre',
  'Cargo Reportador': 'reportadoPorCargo',
  'Responsable Plan de Acción': 'responsable',
  'Responsable Plan de Accion': 'responsable',
  'Fecha Medida Implementada': 'fechaMedidaImplementada',
  'Fecha Seguimiento': 'fechaSeguimiento1',
  'Fecha Cierre': 'fechaCierre',
  '% Cumplimiento': 'porcentajeCumplimiento',
  '% Cumplimiento Total': 'porcentajeCumplimientoTotal',
  'Estado Cumplimiento': 'cumplimientoEstado',
  'Observación': 'observacion',
  'Observacion': 'observacion',
};

// ─── Definición de la plantilla ───────────────────────────────────────────────
const TEMPLATE_COLS = [
  { header: 'Empresa',                     req: true,  example: 'Italcol S.A.',                                 note: 'Nombre de la empresa' },
  { header: 'Planta',                      req: true,  example: 'Planta Principal',                             note: 'Nombre de la planta' },
  { header: 'Área',                        req: true,  example: 'Producción',                                   note: 'Área del hallazgo' },
  { header: 'Tipo de Actividad',           req: true,  example: 'Rutinario',                                    note: 'Rutinario o No Rutinario' },
  { header: 'Fecha Visita',                req: true,  example: '15/06/2024',                                   note: 'Formato dd/mm/yyyy' },
  { header: 'Latitud',                     req: false, example: '4.710989',                                     note: 'Decimal (ej: 4.710989) — opcional' },
  { header: 'Longitud',                    req: false, example: '-74.072092',                                   note: 'Decimal (ej: -74.072092) — opcional' },
  { header: 'Peligro Inspeccionado',       req: true,  example: 'Alturas',                                      note: 'Alturas / Espacios Confinados / etc.' },
  { header: 'Personal Expuesto',           req: false, example: 'Propio',                                       note: 'Propio, Contratistas o ambos — opcional' },
  { header: 'Hallazgo',                    req: true,  example: 'Trabajador sin arnés en plataforma elevada',   note: 'Descripción del hallazgo' },
  { header: 'Clase',                       req: true,  example: 'A',                                            note: 'A, B o C' },
  { header: 'Intervención',               req: true,  example: 'Inmediata',                                    note: 'Inmediata, Pronta o Posterior' },
  { header: 'Descripción (Recomendaciones)', req: true, example: 'Usar arnés tipo X en toda labor en altura',  note: 'Recomendaciones / acciones correctivas' },
  { header: 'Acción Inmediata',           req: false, example: 'Detener labor hasta colocar EPP',             note: 'Opcional' },
  { header: 'Reportado Por (Nombre)',      req: true,  example: 'Juan Pérez',                                   note: 'Nombre completo del reportador' },
  { header: 'Cargo Reportador',            req: true,  example: 'Inspector SST',                               note: 'Cargo del reportador' },
  { header: 'Responsable Plan de Acción', req: false, example: 'Carlos Rodríguez',                            note: 'Nombre del responsable — opcional' },
  { header: 'Fecha Medida Implementada',   req: false, example: '20/06/2024',                                   note: 'dd/mm/yyyy — opcional' },
  { header: 'Fecha Seguimiento',           req: false, example: '30/06/2024',                                   note: 'dd/mm/yyyy — opcional' },
  { header: 'Fecha Cierre',               req: false, example: '15/07/2024',                                   note: 'dd/mm/yyyy — opcional' },
  { header: '% Cumplimiento',             req: false, example: '50',                                            note: '0-100 — opcional' },
  { header: '% Cumplimiento Total',       req: false, example: '100',                                           note: '0-100 — opcional' },
  { header: 'Estado Cumplimiento',        req: false, example: 'Pendiente',                                    note: 'Pendiente / En Progreso / Completado / Cerrado' },
  { header: 'Observación',               req: false, example: '',                                              note: 'Texto libre — opcional' },
] as const;

// ─── Helpers cliente ──────────────────────────────────────────────────────────

function downloadTemplate() {
  const headers = TEMPLATE_COLS.map(c => c.header);
  const notes   = TEMPLATE_COLS.map(c => (c.req ? '★ REQUERIDO — ' : 'Opcional — ') + c.note);
  const example = TEMPLATE_COLS.map(c => c.example);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers, notes, example]);
  ws['!cols'] = TEMPLATE_COLS.map(c => ({
    wch: Math.max(c.header.length + 4, (c.example as string).length + 2, 18),
  }));
  XLSX.utils.book_append_sheet(wb, ws, 'Plantilla Hallazgos');
  XLSX.writeFile(wb, 'plantilla_importacion_hallazgos.xlsx');
}

async function parseExcelFile(
  file: File,
): Promise<{ rows: RawImportRow[]; error: string | null }> {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: 'array', raw: false, dateNF: 'dd/mm/yyyy' });
        const ws = wb.Sheets[wb.SheetNames[0]];

        const jsonRows: Record<string, string>[] = XLSX.utils.sheet_to_json(ws, {
          raw: false,
          dateNF: 'dd/mm/yyyy',
          defval: '',
        });

        if (jsonRows.length === 0) {
          resolve({ rows: [], error: 'El archivo está vacío o no tiene datos.' });
          return;
        }

        // Detectar y saltar la fila de notas generada por la plantilla
        let startIndex = 0;
        const firstVal = String(Object.values(jsonRows[0])[0] ?? '');
        if (firstVal.startsWith('★') || firstVal.startsWith('Opcional')) {
          startIndex = 1;
        }

        const dataRows = jsonRows.slice(startIndex);

        // Verificar que al menos una columna sea reconocida
        const sampleRow = dataRows[0] ?? {};
        const recognized = Object.keys(sampleRow).filter(k => COLUMN_TO_FIELD[k]).length;
        if (recognized === 0) {
          resolve({
            rows: [],
            error:
              'No se reconocieron columnas válidas en el archivo. ' +
              'Descarga la plantilla y úsala como base.',
          });
          return;
        }

        // Mapear cada fila al objeto de campos internos
        const rows: RawImportRow[] = dataRows
          .map(row => {
            const mapped: RawImportRow = {};
            for (const [key, val] of Object.entries(row)) {
              const field = COLUMN_TO_FIELD[key];
              if (field) mapped[field] = String(val ?? '').trim();
            }
            return mapped;
          })
          .filter(row => Object.values(row).some(v => v !== ''));

        resolve({ rows, error: null });
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error desconocido';
        resolve({ rows: [], error: `Error al leer el archivo: ${msg}` });
      }
    };

    reader.onerror = () => resolve({ rows: [], error: 'No se pudo leer el archivo.' });
    reader.readAsArrayBuffer(file);
  });
}

// ─── Constantes visuales ──────────────────────────────────────────────────────

const CLASE_COLOR: Record<string, string> = {
  A: 'bg-red-100 text-red-800',
  B: 'bg-amber-100 text-amber-800',
  C: 'bg-blue-100 text-blue-800',
};

// ─── Componente principal ─────────────────────────────────────────────────────

type PageState = 'idle' | 'parsing' | 'preview' | 'importing' | 'done';

export default function ImportarHallazgosPage() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pageState, setPageState]       = useState<PageState>('idle');
  const [rawRows, setRawRows]           = useState<RawImportRow[]>([]);
  const [validation, setValidation]     = useState<ValidationResult | null>(null);
  const [parseError, setParseError]     = useState('');
  const [executeResult, setExecuteResult] = useState<ExecuteResult | null>(null);
  const [expanded, setExpanded]         = useState<Set<number>>(new Set());
  const [showOnlyErrors, setShowOnlyErrors] = useState(false);

  // ── Protección de ruta (admin only) ──────────────────────────────────────
  if (user && user.role !== 'admin') {
    router.replace('/hallazgos');
    return null;
  }

  // ── Procesamiento del archivo ─────────────────────────────────────────────
  const handleFile = useCallback(async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
      setParseError('Solo se aceptan archivos .xlsx, .xls o .csv');
      return;
    }

    setParseError('');
    setPageState('parsing');

    const { rows, error } = await parseExcelFile(file);

    if (error || rows.length === 0) {
      setParseError(error || 'El archivo no contiene filas de datos.');
      setPageState('idle');
      return;
    }

    setRawRows(rows);

    try {
      const result = await validateImportRows(rows);
      setValidation(result);
      setShowOnlyErrors(false);
      setExpanded(new Set());
      setPageState('preview');
    } catch {
      setParseError('Error al validar las filas. Intenta de nuevo.');
      setPageState('idle');
    }
  }, []);

  // ── Drag & Drop ───────────────────────────────────────────────────────────
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  // ── Importar ──────────────────────────────────────────────────────────────
  const handleImport = async () => {
    if (!validation || !user) return;

    const validRows = validation.rows
      .filter(r => r.valid)
      .map(r => rawRows[r.rowIndex]);

    if (validRows.length === 0) {
      toast({ variant: 'destructive', title: 'Sin filas válidas', description: 'Corrige los errores antes de importar.' });
      return;
    }

    setPageState('importing');

    try {
      const result = await executeImport(validRows, user.uid, user.empresa || '');
      setExecuteResult(result);
      setPageState('done');

      if (result.success) {
        toast({
          title: 'Importación completada',
          description: `${result.imported} hallazgos importados correctamente.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Importación con errores',
          description: `${result.imported} importados, ${result.failed} fallidos.`,
        });
      }
    } catch {
      setParseError('Error inesperado durante la importación.');
      setPageState('preview');
    }
  };

  // ── Reiniciar ─────────────────────────────────────────────────────────────
  const reset = () => {
    setPageState('idle');
    setRawRows([]);
    setValidation(null);
    setParseError('');
    setExecuteResult(null);
    setExpanded(new Set());
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleExpand = (idx: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  // ── Render ────────────────────────────────────────────────────────────────
  const displayRows: RowResult[] = validation
    ? showOnlyErrors
      ? validation.rows.filter(r => !r.valid)
      : validation.rows
    : [];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 w-full max-w-5xl mx-auto">

      {/* ── Encabezado ── */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push('/hallazgos')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Importar Hallazgos</h1>
          <p className="text-muted-foreground text-sm">Carga masiva desde un archivo Excel.</p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          ESTADO: idle / parsing
      ───────────────────────────────────────────────────────────────────── */}
      {(pageState === 'idle' || pageState === 'parsing') && (
        <div className="space-y-4">

          {/* Descarga de plantilla */}
          <Card className="border-dashed">
            <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Plantilla de importación</p>
                  <p className="text-xs text-muted-foreground">
                    Descarga la plantilla, complétala y luego súbela aquí.
                    Campos marcados con ★ son obligatorios.
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={downloadTemplate} className="flex-shrink-0">
                <Download className="mr-2 h-4 w-4" />
                Descargar Plantilla
              </Button>
            </CardContent>
          </Card>

          {/* Error de parseo */}
          {parseError && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'rounded-xl border-2 border-dashed border-border/60 bg-muted/10',
              'flex flex-col items-center justify-center gap-3 cursor-pointer',
              'min-h-[220px] transition-colors hover:border-primary/40 hover:bg-primary/5',
              pageState === 'parsing' && 'pointer-events-none opacity-60',
            )}
          >
            {pageState === 'parsing' ? (
              <>
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm font-medium text-muted-foreground">Leyendo y validando archivo…</p>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-muted-foreground/50" />
                <div className="text-center">
                  <p className="text-sm font-medium">Arrastra el archivo aquí</p>
                  <p className="text-xs text-muted-foreground mt-1">o haz clic para seleccionar</p>
                </div>
                <p className="text-[11px] text-muted-foreground/70">Formatos aceptados: .xlsx · .xls · .csv</p>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          ESTADO: preview / importing
      ───────────────────────────────────────────────────────────────────── */}
      {(pageState === 'preview' || pageState === 'importing') && validation && (
        <div className="space-y-4">

          {/* Resumen */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="text-sm px-3 py-1 bg-muted text-foreground border">
              {validation.rows.length} fila{validation.rows.length !== 1 ? 's' : ''} detectada{validation.rows.length !== 1 ? 's' : ''}
            </Badge>
            <Badge className="text-sm px-3 py-1 bg-emerald-100 text-emerald-800 border-emerald-200">
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
              {validation.validCount} válida{validation.validCount !== 1 ? 's' : ''}
            </Badge>
            {validation.errorCount > 0 && (
              <Badge className="text-sm px-3 py-1 bg-red-100 text-red-800 border-red-200">
                <XCircle className="mr-1.5 h-3.5 w-3.5" />
                {validation.errorCount} con error{validation.errorCount !== 1 ? 'es' : ''}
              </Badge>
            )}
            <span className="text-xs text-muted-foreground ml-1">
              {validation.errorCount > 0 && 'Las filas con errores serán omitidas.'}
            </span>
          </div>

          {/* Filtros y botón cambiar archivo */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex gap-1.5">
              <Button
                variant={!showOnlyErrors ? 'secondary' : 'ghost'}
                size="sm"
                className="h-8 text-xs"
                onClick={() => setShowOnlyErrors(false)}
              >
                Todos ({validation.rows.length})
              </Button>
              {validation.errorCount > 0 && (
                <Button
                  variant={showOnlyErrors ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setShowOnlyErrors(true)}
                >
                  Solo errores ({validation.errorCount})
                </Button>
              )}
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5" onClick={reset}
              disabled={pageState === 'importing'}>
              <RefreshCw className="h-3.5 w-3.5" />
              Cambiar archivo
            </Button>
          </div>

          {/* Tabla de vista previa */}
          <Card className="overflow-hidden shadow-sm">
            <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead className="min-w-[130px]">Empresa</TableHead>
                    <TableHead className="min-w-[120px]">Planta</TableHead>
                    <TableHead className="min-w-[200px]">Hallazgo</TableHead>
                    <TableHead className="w-20 text-center">Clase</TableHead>
                    <TableHead className="w-28">Fecha</TableHead>
                    <TableHead className="w-28 text-center">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        <FileX className="mx-auto h-8 w-8 mb-2 opacity-40" />
                        No hay filas que mostrar.
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayRows.map(row => {
                      const claseNorm = normalizeClase(row.clase);
                      const isExpanded = expanded.has(row.rowIndex);

                      return (
                        <React.Fragment key={row.rowIndex}>
                          <TableRow
                            className={cn(
                              'transition-colors',
                              row.valid
                                ? 'hover:bg-muted/30'
                                : 'bg-red-50/60 hover:bg-red-50 dark:bg-red-950/20',
                            )}
                          >
                            <TableCell className="text-center text-xs text-muted-foreground tabular-nums">
                              {row.rowIndex + 2}
                            </TableCell>
                            <TableCell className="text-sm font-medium truncate max-w-[130px]">
                              {row.empresa || <span className="text-red-500 italic">—</span>}
                            </TableCell>
                            <TableCell className="text-sm truncate max-w-[120px]">
                              {row.planta || <span className="text-muted-foreground">—</span>}
                            </TableCell>
                            <TableCell className="text-sm max-w-[200px]">
                              <span className="line-clamp-2 leading-snug">
                                {row.hallazgo || <span className="text-red-500 italic">—</span>}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              {claseNorm ? (
                                <Badge className={cn('text-xs', CLASE_COLOR[claseNorm] || 'bg-muted text-muted-foreground')}>
                                  Clase {claseNorm}
                                </Badge>
                              ) : (
                                <span className="text-red-500 text-xs italic">—</span>
                              )}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                              {row.fechaVisita || '—'}
                            </TableCell>
                            <TableCell className="text-center">
                              {row.valid ? (
                                <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-500" />
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => toggleExpand(row.rowIndex)}
                                  className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-800 transition-colors"
                                >
                                  {isExpanded
                                    ? <ChevronDown className="h-3.5 w-3.5" />
                                    : <ChevronRight className="h-3.5 w-3.5" />}
                                  {row.errors.length} error{row.errors.length !== 1 ? 'es' : ''}
                                </button>
                              )}
                            </TableCell>
                          </TableRow>

                          {/* Fila expandida con errores */}
                          {!row.valid && isExpanded && (
                            <TableRow className="bg-red-50/40 dark:bg-red-950/10">
                              <TableCell colSpan={7} className="py-2 px-4">
                                <ul className="space-y-0.5">
                                  {row.errors.map((err, ei) => (
                                    <li key={ei} className="flex items-start gap-1.5 text-xs text-red-700">
                                      <span className="mt-0.5 flex-shrink-0">•</span>
                                      {err}
                                    </li>
                                  ))}
                                </ul>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Acciones */}
          <div className="flex items-center justify-between gap-3 pt-1 flex-wrap">
            <Button variant="outline" onClick={reset} disabled={pageState === 'importing'}>
              Cancelar
            </Button>

            <div className="flex items-center gap-3">
              {validation.validCount === 0 && (
                <p className="text-xs text-muted-foreground">
                  Corrige los errores en el Excel y vuelve a subir el archivo.
                </p>
              )}
              <Button
                onClick={handleImport}
                disabled={pageState === 'importing' || validation.validCount === 0}
                className="min-w-[180px]"
              >
                {pageState === 'importing' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Importando…</>
                ) : (
                  <><Upload className="mr-2 h-4 w-4" />
                    Importar {validation.validCount} hallazgo{validation.validCount !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          ESTADO: done
      ───────────────────────────────────────────────────────────────────── */}
      {pageState === 'done' && executeResult && (
        <Card className="shadow-sm">
          <CardContent className="p-8 flex flex-col items-center text-center gap-4">
            {executeResult.success ? (
              <CheckCircle2 className="h-14 w-14 text-emerald-500" />
            ) : (
              <AlertTriangle className="h-14 w-14 text-amber-500" />
            )}

            <div>
              <h2 className="text-lg font-bold">
                {executeResult.success ? 'Importación completada' : 'Importación finalizada con advertencias'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {executeResult.imported > 0 && (
                  <span className="text-emerald-600 font-medium">
                    {executeResult.imported} hallazgo{executeResult.imported !== 1 ? 's' : ''} importado{executeResult.imported !== 1 ? 's' : ''} correctamente.
                  </span>
                )}
                {executeResult.failed > 0 && (
                  <span className="text-red-600 font-medium ml-2">
                    {executeResult.failed} fallido{executeResult.failed !== 1 ? 's' : ''}.
                  </span>
                )}
              </p>
            </div>

            {executeResult.errors.length > 0 && (
              <div className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left">
                <p className="text-xs font-semibold text-red-700 mb-1">Errores de escritura:</p>
                {executeResult.errors.map((err, i) => (
                  <p key={i} className="text-xs text-red-600">• {err}</p>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={reset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Nueva importación
              </Button>
              <Button onClick={() => router.push('/hallazgos')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ver hallazgos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
