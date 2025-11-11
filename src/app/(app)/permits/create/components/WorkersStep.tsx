'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import type { ExternalWorker } from '@/types';
import Image from 'next/image';

interface WorkersStepProps {
  workers: ExternalWorker[];
  onAddWorker: () => void;
  onEditWorker: (worker: ExternalWorker, index: number) => void;
  onRemoveWorker: (index: number) => void;
}

export function WorkersStep({ workers, onAddWorker, onEditWorker, onRemoveWorker }: WorkersStepProps) {
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lista de Trabajadores</CardTitle>
          <Button onClick={onAddWorker} size="sm">
            <UserPlus className="mr-2" /> Agregar Trabajador
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cédula</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Firma Apertura</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No hay trabajadores agregados.
                  </TableCell>
                </TableRow>
              ) : (
                workers.map((worker, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{worker.nombre}</TableCell>
                    <TableCell>{worker.cedula}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{worker.rol}</Badge>
                    </TableCell>
                    <TableCell>
                        {worker.firmaApertura ? (
                           <Image src={worker.firmaApertura} alt={`Firma de ${worker.nombre}`} width={80} height={40} className="border rounded-md" />
                        ) : (
                            <span className="text-xs text-muted-foreground">Pendiente</span>
                        )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => onEditWorker(worker, index)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onRemoveWorker(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
