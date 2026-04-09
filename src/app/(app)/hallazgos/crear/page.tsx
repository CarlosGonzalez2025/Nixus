'use client';

import { HallazgoForm } from '../components/hallazgo-form';

export default function CrearHallazgoPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Nuevo Hallazgo</h1>
                <p className="text-muted-foreground">Registra un nuevo hallazgo de seguridad.</p>
            </div>
            <HallazgoForm />
        </div>
    );
}
