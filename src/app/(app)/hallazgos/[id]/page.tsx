'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from '@/hooks/use-user';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, Pencil, Eye, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HallazgoForm } from '../components/hallazgo-form';
import type { Hallazgo } from '@/types';

export default function HallazgoDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { user } = useUser();
    const router = useRouter();

    const [hallazgo, setHallazgo] = useState<Hallazgo | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-w-3xl">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <button
                            onClick={() => router.push('/hallazgos')}
                            className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 transition-colors"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Hallazgos
                        </button>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Hallazgo #{hallazgo.numero}
                    </h1>
                    <p className="text-muted-foreground line-clamp-1">{hallazgo.hallazgo}</p>
                </div>
                {canEdit && (
                    <Button
                        variant={isEditing ? 'outline' : 'default'}
                        size="sm"
                        onClick={() => setIsEditing(v => !v)}
                        className="flex-shrink-0"
                    >
                        {isEditing
                            ? <><Eye className="mr-2 h-3.5 w-3.5" />Ver</>
                            : <><Pencil className="mr-2 h-3.5 w-3.5" />Editar</>
                        }
                    </Button>
                )}
            </div>

            <HallazgoForm hallazgo={hallazgo} isViewMode={!isEditing} />
        </div>
    );
}
