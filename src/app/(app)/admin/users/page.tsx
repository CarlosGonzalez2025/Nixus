
'use client';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createUser, updateUser, updateUserStatus, createMultipleUsers, syncAuthAndFirestoreUsers, migrateObsoleteRoles, deleteUser } from './actions';
import { Loader2, UserPlus, Users, Edit, Trash2, Search, X, UserCog, Shield, ChevronDown, Upload, Download, FileText, FileUp, CircleCheck, CircleX, RefreshCw } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import type { User, UserRole } from '@/types';
import { USER_ROLES, ROLE_LABELS } from '@/lib/role-config';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { errorEmitter } from '@/lib/error-emitter';
import { FirestorePermissionError } from '@/lib/errors';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Checkbox } from '@/components/ui/checkbox';

const createFormSchema = z.object({
  fullName: z.string().min(3, { message: 'El nombre es requerido.' }),
  email: z.string().email({ message: 'Correo electrónico inválido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
  role: z.enum(USER_ROLES),
  area: z.string().optional(),
  telefono: z.string().optional(),
  empresa: z.string().min(2, { message: 'La empresa es requerida.' }),
  ciudad: z.string().optional(),
  planta: z.string().optional(),
});

const updateFormSchema = z.object({
  uid: z.string(),
  displayName: z.string().min(3, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "Correo electrónico inválido." }),
  role: z.enum(USER_ROLES),
  otherRoles: z.array(z.enum(USER_ROLES)).optional(),
  area: z.string().optional(),
  telefono: z.string().optional(),
  empresa: z.string().min(2, { message: "La empresa es requerida." }),
  ciudad: z.string().optional(),
  planta: z.string().optional(),
});

const bulkCreateUserSchema = createFormSchema.extend({});
type BulkUser = z.infer<typeof bulkCreateUserSchema>;


const roleNames: { [key in UserRole]: string } = ROLE_LABELS;

const roleColors: { [key in UserRole]: string } = {
  solicitante: 'bg-blue-100 text-blue-700 border-blue-200',
  autorizante: 'bg-purple-100 text-purple-700 border-purple-200',
  lider_sst: 'bg-orange-100 text-orange-700 border-orange-200',
  admin: 'bg-red-100 text-red-700 border-red-200',
  mantenimiento: 'bg-cyan-100 text-cyan-700 border-cyan-200'
};

function BulkUploadDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedUsers, setParsedUsers] = useState<BulkUser[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = () => {
    const headers = ['fullName', 'email', 'password', 'role', 'empresa', 'ciudad', 'planta', 'area', 'telefono'];
    const exampleData = [
      {
        fullName: 'Juan Ejemplo',
        email: 'juan@ejemplo.com',
        password: 'password123',
        role: 'solicitante',
        empresa: 'Empresa Ejemplo',
        ciudad: 'Bogotá',
        planta: 'Planta Principal',
        area: 'Mantenimiento',
        telefono: '3001234567'
      }
    ];
    const worksheet = XLSX.utils.json_to_sheet(exampleData, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Plantilla Usuarios');
    XLSX.writeFile(workbook, 'plantilla_usuarios.xlsx');
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsParsing(true);
    setParsedUsers([]);

    try {
      const data = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json: any[] = XLSX.utils.sheet_to_json(worksheet);

      const users: BulkUser[] = [];
      const errors: string[] = [];
      const requiredFields = ['fullName', 'email', 'password', 'role', 'empresa'];

      json.forEach((row, index) => {
        const missingFields = requiredFields.filter(field => !row[field]);
        if (missingFields.length > 0) {
          errors.push(`Fila ${index + 2}: Faltan campos: ${missingFields.join(', ')}`);
          return;
        }

        // Sanitize the role value to be more robust
        const sanitizedRow = { ...row };
        if (sanitizedRow.role && typeof sanitizedRow.role === 'string') {
          sanitizedRow.role = sanitizedRow.role.trim().toLowerCase().replace(/ /g, '_');
        }
        // Sanitize email to remove ALL spaces and hidden characters, convert to lowercase
        if (sanitizedRow.email && typeof sanitizedRow.email === 'string') {
          sanitizedRow.email = sanitizedRow.email.trim().replace(/[\s\u200B-\u200D\uFEFF]/g, '').toLowerCase();
        }

        const validation = bulkCreateUserSchema.safeParse({
          ...sanitizedRow,
          telefono: sanitizedRow.telefono ? String(sanitizedRow.telefono) : undefined,
        });

        if (validation.success) {
          users.push(validation.data);
        } else {
          const firstError = validation.error.errors[0];
          errors.push(`Fila ${index + 2}: Campo '${firstError.path.join('.')}': ${firstError.message}`);
        }
      });

      if (errors.length > 0) {
        throw new Error(`Se detallaron ${errors.length} errores. Revisa el archivo:\n${errors.slice(0, 3).join('\n')}${errors.length > 3 ? '\n...' : ''}`);
      }

      setParsedUsers(users);
      toast({ title: "Archivo Procesado", description: `Se encontraron ${users.length} usuarios para importar.` });

    } catch (error: any) {
      toast({ variant: 'destructive', title: "Error al leer el archivo", description: error.message });
      setFile(null);
    } finally {
      setIsParsing(false);
    }
  };

  const handleBulkImport = async () => {
    if (parsedUsers.length === 0) {
      toast({ variant: 'destructive', title: 'No hay usuarios para importar' });
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createMultipleUsers(parsedUsers);
      toast({
        title: "Importación Completada",
        description: `Éxito: ${result.successCount}. Errores: ${result.errorCount}.`,
        duration: 8000
      });

      if (result.errorCount > 0) {
        // You could show a more detailed error report here
      }

      // Reset state and close
      setFile(null);
      setParsedUsers([]);
      onOpenChange(false);
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Error en la importación masiva", description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Upload className="h-5 w-5" />
            Carga Masiva de Usuarios
          </DialogTitle>
          <DialogDescription>
            Importe múltiples usuarios desde un archivo de Excel.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Columna de Instrucciones */}
          <div className="space-y-4">
            <h3 className="font-semibold">Instrucciones</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Descargue la plantilla de Excel.</li>
              <li>Llene los datos de los usuarios. Los campos con (*) son obligatorios.</li>
              <li>Guarde el archivo y súbalo en el área de la derecha.</li>
              <li>Revise los usuarios encontrados y haga clic en "Importar".</li>
            </ol>
            <Button variant="outline" onClick={handleDownloadTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Descargar Plantilla
            </Button>
            <div className="text-xs text-muted-foreground pt-4">
              <p><span className="font-bold">Columnas:</span> fullName*, email*, password*, role*, empresa*, ciudad, planta, area, telefono</p>
              <p className="mt-2"><span className="font-bold">Roles válidos:</span> solicitante, autorizante, lider_sst, admin, mantenimiento</p>
            </div>
          </div>
          {/* Columna de Carga */}
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div
              className="flex justify-center items-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-muted/50"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center">
                <FileUp className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  {file ? file.name : "Haga clic para seleccionar un archivo"}
                </p>
                <p className="text-xs text-gray-400">(.xlsx)</p>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".xlsx"
                onChange={handleFileChange}
              />
            </div>

            {isParsing && <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />}

            {parsedUsers.length > 0 && !isParsing && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Usuarios a Importar ({parsedUsers.length})</h4>
                <ScrollArea className="h-40 rounded-md border p-2">
                  <div className="space-y-1">
                    {parsedUsers.map((user, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs p-1 bg-background rounded">
                        <CircleCheck className="h-4 w-4 text-green-500" />
                        <span className="font-medium flex-1 truncate">{user.fullName}</span>
                        <span className="text-muted-foreground truncate">{user.email}</span>
                        <Badge variant="outline" className="text-xs">{user.role}</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleBulkImport} disabled={isParsing || isSubmitting || parsedUsers.length === 0}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            Importar {parsedUsers.length > 0 ? parsedUsers.length : ''} Usuarios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function UsersPage() {
  const { user: adminUser, loading: adminLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterEmpresa, setFilterEmpresa] = useState<string>('all');

  // Listas dinámicas para los dropdowns del formulario
  const [listEmpresas, setListEmpresas] = useState<string[]>([]);
  const [listPlantas, setListPlantas] = useState<string[]>([]);
  const [listCiudades, setListCiudades] = useState<string[]>([]);

  const createForm = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: 'solicitante',
      area: '',
      telefono: '',
      empresa: 'NIXUS',
      ciudad: '',
      planta: ''
    },
  });

  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
  });

  const handleExportExcel = () => {
    if (users.length === 0) {
      toast({
        title: "No hay usuarios",
        description: "No hay usuarios para exportar.",
        variant: "destructive"
      });
      return;
    }

    try {
      const usersToExport = users.map(user => {
        const otherRoles = (user.otherRoles ?? []).filter(
          (r): r is UserRole => r in roleNames
        );
        const otherRoleLabels = otherRoles.map(r => roleNames[r]);

        return {
          'Nombre Completo': user.displayName || '',
          'Correo Electrónico': user.email || '',
          'Rol Principal': user.role ? roleNames[user.role] : 'N/A',
          'Rol Adicional 1': otherRoleLabels[0] ?? '',
          'Rol Adicional 2': otherRoleLabels[1] ?? '',
          'Rol Adicional 3': otherRoleLabels[2] ?? '',
          'Todos los Roles': [
            user.role ? roleNames[user.role] : '',
            ...otherRoleLabels,
          ].filter(Boolean).join(' | '),
          'Empresa': user.empresa || '',
          'Ciudad': user.ciudad || '',
          'Planta': user.planta || '',
          'Área': user.area || '',
          'Teléfono': user.telefono || '',
          'Estado': user.disabled ? 'Inactivo' : 'Activo',
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(usersToExport);

      // Ajustar ancho de columnas automáticamente
      const colWidths = Object.keys(usersToExport[0] ?? {}).map(key => ({
        wch: Math.max(key.length, ...usersToExport.map(row => String((row as any)[key]).length)) + 2,
      }));
      worksheet['!cols'] = colWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios SGTC');

      XLSX.writeFile(workbook, `reporte_usuarios_sgtc_${new Date().toISOString().split('T')[0]}.xlsx`);

      toast({
        title: "✅ Exportación Exitosa",
        description: `Se exportaron ${users.length} usuarios.`
      });
    } catch (error: any) {
      toast({
        title: "Error de Exportación",
        description: "No se pudo generar el archivo de Excel.",
        variant: "destructive"
      });
    }
  };

  const handleMigrateRoles = async () => {
    setIsMigrating(true);
    try {
      const result = await migrateObsoleteRoles();
      if (result.error) throw new Error(result.error);
      toast({ title: 'Migración Completa', description: result.message });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error de Migración', description: error.message });
    } finally {
      setIsMigrating(false);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const result = await syncAuthAndFirestoreUsers();
      if (result.error) {
        throw new Error(result.error);
      }
      toast({
        title: 'Sincronización Completa',
        description: result.message,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error de Sincronización',
        description: error.message,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Suscripción a listas dinámicas (empresas, plantas, ciudades)
  useEffect(() => {
    const unsubs = [
      onSnapshot(doc(db, 'dynamic_lists', 'empresas'), snap => {
        setListEmpresas((snap.data()?.items ?? []).sort());
      }),
      onSnapshot(doc(db, 'dynamic_lists', 'plantas'), snap => {
        setListPlantas((snap.data()?.items ?? []).sort());
      }),
      onSnapshot(doc(db, 'dynamic_lists', 'ciudades'), snap => {
        setListCiudades((snap.data()?.items ?? []).sort());
      }),
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  useEffect(() => {
    if (!adminLoading && adminUser?.role !== 'admin') {
      toast({
        variant: 'destructive',
        title: 'Acceso Denegado',
        description: 'No tiene permisos para acceder a esta página.',
      });
      router.replace('/dashboard');
      return;
    }

    if (adminUser?.role === 'admin') {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id } as User));
        setUsers(usersData);
        setFilteredUsers(usersData);
        setLoadingUsers(false);
      }, (error) => {
        const permissionError = new FirestorePermissionError({
          path: usersCollection.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);

        toast({
          variant: 'destructive',
          title: 'Error al cargar usuarios',
          description: 'No tiene permisos para ver la lista de usuarios.'
        });
        setLoadingUsers(false);
      });

      return () => unsubscribe();
    }

  }, [adminUser, adminLoading, router, toast]);

  // Filtrado de usuarios
  useEffect(() => {
    let filtered = users;

    if (searchTerm.trim()) {
      filtered = filtered.filter(user =>
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.empresa?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user =>
        filterStatus === 'active' ? !user.disabled : user.disabled
      );
    }

    if (filterEmpresa !== 'all') {
      filtered = filtered.filter(user => user.empresa === filterEmpresa);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, users, filterRole, filterStatus, filterEmpresa]);

  async function onCreateSubmit(values: z.infer<typeof createFormSchema>) {
    setIsSubmitting(true);
    try {
      const result = await createUser(values);
      if (result.error) {
        throw new Error(result.error);
      }
      toast({
        title: '✅ Usuario Creado',
        description: `El usuario ${values.fullName} ha sido creado exitosamente.`,
      });
      createForm.reset();
      setShowCreateForm(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error al crear usuario',
        description: error.message || 'Ocurrió un error inesperado.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onUpdateSubmit(values: z.infer<typeof updateFormSchema>) {
    setIsSubmitting(true);
    try {
      const result = await updateUser(values);
      if (result.error) {
        throw new Error(result.error);
      }
      toast({
        title: '✅ Usuario Actualizado',
        description: `El usuario ${values.displayName} ha sido actualizado.`,
      });
      setIsEditModalOpen(false);
      setEditingUser(null);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error al actualizar',
        description: error.message || 'Ocurrió un error inesperado.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleStatusChange = async (userId: string, newStatus: boolean) => {
    const originalStatus = users.find(u => u.uid === userId)?.disabled;

    setUsers(users.map(u => u.uid === userId ? { ...u, disabled: !newStatus } : u));

    const result = await updateUserStatus(userId, !newStatus);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error al actualizar',
        description: result.error
      });
      setUsers(users.map(u => u.uid === userId ? { ...u, disabled: originalStatus } : u));
    } else {
      toast({
        title: 'Estado Actualizado',
        description: `El usuario ha sido ${!newStatus ? 'desactivado' : 'activado'}.`
      });
    }
  }

  const handleDeleteUser = async (userId: string, displayName: string | undefined) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar permanentemente al usuario ${displayName || ''}? Esta acción borrará su acceso y sus registros. NO se puede deshacer.`)) {
      return;
    }
    
    try {
      const result = await deleteUser(userId);
      if (result.error) throw new Error(result.error);
      toast({ title: 'Usuario Eliminado', description: 'El usuario ha sido eliminado del sistema.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'No se pudo eliminar al usuario.' });
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    updateForm.reset({
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
      role: user.role || 'solicitante',
      otherRoles: user.otherRoles || [],
      area: user.area || '',
      telefono: user.telefono || '',
      empresa: user.empresa || '',
      ciudad: user.ciudad || '',
      planta: user.planta || '',
    });
    setIsEditModalOpen(true);
  }

  // Stats
  const stats = {
    total: users.length,
    active: users.filter(u => !u.disabled).length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  const uniqueEmpresas = Array.from(
    new Set(users.map(u => u.empresa).filter(Boolean))
  ).sort() as string[];

  const hasActiveFilters = filterRole !== 'all' || filterStatus !== 'all' || filterEmpresa !== 'all';

  const clearFilters = () => {
    setFilterRole('all');
    setFilterStatus('all');
    setFilterEmpresa('all');
    setSearchTerm('');
  };

  if (adminLoading || adminUser?.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-sm text-gray-500 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col min-h-screen bg-gray-50">
        {/* Header Principal */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 md:px-8 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 md:p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                <UserCog className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900">
                  Gestión de Usuarios
                </h1>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5 hidden sm:block">
                  Administre los usuarios del sistema
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleMigrateRoles}
                disabled={isMigrating}
                variant="outline"
                className="h-11"
                title="Migrar usuarios con rol obsoleto 'Líder de Tarea' a 'Ejecutante del trabajo'"
              >
                {isMigrating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                Migrar Roles
              </Button>
              <Button
                onClick={() => setIsBulkUploadOpen(true)}
                variant="outline"
                className="h-11"
              >
                <Upload className="h-4 w-4 mr-2" />
                Carga Masiva
              </Button>
              <Button
                onClick={handleExportExcel}
                variant="outline"
                className="h-11"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-blue-600 hover:bg-blue-700 shadow-md h-11"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-4 md:px-8 py-4 md:py-6 grid grid-cols-3 gap-3 md:gap-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                <p className="text-xs text-gray-500">Activos</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
                <p className="text-xs text-gray-500">Admins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de creación colapsable en móvil */}
        {showCreateForm && (
          <div className="px-4 md:px-8 pb-4">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                  Crear Nuevo Usuario
                </CardTitle>
                <CardDescription>
                  Complete el formulario para añadir un nuevo usuario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...createForm}>
                  <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Juan Pérez" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="usuario@nixus.com" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="empresa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Empresa</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Seleccione una empresa" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {listEmpresas.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <FormField
                        control={createForm.control}
                        name="ciudad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ciudad</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value ?? ''}>
                              <FormControl>
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Seleccione una ciudad" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {listCiudades.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="planta"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Planta</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value ?? ''}>
                              <FormControl>
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Seleccione una planta" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {listPlantas.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Área</FormLabel>
                            <FormControl>
                              <Input placeholder="Mantenimiento" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="telefono"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="3001234567" className="h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={createForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rol del Usuario</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Seleccione un rol" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(roleNames).map(([role, name]) => (
                                <SelectItem key={role} value={role}>
                                  {name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCreateForm(false)}
                        className="flex-1 h-11"
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={isSubmitting} className="flex-1 h-11 bg-blue-600 hover:bg-blue-700">
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? 'Creando...' : 'Crear Usuario'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lista de usuarios */}
        <div className="flex-1 px-4 md:px-8 pb-6">
          <Card className="border border-gray-200 shadow-sm h-full">
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                      Lista de Usuarios
                    </CardTitle>
                    <CardDescription className="hidden md:block">
                      {filteredUsers.length} de {users.length} usuarios
                    </CardDescription>
                  </div>

                  {/* Búsqueda */}
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar usuario..."
                      className="pl-10 h-10 bg-gray-50 border-gray-200"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Filtro por Rol */}
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="h-9 w-full sm:w-52 bg-gray-50 border-gray-200 text-sm">
                      <SelectValue placeholder="Filtrar por Rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los roles</SelectItem>
                      {Object.entries(roleNames).map(([role, name]) => (
                        <SelectItem key={role} value={role}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Filtro por Estado */}
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="h-9 w-full sm:w-40 bg-gray-50 border-gray-200 text-sm">
                      <SelectValue placeholder="Filtrar por Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Filtro por Empresa */}
                  <Select value={filterEmpresa} onValueChange={setFilterEmpresa}>
                    <SelectTrigger className="h-9 w-full sm:w-52 bg-gray-50 border-gray-200 text-sm">
                      <SelectValue placeholder="Filtrar por Empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las empresas</SelectItem>
                      {uniqueEmpresas.map(empresa => (
                        <SelectItem key={empresa} value={empresa}>{empresa}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Limpiar filtros */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1.5 h-9 px-3 rounded-md text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                      Limpiar filtros
                    </button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loadingUsers ? (
                <div className="flex flex-col items-center justify-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
                  <p className="text-sm text-gray-500">Cargando usuarios...</p>
                </div>
              ) : (
                <>
                  {/* Vista móvil - Cards */}
                  <div className="md:hidden divide-y divide-gray-100">
                    {filteredUsers.length > 0 ? filteredUsers.map(user => (
                      <div key={user.uid} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                              {user.displayName?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.displayName}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <Switch
                            checked={!user.disabled}
                            onCheckedChange={(checked) => handleStatusChange(user.uid, checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${roleColors[user.role || 'solicitante']}`}>
                              {(roleNames[user.role || 'solicitante'] ?? 'Ejecutante').split(' ')[0]}
                            </Badge>
                            <span className="text-xs text-gray-500">{user.empresa}</span>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => openEditModal(user)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => handleDeleteUser(user.uid, user.displayName)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="p-12 text-center">
                        <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">No se encontraron usuarios</p>
                      </div>
                    )}
                  </div>

                  {/* Vista desktop - Tabla */}
                  <div className="hidden md:block overflow-auto">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="font-semibold text-xs uppercase text-gray-600">Usuario</TableHead>
                          <TableHead className="font-semibold text-xs uppercase text-gray-600">Empresa</TableHead>
                          <TableHead className="font-semibold text-xs uppercase text-gray-600">Rol</TableHead>
                          <TableHead className="font-semibold text-xs uppercase text-gray-600">Estado</TableHead>
                          <TableHead className="text-right font-semibold text-xs uppercase text-gray-600">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                          <TableRow key={user.uid} className={`group hover:bg-blue-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                                  {user.displayName?.charAt(0) || 'U'}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{user.displayName}</p>
                                  <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{user.empresa}</TableCell>
                            <TableCell>
                              <Badge className={`text-xs ${roleColors[user.role || 'solicitante']}`}>
                                {roleNames[user.role || 'solicitante']}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.disabled ? 'destructive' : 'default'} className={user.disabled ? '' : 'bg-green-100 text-green-700 border-green-200'}>
                                {user.disabled ? 'Inactivo' : 'Activo'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditModal(user)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Editar
                                </Button>
                                <Switch
                                  checked={!user.disabled}
                                  onCheckedChange={(checked) => handleStatusChange(user.uid, checked)}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.uid, user.displayName); }}
                                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center">
                              <div className="flex flex-col items-center text-gray-400">
                                <Users className="h-10 w-10 mb-3 opacity-30" />
                                <p className="font-medium">No se encontraron usuarios</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <BulkUploadDialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen} />

      {/* Modal de edición */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-lg mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600" />
              Editar Usuario
            </DialogTitle>
            <DialogDescription>
              Modifique la información del usuario
            </DialogDescription>
          </DialogHeader>
          <Form {...updateForm}>
            <form onSubmit={updateForm.handleSubmit(onUpdateSubmit)} className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
              <FormField
                control={updateForm.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateForm.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ''}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Seleccione una empresa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listEmpresas.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={updateForm.control}
                  name="ciudad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value ?? ''}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Seleccione una ciudad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listCiudades.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="planta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Planta</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value ?? ''}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Seleccione una planta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listPlantas.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={updateForm.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Área</FormLabel>
                      <FormControl>
                        <Input className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input type="tel" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={updateForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(roleNames).map(([role, name]) => (
                          <SelectItem key={role} value={role}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateForm.control}
                name="otherRoles"
                render={() => (
                  <FormItem>
                    <div className="mb-4 mt-4">
                      <FormLabel className="text-base">Roles Secundarios</FormLabel>
                      <DialogDescription>
                        Seleccione roles adicionales para este usuario.
                      </DialogDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(roleNames).map(([key, value]) => (
                        <FormField
                          key={key}
                          control={updateForm.control}
                          name="otherRoles"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={key}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(key as any)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), key])
                                        : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== key
                                          )
                                        )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {value}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4 gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="h-11">Cancelar</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting} className="h-11 bg-blue-600 hover:bg-blue-700">
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar Cambios
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

