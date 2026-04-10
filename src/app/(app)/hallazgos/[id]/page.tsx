'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from '@/hooks/use-user';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, Pencil, Eye, ChevronLeft, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HallazgoForm } from '../components/hallazgo-form';
import type { Hallazgo } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function HallazgoDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { user } = useUser();
    const router = useRouter();
    const { toast } = useToast();

    const [hallazgo, setHallazgo] = useState<Hallazgo | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [generatingPdf, setGeneratingPdf] = useState(false);

    useEffect(() => {
        if (!db || !id) return;
        getDoc(doc(db, 'hallazgos', id))
            .then(snap => {
                if (snap.exists()) setHallazgo({ id: snap.id, ...snap.data() } as Hallazgo);
                else setNotFound(true);
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [id]);

    const canEdit = user?.role === 'lider_sst' || user?.role === 'admin' ||
        (user?.role === 'solicitante' && hallazgo?.createdBy === user?.uid);

    const handleDownloadPdf = async () => {
        if (!hallazgo) return;
        setGeneratingPdf(true);
        try {
            const { generateHallazgoPDF } = await import('@/lib/pdf-hallazgo');
            await generateHallazgoPDF(hallazgo);
        } catch (err) {
            console.error('Error generando PDF:', err);
            toast({ variant: 'destructive', title: 'Error', description: 'No se pudo generar el PDF.' });
        } finally {
            setGeneratingPdf(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-1 justify-center items-center h-60">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (notFound || !hallazgo) {
        return (
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="h-60 text-center flex flex-col justify-center items-center">
                    <p className="font-semibold">Hallazgo no encontrado</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        El hallazgo solicitado no existe o no tienes acceso.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4"
                        onClick={() => router.push('/hallazgos')}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Volver a la lista
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 w-full max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <button
                            onClick={() => router.push('/hallazgos')}
                            className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 transition-colors"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Hallazgos
                        </button>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                        Hallazgo #{hallazgo.numero}
                    </h1>
                    <p className="text-muted-foreground text-sm line-clamp-1">{hallazgo.hallazgo}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadPdf}
                        disabled={generatingPdf}
                    >
                        {generatingPdf
                            ? <><Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />Generando...</>
                            : <><FileDown className="mr-2 h-3.5 w-3.5" />Descargar PDF</>
                        }
                    </Button>
                    {canEdit && (
                        <Button
                            variant={isEditing ? 'outline' : 'default'}
                            size="sm"
                            onClick={() => setIsEditing(v => !v)}
                        >
                            {isEditing
                                ? <><Eye className="mr-2 h-3.5 w-3.5" />Ver</>
                                : <><Pencil className="mr-2 h-3.5 w-3.5" />Editar</>
                            }
                        </Button>
                    )}
                </div>
            </div>

            <HallazgoForm hallazgo={hallazgo} isViewMode={!isEditing} />
        </div>
    );
}
