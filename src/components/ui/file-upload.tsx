'use client';

import { useRef, useState, useCallback } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { Loader2, Trash2, FileText, UploadCloud, X, ExternalLink } from 'lucide-react';
import { Progress } from './progress';

interface FileUploadProps {
    /** Carpeta destino en Storage, ej: "hallazgos/evidencias" */
    folder: string;
    /** URLs ya guardadas */
    value: string[];
    /** Callback al añadir o quitar URLs */
    onChange: (urls: string[]) => void;
    /** Máximo de archivos permitidos (default: 10) */
    maxFiles?: number;
    disabled?: boolean;
    label?: string;
}

interface UploadItem {
    id: string;
    file: File;
    progress: number;
    error?: string;
    previewUrl: string;
}

function isImage(url: string) {
    const clean = url.split('?')[0].toLowerCase();
    return /\.(jpg|jpeg|png|webp|gif|heic|heif)$/.test(clean);
}

function isImageFile(file: File) {
    return file.type.startsWith('image/');
}

export function FileUpload({
    folder,
    value = [],
    onChange,
    maxFiles = 10,
    disabled = false,
    label = 'Agregar imágenes',
}: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState<UploadItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const activeUploads = uploading.filter(u => !u.error);
    const canAdd = !disabled && (value.length + activeUploads.length) < maxFiles;
    const remaining = maxFiles - value.length - activeUploads.length;

    const uploadFiles = useCallback((files: File[]) => {
        if (!storage || files.length === 0) return;

        const toUpload = files.slice(0, Math.max(remaining, 0));
        if (toUpload.length === 0) return;

        toUpload.forEach(file => {
            const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
            const previewUrl = isImageFile(file) ? URL.createObjectURL(file) : '';
            const item: UploadItem = { id, file, progress: 0, previewUrl };

            setUploading(prev => [...prev, item]);

            const ext = file.name.split('.').pop() || 'jpg';
            const storageRef = ref(storage, `${folder}/${id}.${ext}`);
            const task = uploadBytesResumable(storageRef, file);

            task.on(
                'state_changed',
                snap => {
                    const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                    setUploading(prev => prev.map(u => u.id === id ? { ...u, progress: pct } : u));
                },
                _err => {
                    setUploading(prev => prev.map(u =>
                        u.id === id ? { ...u, error: 'Error al subir. Intenta de nuevo.' } : u
                    ));
                },
                async () => {
                    const url = await getDownloadURL(task.snapshot.ref);
                    // onChange usa la ref de value capturada; el padre actualizará el campo
                    // con la URL nueva concatenada a las existentes en ese momento.
                    onChange([...value, url]);
                    setUploading(prev => prev.filter(u => u.id !== id));
                    if (previewUrl) URL.revokeObjectURL(previewUrl);
                }
            );
        });

        // Reset el input para poder seleccionar los mismos archivos de nuevo
        if (inputRef.current) inputRef.current.value = '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [folder, value.length, remaining]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) uploadFiles(Array.from(e.target.files));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (!canAdd) return;
        const files = Array.from(e.dataTransfer.files).filter(
            f => f.type.startsWith('image/') || f.type === 'application/pdf'
        );
        uploadFiles(files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (canAdd) setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const removeUploaded = (url: string) => onChange(value.filter(u => u !== url));
    const cancelUploading = (id: string) => setUploading(prev => prev.filter(u => u.id !== id));

    const isAnyUploading = activeUploads.length > 0;

    return (
        <div className="space-y-3">

            {/* Grid de archivos ya subidos */}
            {value.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {value.map((url, i) => (
                        <div key={url}
                            className="relative group rounded-lg overflow-hidden border border-border/60 bg-muted/20 aspect-square">
                            {isImage(url) ? (
                                <img
                                    src={url}
                                    alt={`Evidencia ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2">
                                    <FileText className="h-8 w-8 text-muted-foreground" />
                                    <span className="text-[10px] text-muted-foreground text-center leading-tight">
                                        Archivo {i + 1}
                                    </span>
                                </div>
                            )}
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <a href={url} target="_blank" rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    title="Ver en pantalla completa"
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
                                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                                </a>
                                {!disabled && (
                                    <button type="button" onClick={() => removeUploaded(url)}
                                        title="Eliminar"
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5 text-white" />
                                    </button>
                                )}
                            </div>
                            {/* Número de orden */}
                            <span className="absolute top-1 left-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                {i + 1}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Archivos en proceso de carga */}
            {uploading.length > 0 && (
                <div className="space-y-2">
                    {uploading.map(item => (
                        <div key={item.id}
                            className="rounded-lg border border-border/60 bg-muted/20 overflow-hidden">
                            <div className="flex items-center gap-3 p-2.5">
                                {item.previewUrl ? (
                                    <img src={item.previewUrl} alt="preview"
                                        className="w-10 h-10 object-cover rounded-md flex-shrink-0 border border-border/50" />
                                ) : (
                                    <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{item.file.name}</p>
                                    {item.error ? (
                                        <p className="text-xs text-destructive mt-0.5">{item.error}</p>
                                    ) : (
                                        <>
                                            <Progress value={item.progress} className="h-1.5 mt-1.5" />
                                            <p className="text-[10px] text-muted-foreground mt-1 tabular-nums">
                                                {item.progress < 100 ? `${item.progress}%` : 'Procesando...'}
                                            </p>
                                        </>
                                    )}
                                </div>
                                <button type="button" onClick={() => cancelUploading(item.id)}
                                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Zona de drop / botón de subida */}
            {canAdd && (
                <>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        multiple
                        className="hidden"
                        onChange={handleInputChange}
                        disabled={disabled}
                    />
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => !disabled && inputRef.current?.click()}
                        className={cn(
                            'w-full rounded-lg border-2 border-dashed transition-colors cursor-pointer',
                            'flex flex-col items-center justify-center gap-2 py-6 px-4 text-center',
                            isDragging
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border/60 hover:border-border hover:bg-muted/30 text-muted-foreground',
                            disabled && 'opacity-50 cursor-not-allowed'
                        )}
                    >
                        {isAnyUploading ? (
                            <><Loader2 className="h-6 w-6 animate-spin" />
                            <span className="text-sm font-medium">Subiendo {activeUploads.length} archivo{activeUploads.length > 1 ? 's' : ''}...</span></>
                        ) : (
                            <>
                                <UploadCloud className={cn('h-6 w-6', isDragging ? 'text-primary' : '')} />
                                <div>
                                    <p className="text-sm font-medium">{label}</p>
                                    <p className="text-xs opacity-70 mt-0.5">
                                        Arrastra aquí o haz clic · JPG, PNG, PDF
                                    </p>
                                    <p className="text-xs opacity-60 mt-0.5">
                                        Puedes seleccionar varios archivos a la vez · Máx. {remaining} más ({maxFiles} total)
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}

            {/* Límite alcanzado */}
            {!canAdd && !disabled && (
                <p className="text-xs text-center text-muted-foreground py-1 border border-dashed border-border/40 rounded-lg">
                    Límite de {maxFiles} archivos alcanzado · Elimina alguno para agregar más
                </p>
            )}
        </div>
    );
}
