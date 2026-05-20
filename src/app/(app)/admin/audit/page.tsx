'use client';

import { useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2,
  ScanSearch,
  RefreshCw,
  Building2,
  MapPin,
  Factory,
  LayoutGrid,
  CircleCheck,
  CircleX,
  AlertTriangle,
  PencilLine,
  Info,
} from 'lucide-react';
import {
  scanAuditField,
  renameAuditValue,
  type AuditFieldType,
  type AuditResult,
  type AuditEntry,
} from './actions';

// ─── Configuración visual de los tabs ────────────────────────────────────────

const FIELD_TABS: { field: AuditFieldType; label: string; icon: React.ElementType }[] = [
  { field: 'empresa', label: 'Empresa',  icon: Building2 },
  { field: 'ciudad',  label: 'Ciudad',   icon: MapPin    },
  { field: 'planta',  label: 'Planta',   icon: Factory   },
  { field: 'area',    label: 'Área',     icon: LayoutGrid },
];

// ─── Tipos de filtro ──────────────────────────────────────────────────────────
type FilterType = 'all' | 'orphan' | 'nodata';

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function StatusIcon({ entry }: { entry: AuditEntry }) {
  if (!entry.isInMaster)
    return <CircleX className="h-5 w-5 text-red-500 shrink-0" />;
  if (entry.totalDocs === 0)
    return <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />;
  return <CircleCheck className="h-5 w-5 text-green-500 shrink-0" />;
}

function StatusBadge({ entry }: { entry: AuditEntry }) {
  if (!entry.isInMaster)
    return <Badge className="bg-red-100 text-red-700 border-red-200 font-semibold text-xs">No registrado</Badge>;
  if (entry.totalDocs === 0)
    return <Badge className="bg-amber-100 text-amber-700 border-amber-200 font-semibold text-xs">Sin documentos</Badge>;
  return <Badge className="bg-green-100 text-green-700 border-green-200 font-semibold text-xs">Registrado</Badge>;
}

// ─── Panel de auditoría por campo ─────────────────────────────────────────────

function AuditPanel({
  field,
  result,
  isScanning,
  onScan,
}: {
  field: AuditFieldType;
  result: AuditResult | null;
  isScanning: boolean;
  onScan: () => void;
}) {
  const [filter, setFilter]           = useState<FilterType>('all');
  const [renameTarget, setRenameTarget] = useState<AuditEntry | null>(null);
  const { toast } = useToast();

  const filtered = result?.entries.filter(e => {
    if (filter === 'orphan')  return !e.isInMaster && e.totalDocs > 0;
    if (filter === 'nodata')  return e.isInMaster  && e.totalDocs === 0;
    return true;
  }) ?? [];

  const totalAll    = result?.entries.length ?? 0;
  const totalOrphan = result?.totalOrphans   ?? 0;
  const totalNoData = result?.totalNoData    ?? 0;

  return (
    <div className="space-y-5">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground max-w-xl">
            Escanea todas las colecciones y compara contra la lista maestra.{' '}
            <span className="text-red-600 font-medium">Los huérfanos</span> son valores que
            están en documentos pero no en la lista maestra.
          </p>
          {result && (
            <p className="text-xs text-muted-foreground mt-1">
              Último escaneo: {new Date(result.scannedAt).toLocaleString('es-CO')}
            </p>
          )}
        </div>
        <Button onClick={onScan} disabled={isScanning} className="shrink-0 h-10">
          {isScanning
            ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            : <ScanSearch className="mr-2 h-4 w-4" />}
          {isScanning ? 'Escaneando...' : 'Escanear BD'}
        </Button>
      </div>

      {/* Estado inicial */}
      {!result && !isScanning && (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl border-muted">
          <ScanSearch className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="font-semibold text-gray-700">Sin datos aún</p>
          <p className="text-sm text-muted-foreground mt-1">
            Presiona <strong>Escanear BD</strong> para analizar los registros.
          </p>
        </div>
      )}

      {isScanning && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="font-medium text-gray-700">Escaneando colecciones...</p>
          <p className="text-sm text-muted-foreground mt-1">Esto puede tardar unos segundos.</p>
        </div>
      )}

      {result && !isScanning && (
        <>
          {/* Filtros rápidos */}
          <div className="flex flex-wrap gap-2">
            {([
              { key: 'all',    label: `Todos (${totalAll})`,                   cls: 'bg-blue-600 text-white hover:bg-blue-700' },
              { key: 'orphan', label: `Huérfanos en BD (${totalOrphan})`,       cls: 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200' },
              { key: 'nodata', label: `Registrados sin datos (${totalNoData})`, cls: 'bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200' },
            ] as const).map(f => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                  filter === f.key ? f.cls : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Leyenda */}
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground bg-muted/40 rounded-lg px-4 py-2">
            <span className="flex items-center gap-1.5"><CircleCheck className="h-3.5 w-3.5 text-green-500" /> Registrado en maestro y con datos</span>
            <span className="flex items-center gap-1.5"><CircleX    className="h-3.5 w-3.5 text-red-500"   /> En BD pero <strong className="text-red-600 mx-0.5">NO</strong> en el maestro (huérfano)</span>
            <span className="flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> Registrado en maestro pero <strong className="mx-0.5">sin documentos</strong></span>
          </div>

          {/* Tabla */}
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm border rounded-xl">
              No hay registros para el filtro seleccionado.
            </div>
          ) : (
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider w-8"></th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                      Valor en BD
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider w-24">
                      Total docs
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                      Presencia en colecciones
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider w-32">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map(entry => (
                    <tr
                      key={entry.value}
                      className={cn(
                        'transition-colors hover:bg-gray-50/80',
                        !entry.isInMaster && entry.totalDocs > 0 && 'bg-red-50/40',
                        entry.isInMaster && entry.totalDocs === 0 && 'bg-amber-50/30'
                      )}
                    >
                      <td className="py-3 px-4">
                        <StatusIcon entry={entry} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-gray-900">{entry.value}</span>
                          <StatusBadge entry={entry} />
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-bold text-gray-800">{entry.totalDocs}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {entry.collections.length === 0 ? (
                            <span className="text-muted-foreground text-xs italic">Sin registros</span>
                          ) : (
                            entry.collections.map(c => (
                              <Badge key={c.collectionId} variant="outline" className="text-xs font-normal">
                                {c.displayName}: {c.count}
                              </Badge>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {entry.totalDocs > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs border-orange-300 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                            onClick={() => setRenameTarget(entry)}
                          >
                            <PencilLine className="mr-1.5 h-3.5 w-3.5" />
                            Renombrar
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Modal de renombrar */}
      {renameTarget && (
        <RenameDialog
          entry={renameTarget}
          field={field}
          masterList={result?.masterList ?? []}
          onClose={() => setRenameTarget(null)}
          onSuccess={() => {
            setRenameTarget(null);
            toast({
              title: '✅ Renombrado exitoso',
              description: `Todos los documentos con "${renameTarget.value}" fueron actualizados.`,
            });
            onScan(); // re-escanear
          }}
        />
      )}
    </div>
  );
}

// ─── Dialog de renombrar ──────────────────────────────────────────────────────

function RenameDialog({
  entry,
  field,
  masterList,
  onClose,
  onSuccess,
}: {
  entry: AuditEntry;
  field: AuditFieldType;
  masterList: string[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [mode, setMode]               = useState<'master' | 'custom'>('master');
  const [selectedMaster, setSelected] = useState<string>('');
  const [customValue, setCustom]      = useState<string>(entry.value);
  const [addToMaster, setAddToMaster] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const newValue = mode === 'master' ? selectedMaster : customValue.trim();
  const canSubmit = !!newValue && newValue !== entry.value;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await renameAuditValue(field, entry.value, newValue, mode === 'custom' && addToMaster);
      if (res.error) throw new Error(res.error);
      onSuccess();
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PencilLine className="h-5 w-5 text-orange-600" />
            Renombrar valor
          </DialogTitle>
          <DialogDescription>
            Actualiza <strong>{entry.totalDocs}</strong> documento(s) que usan <strong>"{entry.value}"</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Selector de modo */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode('master')}
              className={cn(
                'rounded-lg border p-3 text-sm font-medium transition-colors text-left',
                mode === 'master' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'
              )}
            >
              <span className="block text-xs text-muted-foreground mb-0.5">Opción 1</span>
              Mapear a valor del maestro
            </button>
            <button
              type="button"
              onClick={() => setMode('custom')}
              className={cn(
                'rounded-lg border p-3 text-sm font-medium transition-colors text-left',
                mode === 'custom' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'
              )}
            >
              <span className="block text-xs text-muted-foreground mb-0.5">Opción 2</span>
              Escribir nombre personalizado
            </button>
          </div>

          {/* Valor actual */}
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-100">
            <CircleX className="h-4 w-4 text-red-500 shrink-0" />
            <div className="text-sm">
              <span className="text-muted-foreground">Valor actual: </span>
              <span className="font-semibold text-red-700">"{entry.value}"</span>
            </div>
          </div>

          {/* Input según modo */}
          {mode === 'master' ? (
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Seleccionar del maestro</Label>
              <Select value={selectedMaster} onValueChange={setSelected}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Seleccione el valor correcto..." />
                </SelectTrigger>
                <SelectContent>
                  {masterList
                    .filter(m => m !== entry.value)
                    .map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Nuevo nombre</Label>
                <Input
                  value={customValue}
                  onChange={e => setCustom(e.target.value)}
                  placeholder="Ingrese el nombre correcto..."
                  className="h-11"
                  autoFocus
                />
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <Switch id="addToMaster" checked={addToMaster} onCheckedChange={setAddToMaster} />
                <Label htmlFor="addToMaster" className="text-sm cursor-pointer">
                  Agregar también a la lista maestra
                </Label>
              </div>
            </div>
          )}

          {/* Preview */}
          {newValue && newValue !== entry.value && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100 text-sm">
              <CircleCheck className="h-4 w-4 text-green-600 shrink-0" />
              <span className="text-muted-foreground">Se actualizará a: </span>
              <span className="font-semibold text-green-700">"{newValue}"</span>
            </div>
          )}

          {/* Advertencia */}
          <div className="flex gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-800">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Esta acción actualizará <strong>{entry.totalDocs}</strong> documento(s) en todas las colecciones. No se puede deshacer.</span>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Aplicar cambio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function AuditPage() {
  const { user } = useUser();
  const [results,   setResults]   = useState<Partial<Record<AuditFieldType, AuditResult>>>({});
  const [scanning,  setScanning]  = useState<Partial<Record<AuditFieldType, boolean>>>({});

  const handleScan = async (field: AuditFieldType) => {
    setScanning(s => ({ ...s, [field]: true }));
    const { result, error } = await scanAuditField(field);
    setScanning(s => ({ ...s, [field]: false }));
    if (result) setResults(r => ({ ...r, [field]: result }));
    if (error) console.error(error);
  };

  const totalBadge = FIELD_TABS.reduce((acc, t) => acc + (results[t.field]?.totalOrphans ?? 0), 0);

  const canAccess = user?.role === 'admin' ||
    (user?.role === 'lider_regional' && user.allowedModules?.includes('audit'));

  if (!canAccess) return null;

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="px-4 md:px-8 py-4 flex items-center gap-3">
          <div className="bg-orange-600 p-2.5 rounded-xl shadow-orange-200 shadow-lg">
            <ScanSearch className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                Auditoría de Datos
              </h1>
              {totalBadge > 0 && (
                <Badge className="bg-red-600 text-white text-xs px-2">{totalBadge}</Badge>
              )}
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Detecta y corrige valores huérfanos en todas las colecciones
            </p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-4 md:px-8 py-6">
        <Tabs defaultValue="empresa">
          <TabsList className="mb-6 h-auto flex-wrap gap-1 bg-gray-100 p-1">
            {FIELD_TABS.map(({ field, label, icon: Icon }) => (
              <TabsTrigger
                key={field}
                value={field}
                className="flex items-center gap-1.5 px-4 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Icon className="h-4 w-4" />
                {label}
                {(results[field]?.totalOrphans ?? 0) > 0 && (
                  <Badge className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0 h-4 min-w-[1rem]">
                    {results[field]!.totalOrphans}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {FIELD_TABS.map(({ field }) => (
            <TabsContent key={field} value={field}>
              <div className="bg-white rounded-xl border shadow-sm p-5 md:p-6">
                <AuditPanel
                  field={field}
                  result={results[field] ?? null}
                  isScanning={scanning[field] ?? false}
                  onScan={() => handleScan(field)}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
