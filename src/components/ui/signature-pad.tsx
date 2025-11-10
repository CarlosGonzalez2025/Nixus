
"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Button } from './button';
import { Eraser, Loader2, Save } from 'lucide-react';
import { DialogFooter } from './dialog';
import { Checkbox } from './checkbox';
import { Label } from './label';

interface SignaturePadProps {
  onSave: (signature: string) => void;
  isSaving?: boolean;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, isSaving = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Consentimiento ahora es opcional. El componente padre decide si mostrarlo.
  // Por defecto, se asume que no se necesita consentimiento explícito aquí.
  const [hasConsented, setHasConsented] = useState(true);

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      canvas.width = container.offsetWidth;
      canvas.height = 200; // Keep a fixed height or make it responsive too
      const ctx = getCanvasContext();
      if(ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
      }
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const ctx = getCanvasContext();
    if (!ctx) return;
    
    const pos = getMousePos(event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (!isDrawing) return;
    const ctx = getCanvasContext();
    if (!ctx) return;

    const pos = getMousePos(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = getCanvasContext();
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };
  
  const getMousePos = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;

    if ('touches' in event.nativeEvent) {
      if (event.nativeEvent.touches.length === 0) return { x: 0, y: 0};
      clientX = event.nativeEvent.touches[0].clientX;
      clientY = event.nativeEvent.touches[0].clientY;
    } else {
      clientX = (event.nativeEvent as MouseEvent).clientX;
      clientY = (event.nativeEvent as MouseEvent).clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  const clearPad = () => {
    const canvas = canvasRef.current;
    const ctx = getCanvasContext();
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const blank = document.createElement('canvas');
      blank.width = canvas.width;
      blank.height = canvas.height;
      if(canvas.toDataURL() === blank.toDataURL()) {
        alert("Por favor, provea una firma.");
        return;
      }
      
      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="border border-gray-300 rounded-md bg-white cursor-crosshair touch-none w-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <DialogFooter className="w-full">
         <Button variant="outline" onClick={clearPad} disabled={isSaving}>
          <Eraser className="mr-2 h-4 w-4" />
          Limpiar
        </Button>
        <Button onClick={handleSave} disabled={!hasConsented || isSaving}>
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {isSaving ? 'Guardando...' : 'Guardar Firma'}
        </Button>
      </DialogFooter>
    </div>
  );
};
