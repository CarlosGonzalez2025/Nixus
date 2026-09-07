'use client';

import { HallazgoForm } from '../components/hallazgo-form';

export default function CrearHallazgoPage() {
    return (
        // Sin `gap`: el encabezado ya es la primera tarjeta del formulario y el
        // espaciado interno lo lleva el propio `<form>`.
        <div className="flex flex-1 flex-col p-4 md:p-6 w-full max-w-4xl mx-auto">
            <HallazgoForm
                header={{
                    title: 'Nuevo Hallazgo',
                    description: 'Registra un nuevo hallazgo de seguridad.',
                }}
                backHref="/hallazgos"
            />
        </div>
    );
}
