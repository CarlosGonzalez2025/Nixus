'use client';

import { HallazgoForm } from '../components/hallazgo-form';

export default function CrearHallazgoPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 w-full max-w-4xl mx-auto">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Nuevo Hallazgo</h1>
                <p className="text-muted-foreground text-sm">Registra un nuevo hallazgo de seguridad.</p>
            </div>
            <HallazgoForm />
        </div>
    );
}
