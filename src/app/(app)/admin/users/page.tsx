
'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
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
import { createUser, updateUser, updateUserStatus, createMultipleUsers, syncAuthAndFirestoreUsers, migrateObsoleteRoles, deleteUser, changeUserPassword } from './actions';
import { Loader2, UserPlus, Users, Edit, Trash2, Search, X, UserCog, Shield, ChevronDown, Upload, Download, FileText, FileUp, CircleCheck, CircleX, RefreshCw, ArrowUp, ArrowDown, ArrowUpDown, KeyRound, Eye, EyeOff } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import type { User, UserRole, AppModule } from '@/types';
import { USER_ROLES, ROLE_LABELS, MODULE_LABELS, ALL_MODULES, isInLiderRegionalScope } from '@/lib/role-config';
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
import { DataTablePagination } from '@/components/ui/data-table-pagination';

import { Checkbox } from '@/components/ui/checkbox';

const APP_MODULES_ENUM = ['permits', 'permits_create', 'hallazgos', 'contractor_verifications', 'users', 'lists', 'audit'] as const;

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
  allowedEmpresas: z.array(z.string()).optional(),
  allowedPlantas: z.array(z.string()).optional(),
  allowedCiudades: z.array(z.string()).optional(),
  allowedModules: z.array(z.enum(APP_MODULES_ENUM)).optional(),
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
  allowedEmpresas: z.array(z.string()).optional(),
  allowedPlantas: z.array(z.string()).optional(),
  allowedCiudades: z.array(z.string()).optional(),
  allowedModules: z.array(z.enum(APP_MODULES_ENUM)).optional(),
});

const changePasswordSchema = z.object({
  newPassword: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
  confirmPassword: z.string().min(6, { message: 'La confirmación es requerida.' }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword'],
});

const bulkCreateUserSchema = createFormSchema.extend({});
type BulkUser = z.infer<typeof bulkCreateUserSchema>;


const roleNames: { [key in UserRole]: string } = ROLE_LABELS;

const roleColors: { [key in UserRole]: string } = {
  solicitante: 'bg-blue-100 text-blue-700 border-blue-200',
  autorizante: 'bg-purple-100 text-purple-700 border-purple-200',
  lider_sst: 'bg-orange-100 text-orange-700 border-orange-200',
  admin: 'bg-red-100 text-red-700 border-red-200',
  mantenimiento: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  asesor_arl: 'bg-green-100 text-green-700 border-green-200',
  lider_regional: 'bg-indigo-100 text-indigo-700 border-indigo-200',
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

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordTargetUser, setPasswordTargetUser] = useState<User | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterEmpresa, setFilterEmpresa] = useState<string>('all');
  const [filterCiudad, setFilterCiudad] = useState<string>('all');

  // DataTable state
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

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
      planta: '',
      allowedEmpresas: [],
      allowedPlantas: [],
      allowedCiudades: [],
      allowedModules: [],
    },
  });

  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
  });

  const passwordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
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
          'UID': user.uid,
          'Nombre Completo': user.displayName || '',
          'Correo Electrónico': user.email || '',
          'Rol Principal': user.role ? roleNames[user.role] : 'N/A',
          'Roles Adicionales': otherRoleLabels.join(' | ') || 'Ninguno',
          'Todos los Roles (CSV)': [
            user.role ? roleNames[user.role] : '',
            ...otherRoleLabels,
          ].filter(Boolean).join(', '),
          'Empresa': user.empresa || 'N/A',
          'Ciudad': user.ciudad || 'N/A',
          'Planta': user.planta || 'N/A',
          'Área': user.area || 'N/A',
          'Teléfono': user.telefono || 'N/A',
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
    const sortEs = (a: string, b: string) => a.localeCompare(b, 'es', { sensitivity: 'base' });
    const unsubs = [
      onSnapshot(doc(db, 'dynamic_lists', 'empresas'), snap => {
        setListEmpresas((snap.data()?.items ?? []).slice().sort(sortEs));
      }),
      onSnapshot(doc(db, 'dynamic_lists', 'plantas'), snap => {
        setListPlantas((snap.data()?.items ?? []).slice().sort(sortEs));
      }),
      onSnapshot(doc(db, 'dynamic_lists', 'ciudades'), snap => {
        setListCiudades((snap.data()?.items ?? []).slice().sort(sortEs));
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
      filtered = filtered.filter(user => user.empresa?.toLowerCase() === filterEmpresa.toLowerCase());
    }

    if (filterCiudad !== 'all') {
      filtered = filtered.filter(user => user.ciudad?.toLowerCase() === filterCiudad.toLowerCase());
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users, filterRole, filterStatus, filterEmpresa, filterCiudad]);

  // ── Sort + paginate filteredUsers ────────────────────────────────────────
  const sortedUsers = useMemo(() => {
    if (!sortColumn) return filteredUsers;
    return [...filteredUsers].sort((a, b) => {
      let result = 0;
      switch (sortColumn) {
        case 'nombre':
          result = (a.displayName || '').localeCompare(b.displayName || '');
          break;
        case 'empresa':
          result = (a.empresa || '').localeCompare(b.empresa || '');
          break;
        case 'ciudad':
          result = (a.ciudad || '').localeCompare(b.ciudad || '');
          break;
        case 'planta':
          result = (a.planta || '').localeCompare(b.planta || '');
          break;
        case 'rol':
          result = (a.role || '').localeCompare(b.role || '');
          break;
        case 'estado':
          result = (a.disabled ? 1 : 0) - (b.disabled ? 1 : 0);
          break;
      }
      return sortDir === 'asc' ? result : -result;
    });
  }, [filteredUsers, sortColumn, sortDir]);

  const totalUserPages = Math.ceil(sortedUsers.length / pageSize);
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDir === 'asc') setSortDir('desc');
      else { setSortColumn(null); setSortDir('asc'); }
    } else {
      setSortColumn(column);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const uniqueEmpresas = useMemo(() =>
    Array.from(new Set(users.map(u => u.empresa).filter(Boolean)))
      .sort((a, b) => (a as string).localeCompare(b as string, 'es', { sensitivity: 'base' })) as string[],
    [users]
  );

  const uniqueCiudades = useMemo(() =>
    Array.from(new Set(users.map(u => u.ciudad).filter(Boolean)))
      .sort((a, b) => (a as string).localeCompare(b as string, 'es', { sensitivity: 'base' })) as string[],
    [users]
  );

  const hasActiveFilters = searchTerm !== '' || filterRole !== 'all' || filterStatus !== 'all' || filterEmpresa !== 'all' || filterCiudad !== 'all';

  const clearFilters = () => {
    setSearchTerm('');
    setFilterRole('all');
    setFilterStatus('all');
    setFilterEmpresa('all');
    setFilterCiudad('all');
    setCurrentPage(1);
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortColumn !== col) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

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
      allowedEmpresas: user.allowedEmpresas || [],
      allowedPlantas: user.allowedPlantas || [],
      allowedCiudades: user.allowedCiudades || [],
      allowedModules: (user.allowedModules || []) as AppModule[],
    });
    setIsEditModalOpen(true);
  }

  const openPasswordModal = (user: User) => {
    setPasswordTargetUser(user);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    passwordForm.reset({ newPassword: '', confirmPassword: '' });
    setIsPasswordModalOpen(true);
  };

  const handleChangePassword = async (values: z.infer<typeof changePasswordSchema>) => {
    if (!passwordTargetUser) return;
    setIsChangingPassword(true);
    try {
      const result = await changeUserPassword(passwordTargetUser.uid, values.newPassword);
      if (result.error) throw new Error(result.error);
      toast({
        title: 'Contraseña actualizada',
        description: `La contraseña de ${passwordTargetUser.displayName || passwordTargetUser.email} fue cambiada exitosamente.`,
      });
      setIsPasswordModalOpen(false);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error al cambiar contraseña',
        description: error.message || 'Ocurrió un error inesperado.',
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Stats
  const stats = {
    total: users.length,
    active: users.filter(u => !u.disabled).length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  const canAccessUsersPage = adminUser?.role === 'admin' ||
    (adminUser?.role === 'lider_regional' && adminUser.allowedModules?.includes('users'));

  if (adminLoading || !canAccessUsersPage) {
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
    <div className="flex flex-1 flex-col min-h-screen bg-gray-50/50">
      {/* Header Moderno */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-blue-200 shadow-lg">
              <UserCog className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                Gestión de Usuarios
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Panel administrativo de control y accesos
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={handleMigrateRoles}
              disabled={isMigrating}
              variant="outline"
              className="h-10 text-xs font-semibold"
            >
              {isMigrating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Migrar Roles
            </Button>
            <Button
              onClick={handleSync}
              disabled={isSyncing}
              variant="outline"
              className="h-10 text-xs font-semibold"
            >
              {isSyncing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Sincronizar
            </Button>
            <Button
              onClick={() => setIsBulkUploadOpen(true)}
              variant="outline"
              className="h-10 text-xs font-semibold border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <FileUp className="h-4 w-4 mr-2" />
              Carga Masiva
            </Button>
            <Button
              onClick={handleExportExcel}
              variant="outline"
              className="h-10 text-xs font-semibold border-green-200 text-green-700 hover:bg-green-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 hover:bg-blue-700 shadow-blue-100 shadow-lg h-10 text-xs font-bold"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6 py-6">
        {/* Stats Summary */}
        <div className="px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Usuarios', value: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Usuarios Activos', value: stats.active, icon: CircleCheck, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Administradores', value: stats.admins, icon: Shield, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Otras Empresas', value: uniqueEmpresas.length, icon: UserPlus, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn("p-2.5 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Formulario de creación */}
        {showCreateForm && (
          <div className="px-4 md:px-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <Card className="border-blue-100 bg-blue-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg text-blue-900">
                  <UserPlus className="h-5 w-5" />
                  Nuevo Usuario
                </CardTitle>
                <CardDescription>Registre los datos del nuevo integrante del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...createForm}>
                  <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={createForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-gray-500">Nombre Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Juan Pérez" className="h-10 bg-white" {...field} />
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
                            <FormLabel className="text-xs font-bold uppercase text-gray-500">Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="usuario@empresa.com" className="h-10 bg-white" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-gray-500">Contraseña</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" className="h-10 bg-white" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <FormField
                        control={createForm.control}
                        name="empresa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-gray-500">Empresa</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-10 bg-white">
                                  <SelectValue placeholder="Empresa" />
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
                      <FormField
                        control={createForm.control}
                        name="ciudad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-gray-500">Ciudad</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value ?? ''}>
                              <FormControl>
                                <SelectTrigger className="h-10 bg-white">
                                  <SelectValue placeholder="Ciudad" />
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
                            <FormLabel className="text-xs font-bold uppercase text-gray-500">Planta</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value ?? ''}>
                              <FormControl>
                                <SelectTrigger className="h-10 bg-white">
                                  <SelectValue placeholder="Planta" />
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
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-gray-500">Rol</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-10 bg-white">
                                  <SelectValue placeholder="Rol" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(roleNames).map(([role, name]) => (
                                  <SelectItem key={role} value={role}>{name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* ── Scope Líder Regional (create) ── */}
                    {createForm.watch('role') === 'lider_regional' && (
                      <div className="border rounded-lg p-4 space-y-4 bg-indigo-50/50">
                        <p className="text-sm font-semibold text-indigo-700">Scope del Líder Regional</p>

                        <div>
                          <p className="text-xs font-bold uppercase text-gray-500 mb-2">Módulos con acceso</p>
                          <div className="grid grid-cols-2 gap-2">
                            {ALL_MODULES.map(mod => (
                              <label key={mod} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                  checked={(createForm.watch('allowedModules') || []).includes(mod)}
                                  onCheckedChange={(checked) => {
                                    const current = createForm.getValues('allowedModules') || [];
                                    createForm.setValue('allowedModules',
                                      checked ? [...current, mod] : current.filter(m => m !== mod)
                                    );
                                  }}
                                />
                                <span className="text-sm">{MODULE_LABELS[mod]}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase text-gray-500 mb-2">Empresas (vacío = todas)</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {(createForm.watch('allowedEmpresas') || []).map(e => (
                              <Badge key={e} variant="secondary" className="gap-1">
                                {e}
                                <button type="button" onClick={() => createForm.setValue('allowedEmpresas',
                                  (createForm.getValues('allowedEmpresas') || []).filter(x => x !== e)
                                )}><X className="h-3 w-3" /></button>
                              </Badge>
                            ))}
                          </div>
                          <Select onValueChange={(v) => {
                            const current = createForm.getValues('allowedEmpresas') || [];
                            if (!current.includes(v)) createForm.setValue('allowedEmpresas', [...current, v]);
                          }}>
                            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Agregar empresa..." /></SelectTrigger>
                            <SelectContent>
                              {listEmpresas.filter(e => !(createForm.watch('allowedEmpresas') || []).includes(e)).map(e => (
                                <SelectItem key={e} value={e}>{e}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase text-gray-500 mb-2">Plantas (vacío = todas)</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {(createForm.watch('allowedPlantas') || []).map(p => (
                              <Badge key={p} variant="secondary" className="gap-1">
                                {p}
                                <button type="button" onClick={() => createForm.setValue('allowedPlantas',
                                  (createForm.getValues('allowedPlantas') || []).filter(x => x !== p)
                                )}><X className="h-3 w-3" /></button>
                              </Badge>
                            ))}
                          </div>
                          <Select onValueChange={(v) => {
                            const current = createForm.getValues('allowedPlantas') || [];
                            if (!current.includes(v)) createForm.setValue('allowedPlantas', [...current, v]);
                          }}>
                            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Agregar planta..." /></SelectTrigger>
                            <SelectContent>
                              {listPlantas.filter(p => !(createForm.watch('allowedPlantas') || []).includes(p)).map(p => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase text-gray-500 mb-2">Ciudades (vacío = todas)</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {(createForm.watch('allowedCiudades') || []).map(c => (
                              <Badge key={c} variant="secondary" className="gap-1">
                                {c}
                                <button type="button" onClick={() => createForm.setValue('allowedCiudades',
                                  (createForm.getValues('allowedCiudades') || []).filter(x => x !== c)
                                )}><X className="h-3 w-3" /></button>
                              </Badge>
                            ))}
                          </div>
                          <Select onValueChange={(v) => {
                            const current = createForm.getValues('allowedCiudades') || [];
                            if (!current.includes(v)) createForm.setValue('allowedCiudades', [...current, v]);
                          }}>
                            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Agregar ciudad..." /></SelectTrigger>
                            <SelectContent>
                              {listCiudades.filter(c => !(createForm.watch('allowedCiudades') || []).includes(c)).map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-3 border-t pt-6">
                      <Button type="button" variant="ghost" onClick={() => setShowCreateForm(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 min-w-[150px]">
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                        Registrar Usuario
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabla de Usuarios */}
        <div className="px-4 md:px-8 pb-10">
          <Card className="shadow-sm border-gray-200 overflow-hidden">
            <div className="p-4 bg-white border-b flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre, email, empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 bg-gray-50/50 border-gray-200"
                />
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-full md:w-[160px] h-11 bg-white">
                    <SelectValue placeholder="Rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los Roles</SelectItem>
                    {USER_ROLES.map(role => (
                      <SelectItem key={role} value={role}>{ROLE_LABELS[role]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterEmpresa} onValueChange={setFilterEmpresa}>
                  <SelectTrigger className="w-full md:w-[180px] h-11 bg-white">
                    <SelectValue placeholder="Empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las Empresas</SelectItem>
                    {uniqueEmpresas.map(emp => (
                      <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterCiudad} onValueChange={setFilterCiudad}>
                  <SelectTrigger className="w-full md:w-[160px] h-11 bg-white">
                    <SelectValue placeholder="Ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las Ciudades</SelectItem>
                    {uniqueCiudades.map(ciudad => (
                      <SelectItem key={ciudad} value={ciudad}>{ciudad}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[130px] h-11 bg-white">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                  </SelectContent>
                </Select>
                {hasActiveFilters && (
                  <Button variant="ghost" size="icon" onClick={clearFilters} className="h-11 w-11 text-gray-400 hover:text-red-500">
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="py-4 pl-6 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('nombre')}>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Usuario <SortIcon col="nombre" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('rol')}>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Rol Principal <SortIcon col="rol" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('empresa')}>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Empresa <SortIcon col="empresa" />
                      </div>
                    </TableHead>
                    <TableHead className="hidden lg:table-cell cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('planta')}>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Ubicación <SortIcon col="planta" />
                      </div>
                    </TableHead>
                    <TableHead className="text-center cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('estado')}>
                      <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Estado <SortIcon col="estado" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right pr-6 text-xs font-bold uppercase tracking-wider text-gray-500">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingUsers ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-80 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                          <p className="text-gray-500 font-medium">Cargando base de datos...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-80 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                          <div className="bg-gray-100 p-6 rounded-full text-gray-300">
                            <Search className="h-12 w-12" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-900 font-bold text-lg">Sin resultados</p>
                            <p className="text-gray-500 text-sm max-w-[250px] mx-auto">No encontramos usuarios que coincidan con tus criterios de búsqueda.</p>
                          </div>
                          {hasActiveFilters && (
                            <Button variant="outline" size="sm" onClick={clearFilters} className="mt-2">
                              Limpiar todos los filtros
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((user) => (
                        <TableRow key={user.uid} className="group hover:bg-blue-50/30 transition-colors">
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                                {user.displayName?.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                                  {user.displayName}
                                </span>
                                <span className="text-xs text-gray-500 line-clamp-1">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1.5">
                              <Badge className={cn("font-medium px-2.5 py-0.5", user.role ? roleColors[user.role] : 'bg-gray-100 text-gray-700')}>
                                {user.role ? roleNames[user.role] : 'Sin Rol'}
                              </Badge>
                              {(user.otherRoles ?? []).length > 0 && (
                                <Badge variant="outline" className="bg-white text-gray-600 border-gray-200">
                                  +{(user.otherRoles ?? []).length}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium text-gray-700">{user.empresa || '—'}</span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-700 font-medium">{user.planta || '—'}</span>
                              <span className="text-xs text-gray-500">{user.ciudad || '—'}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center gap-1.5">
                              <Switch
                                checked={!user.disabled}
                                onCheckedChange={(checked) => handleStatusChange(user.uid, checked)}
                                className="data-[state=checked]:bg-green-600"
                              />
                              <span className={cn(
                                "text-[10px] font-bold uppercase tracking-wider",
                                user.disabled ? "text-red-500" : "text-green-600"
                              )}>
                                {user.disabled ? 'Inactivo' : 'Activo'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditModal(user)}
                                className="h-9 w-9 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                                title="Editar Usuario"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openPasswordModal(user)}
                                className="h-9 w-9 text-amber-600 hover:bg-amber-100 hover:text-amber-700"
                                title="Cambiar Contraseña"
                              >
                                <KeyRound className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteUser(user.uid, user.displayName ?? undefined)}
                                className="h-9 w-9 text-red-600 hover:bg-red-100 hover:text-red-700"
                                title="Eliminar Usuario"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {/* Paginación */}
              {!loadingUsers && filteredUsers.length > 0 && (
                <div className="p-4 border-t bg-gray-50/30">
                  <DataTablePagination
                    currentPage={currentPage}
                    totalPages={totalUserPages}
                    pageSize={pageSize}
                    totalRows={filteredUsers.length}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
                  />
                </div>
              )}
          </Card>
        </div>
      </div>

      <BulkUploadDialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen} />

      {/* Modal cambio de contraseña */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-amber-600" />
              Cambiar Contraseña
            </DialogTitle>
            <DialogDescription>
              Establece una nueva contraseña para{' '}
              <span className="font-medium text-foreground">
                {passwordTargetUser?.displayName || passwordTargetUser?.email}
              </span>
              . El usuario deberá usarla en su próximo inicio de sesión.
            </DialogDescription>
          </DialogHeader>

          {/* Info del usuario */}
          {passwordTargetUser && (
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 border px-4 py-3 text-sm">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{passwordTargetUser.displayName}</p>
                <p className="text-muted-foreground truncate text-xs">{passwordTargetUser.email}</p>
              </div>
              <Badge variant="outline" className={cn('text-xs shrink-0', roleColors[passwordTargetUser.role as UserRole])}>
                {roleNames[passwordTargetUser.role as UserRole] ?? passwordTargetUser.role}
              </Badge>
            </div>
          )}

          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? 'text' : 'password'}
                          placeholder="Mínimo 6 caracteres"
                          className="pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowNewPassword(v => !v)}
                          tabIndex={-1}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Repite la nueva contraseña"
                          className="pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowConfirmPassword(v => !v)}
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isChangingPassword}>
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {isChangingPassword
                    ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...</>
                    : <><KeyRound className="mr-2 h-4 w-4" /> Cambiar contraseña</>
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

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
              {/* ── Scope Líder Regional ── */}
              {updateForm.watch('role') === 'lider_regional' && (
                <div className="border rounded-lg p-4 space-y-4 bg-indigo-50/50">
                  <p className="text-sm font-semibold text-indigo-700">Scope del Líder Regional</p>

                  {/* Módulos permitidos */}
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">Módulos con acceso</p>
                    <div className="grid grid-cols-2 gap-2">
                      {ALL_MODULES.map(mod => (
                        <label key={mod} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={(updateForm.watch('allowedModules') || []).includes(mod)}
                            onCheckedChange={(checked) => {
                              const current = updateForm.getValues('allowedModules') || [];
                              updateForm.setValue('allowedModules',
                                checked ? [...current, mod] : current.filter(m => m !== mod)
                              );
                            }}
                          />
                          <span className="text-sm">{MODULE_LABELS[mod]}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Empresas permitidas */}
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">Empresas (vacío = todas)</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(updateForm.watch('allowedEmpresas') || []).map(e => (
                        <Badge key={e} variant="secondary" className="gap-1">
                          {e}
                          <button type="button" onClick={() => updateForm.setValue('allowedEmpresas',
                            (updateForm.getValues('allowedEmpresas') || []).filter(x => x !== e)
                          )}><X className="h-3 w-3" /></button>
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={(v) => {
                      const current = updateForm.getValues('allowedEmpresas') || [];
                      if (!current.includes(v)) updateForm.setValue('allowedEmpresas', [...current, v]);
                    }}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Agregar empresa..." /></SelectTrigger>
                      <SelectContent>
                        {listEmpresas.filter(e => !(updateForm.watch('allowedEmpresas') || []).includes(e)).map(e => (
                          <SelectItem key={e} value={e}>{e}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Plantas permitidas */}
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">Plantas (vacío = todas)</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(updateForm.watch('allowedPlantas') || []).map(p => (
                        <Badge key={p} variant="secondary" className="gap-1">
                          {p}
                          <button type="button" onClick={() => updateForm.setValue('allowedPlantas',
                            (updateForm.getValues('allowedPlantas') || []).filter(x => x !== p)
                          )}><X className="h-3 w-3" /></button>
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={(v) => {
                      const current = updateForm.getValues('allowedPlantas') || [];
                      if (!current.includes(v)) updateForm.setValue('allowedPlantas', [...current, v]);
                    }}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Agregar planta..." /></SelectTrigger>
                      <SelectContent>
                        {listPlantas.filter(p => !(updateForm.watch('allowedPlantas') || []).includes(p)).map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ciudades permitidas */}
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">Ciudades (vacío = todas)</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(updateForm.watch('allowedCiudades') || []).map(c => (
                        <Badge key={c} variant="secondary" className="gap-1">
                          {c}
                          <button type="button" onClick={() => updateForm.setValue('allowedCiudades',
                            (updateForm.getValues('allowedCiudades') || []).filter(x => x !== c)
                          )}><X className="h-3 w-3" /></button>
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={(v) => {
                      const current = updateForm.getValues('allowedCiudades') || [];
                      if (!current.includes(v)) updateForm.setValue('allowedCiudades', [...current, v]);
                    }}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Agregar ciudad..." /></SelectTrigger>
                      <SelectContent>
                        {listCiudades.filter(c => !(updateForm.watch('allowedCiudades') || []).includes(c)).map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

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
    </div>
  );
}

