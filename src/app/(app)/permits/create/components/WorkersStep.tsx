'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Edit, Trash2, MoreVertical, AlertCircle, PenLine, CheckCircle2, User } from 'lucide-react';
import type { ExternalWorker } from '@/types';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePermitForm } from '../form-context';

interface WorkersStepProps {
  workers: ExternalWorker[];
  onAddWorker: () => void;
  onEditWorker: (worker: ExternalWorker, index: number) => void;
  onRemoveWorker: (index: number) => void;
}

export function WorkersStep({ workers, onAddWorker, onEditWorker, onRemoveWorker }: WorkersStepProps) {
  const { state } = usePermitForm();
  const additionalWorkersCount = parseInt(state.generalInfo.numTrabajadores || '0', 10);

  // El solicitante es siempre workers[0]; los demás son el equipo de trabajo
  const solicitante = workers.length > 0 ? workers[0] : null;
  const otherWorkers = workers.slice(1);

  const hasOtherWorkerWithoutSignature = otherWorkers.some(w => !w.firmaApertura);
  const isLimitReached = otherWorkers.length >= additionalWorkersCount;
  const canAddWorker = !isLimitReached && !hasOtherWorkerWithoutSignature && !!solicitante?.firmaApertura;

  const needsCoordinadorTA = !!state.selectedWorkTypes?.alturas;
  const needsSupervisorEC = !!state.selectedWorkTypes?.confinado;
  const hasCoordinadorTA = otherWorkers.some(w => w.rol === 'Coordinador de TA');
  const hasSupervisorEC = otherWorkers.some(w => w.rol === 'Supervisor de EC');
  const coordinadorTASinFirma = otherWorkers.some(w => w.rol === 'Coordinador de TA' && !w.firmaApertura);
  const supervisorECSinFirma = otherWorkers.some(w => w.rol === 'Supervisor de EC' && !w.firmaApertura);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
          Gestión de Trabajadores
        </h2>
        <div className="text-muted-foreground text-sm max-w-3xl mx-auto text-left space-y-2">
            <p className="font-semibold">FIRMAS:</p>
            <ol className="list-decimal list-outside space-y-2 pl-5">
              <li>
                Al firmar, los trabajadores aceptan el tratamiento de sus datos personales, manifiestan su buen estado de salud y confirman haber comprendido los riesgos y controles de la actividad.
              </li>
              <li>
                Se verifican certificados de aptitud médica para Trabajos en alturas y espacios confinados; según aplique, con fecha de expedición inferior a un año.
              </li>
              <li>
                Se verifican competencia - entrenamiento para TSA, TEC, trabajo en caliente, energías peligrosas, operación de equipo o maquinaria, trabajos con energía eléctrica; según aplique.
              </li>
              <li>
                Se verifican el estado de afiliación al sistema de seguridad social (EPS, ARL, Fondo de Pensiones).
              </li>
              <li>
                Para espacios confinados aplican lo siguientes ROLES: Trabajador Entrante, Vigía, Supervisor.
              </li>
            </ol>
        </div>
      </div>

      {/* ── Sección: Firma del Solicitante / Ejecutante ── */}
      <Card className={solicitante?.firmaApertura
        ? 'border-green-300 bg-green-50/30'
        : 'border-amber-300 bg-amber-50/30'
      }>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Firma del Ejecutante del Trabajo (Solicitante)</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            El ejecutante del trabajo debe completar sus datos y registrar su firma antes de agregar el equipo.
          </p>
        </CardHeader>
        <CardContent>
          {solicitante ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {solicitante.firmaApertura ? (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100">
                    <PenLine className="h-6 w-6 text-amber-600" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm">{solicitante.nombre || 'Sin nombre'}</p>
                  <p className="text-xs text-muted-foreground">{solicitante.rol}</p>
                  {solicitante.cedula && (
                    <p className="text-xs text-muted-foreground">CC: {solicitante.cedula}</p>
                  )}
                </div>
                {solicitante.firmaApertura && (
                  <Image
                    src={solicitante.firmaApertura}
                    alt="Firma del solicitante"
                    width={90}
                    height={45}
                    className="border rounded-md bg-white hidden sm:block"
                  />
                )}
              </div>
              <div className="flex gap-2">
                {solicitante.firmaApertura ? (
                  <Badge className="bg-green-500 text-white text-xs">✓ Firmado</Badge>
                ) : (
                  <Badge variant="outline" className="border-amber-400 text-amber-600 text-xs">○ Pendiente de firma</Badge>
                )}
                <Button
                  size="sm"
                  variant={solicitante.firmaApertura ? 'outline' : 'default'}
                  onClick={() => onEditWorker(solicitante, 0)}
                >
                  <PenLine className="mr-1.5 h-3.5 w-3.5" />
                  {solicitante.firmaApertura ? 'Ver / Editar' : 'Completar y Firmar'}
                </Button>
              </div>
            </div>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No se detectó el perfil del solicitante. Recargue la página o verifique que su sesión esté activa.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* ── Sección: Equipo de Trabajo ── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle>Equipo de Trabajo</CardTitle>
            <p className="text-sm text-muted-foreground">
              Se requieren <span className="font-semibold text-primary">{additionalWorkersCount}</span> trabajador(es) adicional(es) al ejecutante.
            </p>
          </div>
          <Button
            onClick={onAddWorker}
            size="sm"
            disabled={!canAddWorker}
            title={!solicitante?.firmaApertura ? 'El solicitante debe firmar primero' : undefined}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Agregar Trabajador
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Alertas de validación */}
          {!solicitante?.firmaApertura && (
            <Alert className="border-amber-300 bg-amber-50 text-amber-800">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertDescription>
                <span className="font-semibold">Acción requerida:</span> El ejecutante del trabajo debe completar sus datos y firmar antes de agregar otros trabajadores.
              </AlertDescription>
            </Alert>
          )}

          {needsCoordinadorTA && !hasCoordinadorTA && (
            <Alert className="border-orange-300 bg-orange-50 text-orange-800">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <AlertDescription>
                <span className="font-semibold">Trabajo en Alturas:</span> Se requiere registrar y firmar al <span className="font-semibold">Coordinador de TA</span> en esta lista antes de enviar el permiso.
              </AlertDescription>
            </Alert>
          )}

          {needsCoordinadorTA && hasCoordinadorTA && coordinadorTASinFirma && (
            <Alert className="border-yellow-300 bg-yellow-50 text-yellow-800">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription>
                <span className="font-semibold">Trabajo en Alturas:</span> El <span className="font-semibold">Coordinador de TA</span> está registrado pero aún no ha firmado.
              </AlertDescription>
            </Alert>
          )}

          {needsSupervisorEC && !hasSupervisorEC && (
            <Alert className="border-orange-300 bg-orange-50 text-orange-800">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <AlertDescription>
                <span className="font-semibold">Espacios Confinados:</span> Se requiere registrar y firmar al <span className="font-semibold">Supervisor de EC</span> en esta lista antes de enviar el permiso.
              </AlertDescription>
            </Alert>
          )}

          {needsSupervisorEC && hasSupervisorEC && supervisorECSinFirma && (
            <Alert className="border-yellow-300 bg-yellow-50 text-yellow-800">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription>
                <span className="font-semibold">Espacios Confinados:</span> El <span className="font-semibold">Supervisor de EC</span> está registrado pero aún no ha firmado.
              </AlertDescription>
            </Alert>
          )}

          {hasOtherWorkerWithoutSignature && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Debe completar la firma del trabajador anterior antes de agregar uno nuevo.
              </AlertDescription>
            </Alert>
          )}

          {isLimitReached && !hasOtherWorkerWithoutSignature && additionalWorkersCount > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Ha registrado los {additionalWorkersCount} trabajador(es) requeridos. Si necesita más, actualice el número en la sección de Información General.
              </AlertDescription>
            </Alert>
          )}

          {/* Badge de contador */}
          <div className="flex justify-between items-center pb-2">
            <Badge variant={otherWorkers.length === additionalWorkersCount ? 'default' : 'secondary'}>
              {otherWorkers.length} de {additionalWorkersCount} trabajador(es) registrado(s)
            </Badge>
            {otherWorkers.length > 0 && (
              <Badge variant={hasOtherWorkerWithoutSignature ? 'destructive' : 'outline'}>
                {otherWorkers.filter(w => w.firmaApertura).length} firmado(s)
              </Badge>
            )}
          </div>

          {/* Tabla responsive */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="hidden md:table-cell">Cédula</TableHead>
                  <TableHead className="hidden sm:table-cell">Rol</TableHead>
                  <TableHead className="hidden lg:table-cell">Firma Apertura</TableHead>
                  <TableHead className="text-right w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {otherWorkers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <UserPlus className="h-10 w-10 mb-2 opacity-50" />
                        <p className="font-medium">No hay trabajadores adicionales</p>
                        <p className="text-sm">
                          {solicitante?.firmaApertura
                            ? 'Haga clic en "Agregar Trabajador" para comenzar'
                            : 'El solicitante debe firmar primero'}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  otherWorkers.map((worker, displayIndex) => {
                    const originalIndex = displayIndex + 1; // +1 porque workers[0] es el solicitante
                    return (
                      <TableRow key={originalIndex} className={!worker.firmaApertura ? 'bg-yellow-50/50' : ''}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{worker.nombre}</span>
                            <div className="flex flex-col gap-1 md:hidden mt-1">
                              <span className="text-xs text-muted-foreground">{worker.cedula}</span>
                              <Badge variant="outline" className="w-fit text-xs">{worker.rol}</Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{worker.cedula}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline">{worker.rol}</Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {worker.firmaApertura ? (
                            <Image
                              src={worker.firmaApertura}
                              alt={`Firma de ${worker.nombre}`}
                              width={80}
                              height={40}
                              className="border rounded-md"
                            />
                          ) : (
                            <Badge variant="destructive" className="text-xs">
                              Sin Firma
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Abrir menú</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem onClick={() => onEditWorker(worker, originalIndex)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onRemoveWorker(originalIndex)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
