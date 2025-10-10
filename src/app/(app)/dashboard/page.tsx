import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { FileText, CheckCircle, Clock, XCircle, PlusCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data, to be replaced with Firestore data
const stats = [
  {
    title: 'Total Permits',
    value: '1,254',
    icon: FileText,
    color: 'text-blue-500',
  },
  {
    title: 'Pending Approval',
    value: '32',
    icon: Clock,
    color: 'text-yellow-500',
  },
  {
    title: 'Approved',
    value: '1,190',
    icon: CheckCircle,
    color: 'text-green-500',
  },
  {
    title: 'Rejected',
    value: '32',
    icon: XCircle,
    color: 'text-red-500',
  },
];

const recentPermits = [
  { id: 'PT-0123', workType: 'Hot Work', date: '2023-10-26', status: 'Pending' },
  {
    id: 'PT-0122',
    workType: 'Confined Space Entry',
    date: '2023-10-25',
    status: 'Pending',
  },
  {
    id: 'PT-0121',
    workType: 'Electrical Work',
    date: '2023-10-25',
    status: 'Pending',
  },
  {
    id: 'PT-0120',
    workType: 'Working at Height',
    date: '2023-10-24',
    status: 'Pending',
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your work permits.
          </p>
        </div>
        <Button asChild>
          <Link href="/permits/create">
            <PlusCircle className="mr-2 h-4 w-4" /> New Permit
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Pending Permits</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permit ID</TableHead>
                <TableHead>Work Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPermits.map((permit) => (
                <TableRow key={permit.id}>
                  <TableCell className="font-medium">{permit.id}</TableCell>
                  <TableCell>{permit.workType}</TableCell>
                  <TableCell>{permit.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{permit.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
