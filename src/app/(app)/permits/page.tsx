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
    { id: 'PT-0123', workType: 'Hot Work', date: '2023-10-26', status: 'Pending' },
    { id: 'PT-0122', workType: 'Confined Space Entry', date: '2023-10-25', status: 'Approved' },
    { id: 'PT-0121', workType: 'Electrical Work', date: '2023-10-25', status: 'Approved' },
    { id: 'PT-0120', workType: 'Working at Height', date: '2023-10-24', status: 'Rejected' },
    { id: 'PT-0119', workType: 'Excavation', date: '2023-10-23', status: 'Approved' },
    { id: 'PT-0118', workType: 'Hot Work', date: '2023-10-22', status: 'Approved' },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    Pending: 'secondary',
    Approved: 'default',
    Rejected: 'destructive'
};


export default function PermitsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Work Permits</h1>
          <p className="text-muted-foreground">
            Manage all your work permits here.
          </p>
        </div>
        <Button asChild>
          <Link href="/permits/create">
            <PlusCircle className="mr-2 h-4 w-4" /> New Permit
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
                placeholder="Search permits by ID or work type..."
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permit ID</TableHead>
                    <TableHead className="hidden sm:table-cell">Work Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
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
                            {permit.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{permit.date}</TableCell>
                        <TableCell>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                              ...
                              <span className="sr-only">Toggle menu</span>
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
