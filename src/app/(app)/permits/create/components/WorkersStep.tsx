'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Edit, Trash2, MoreVertical, AlertCircle } from 'lucide-react';
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
  const maxTrabajadores = parseInt(state.generalInfo.numTrabajadores || '0', 10);
  
  // Verificar si hay trabajadores sin firma
  const hasWorkerWithoutSignature = workers.some(worker => !worker.firmaApertura);
  
  // Verificar si se alcanzó el límite de trabajadores
  const isLimitReached = workers.length >= maxTrabajadores;
  
  // Determinar si se puede agregar un nuevo trabajador
  const canAddWorker = !isLimitReached && !hasWorkerWithoutSignature;

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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle>Lista de Trabajadores</CardTitle>
            <p className="text-sm text-muted-foreground">
              Ten presente que de acuerdo a la información relacionada en información general, 
              puede registrar máximo <span className="font-semibold text-primary">{maxTrabajadores}</span> trabajador{maxTrabajadores !== 1 ? 'es' : ''}.
            </p>
          </div>
          <Button 
            onClick={onAddWorker} 
            size="sm"
            disabled={!canAddWorker}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Agregar Trabajador
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Alertas de validación */}
          {hasWorkerWithoutSignature && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Debe completar la firma del trabajador anterior antes de agregar uno nuevo.
              </AlertDescription>
            </Alert>
          )}
          
          {isLimitReached && !hasWorkerWithoutSignature && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Ha alcanzado el límite de {maxTrabajadores} trabajador{maxTrabajadores !== 1 ? 'es' : ''}. 
                Si necesita agregar más, actualice el número en la sección de Información General.
              </AlertDescription>
            </Alert>
          )}

          {/* Badge de contador */}
          <div className="flex justify-between items-center pb-2">
            <Badge variant={workers.length === maxTrabajadores ? "default" : "secondary"}>
              {workers.length} de {maxTrabajadores} trabajador{maxTrabajadores !== 1 ? 'es' : ''} registrado{workers.length !== 1 ? 's' : ''}
            </Badge>
            {workers.length > 0 && (
              <Badge variant={hasWorkerWithoutSignature ? "destructive" : "outline"}>
                {workers.filter(w => w.firmaApertura).length} firmado{workers.filter(w => w.firmaApertura).length !== 1 ? 's' : ''}
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
                {workers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <UserPlus className="h-10 w-10 mb-2 opacity-50" />
                        <p className="font-medium">No hay trabajadores agregados</p>
                        <p className="text-sm">Haga clic en "Agregar Trabajador" para comenzar</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  workers.map((worker, index) => (
                    <TableRow key={index} className={!worker.firmaApertura ? 'bg-yellow-50/50' : ''}>
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
                            <DropdownMenuItem onClick={() => onEditWorker(worker, index)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onRemoveWorker(index)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
