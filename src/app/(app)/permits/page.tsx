import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const permits = [
    { id: 'PT-0123', workType: 'Trabajo en Caliente', date: '2023-10-26', status: 'pendiente_revision' },
    { id: 'PT-0122', workType: 'Espacios Confinados', date: '2023-10-25', status: 'aprobado' },
    { id: 'PT-0121', workType: 'Trabajo Eléctrico', date: '2023-10-25', status: 'aprobado' },
    { id: 'PT-0120', workType: 'Trabajo en Altura', date: '2023-10-24', status: 'rechazado' },
    { id: 'PT-0119', workType: 'Excavación', date: '2023-10-23', status: 'aprobado' },
    { id: 'PT-0118', workType: 'Trabajo en Caliente', date: '2023-10-22', status: 'cerrado' },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    pendiente_revision: 'secondary',
    aprobado: 'default',
    rechazado: 'destructive',
    cerrado: 'outline'
};

const getStatusText = (status: string) => {
    const statusText: {[key: string]: string} = {
      'borrador': 'Borrador',
      'pendiente_revision': 'Pendiente de Revisión',
      'aprobado': 'Aprobado',
      'en_ejecucion': 'En Ejecución',
      'suspendido': 'Suspendido',
      'cerrado': 'Cerrado',
      'rechazado': 'Rechazado'
    };
    return statusText[status] || status;
  };


export default function PermitsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Permisos de Trabajo</h1>
          <p className="text-muted-foreground">
            Gestione todos sus permisos de trabajo aquí.
          </p>
        </div>
        <Button asChild>
          <Link href="/permits/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Permiso
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por ID o tipo de trabajo..."
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID del Permiso</TableHead>
                    <TableHead className="hidden sm:table-cell">Tipo de Trabajo</TableHead>
                    <TableHead className="hidden sm:table-cell">Estado</TableHead>
                    <TableHead className="hidden md:table-cell">Creado</TableHead>
                    <TableHead>
                      <span className="sr-only">Acciones</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permits.map((permit) => (
                    <TableRow key={permit.id} className="cursor-pointer" asChild>
                      <Link href={`/permits/${permit.id}`}>
                        <TableCell className="font-medium">{permit.id}</TableCell>
                        <TableCell className="hidden sm:table-cell">{permit.workType}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant={statusVariant[permit.status] || 'default'}>
                            {getStatusText(permit.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{permit.date}</TableCell>
                        <TableCell>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                              ...
                              <span className="sr-only">Ver menú</span>
                          </Button>
                        </TableCell>
                      </Link>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
