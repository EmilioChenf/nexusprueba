import { useState } from 'react';
import { ArrowLeft, Package, Home, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface QuickDeliveryProps {
  onBack: () => void;
  onConfirm: (casa: string) => void;
}

export function QuickDelivery({ onBack, onConfirm }: QuickDeliveryProps) {
  const [selectedCasa, setSelectedCasa] = useState<string | null>(null);

  const torres = ['A', 'B', 'C', 'D', 'E'];
  const numeros = ['1', '2', '3', '4', '5'];

  const handleCasaSelect = (torre: string, numero: string) => {
    const casaId = `${torre}-${numero}0${Math.floor(Math.random() * 9) + 1}`;
    setSelectedCasa(casaId);
  };

  const handleConfirm = () => {
    if (selectedCasa) {
      onConfirm(selectedCasa);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Button
          variant="ghost"
          size="lg"
          onClick={onBack}
          className="mb-6 h-14 text-xl px-4"
        >
          <ArrowLeft className="size-6 mr-3" />
          Volver
        </Button>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-orange-500/10 rounded-2xl">
              <Package className="size-12 text-orange-500" />
            </div>
          </div>
          <h1 className="text-4xl mb-2">Modo Delivery Rápido</h1>
          <p className="text-xl text-muted-foreground">
            Seleccione la casa de destino
          </p>
        </div>

        {/* Selected Casa Display */}
        {selectedCasa && (
          <Card className="p-8 mb-6 text-center bg-primary/5 border-2 border-primary">
            <div className="flex items-center justify-center gap-4 mb-2">
              <Home className="size-8 text-primary" />
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Casa Seleccionada
              </span>
            </div>
            <div className="text-6xl tracking-tight">{selectedCasa}</div>
          </Card>
        )}

        {/* Torre Selection */}
        <div className="mb-6">
          <h2 className="text-2xl mb-4">Torre</h2>
          <div className="grid grid-cols-5 gap-3">
            {torres.map((torre) => (
              <Button
                key={torre}
                variant="outline"
                size="lg"
                className="h-20 text-3xl"
                onClick={() => {
                  if (selectedCasa?.startsWith(torre)) {
                    setSelectedCasa(null);
                  }
                }}
              >
                {torre}
              </Button>
            ))}
          </div>
        </div>

        {/* Piso Selection */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Piso</h2>
          <div className="grid grid-cols-5 gap-3">
            {numeros.map((numero) => (
              <Button
                key={numero}
                variant="outline"
                size="lg"
                className="h-20 text-3xl"
                onClick={() => handleCasaSelect('A', numero)}
              >
                {numero}
              </Button>
            ))}
          </div>
        </div>

        {/* Simple Number Pad for Quick Casa Entry */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Acceso Rápido</h2>
          <p className="text-muted-foreground mb-4">
            Seleccione de la lista de entregas frecuentes
          </p>
          <div className="grid grid-cols-3 gap-3">
            {['A-101', 'B-205', 'C-312', 'D-401', 'E-520', 'A-103', 'B-208', 'C-315', 'D-405'].map(
              (casa) => (
                <Button
                  key={casa}
                  variant={selectedCasa === casa ? 'default' : 'outline'}
                  size="lg"
                  className="h-16 text-xl"
                  onClick={() => setSelectedCasa(casa)}
                >
                  {casa}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirm}
          disabled={!selectedCasa}
          size="lg"
          className="w-full h-20 text-2xl bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          <CheckCircle className="size-8 mr-4" />
          Confirmar Entrega
        </Button>
      </div>
    </div>
  );
}
