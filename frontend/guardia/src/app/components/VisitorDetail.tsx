import { ArrowLeft, Home, User, Car, Clock, CheckCircle, XCircle, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Visitor } from '../types/visitor';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

interface VisitorDetailProps {
  visitor: Visitor;
  onBack: () => void;
  onRegistrarIngreso: () => void;
  onRegistrarSalida: () => void;
}

export function VisitorDetail({
  visitor,
  onBack,
  onRegistrarIngreso,
  onRegistrarSalida,
}: VisitorDetailProps) {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Autorizado':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'En el complejo':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Salida registrada':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Visita':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Delivery':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Proveedor':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const canRegistrarIngreso = visitor.estado === 'Autorizado';
  const canRegistrarSalida = visitor.estado === 'En el complejo';
  const esAutorizado = visitor.estado === 'Autorizado';
  const enComplejo = visitor.estado === 'En el complejo';

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
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

        {/* INDICADOR DE VALIDACIÓN PRINCIPAL - MUY PROMINENTE */}
        {esAutorizado && (
          <Card className="p-6 mb-6 bg-green-500/10 border-[3px] border-green-500">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-500/20 rounded-2xl">
                <ShieldCheck className="size-12 text-green-500" />
              </div>
              <div>
                <div className="text-3xl text-green-400 font-bold tracking-tight mb-1">
                  ACCESO AUTORIZADO
                </div>
                <div className="text-lg text-green-400/80">
                  Verificación completada - Puede ingresar
                </div>
              </div>
            </div>
          </Card>
        )}

        {enComplejo && (
          <Card className="p-6 mb-6 bg-blue-500/10 border-[3px] border-blue-500">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-500/20 rounded-2xl">
                <CheckCircle className="size-12 text-blue-500" />
              </div>
              <div>
                <div className="text-3xl text-blue-400 font-bold tracking-tight mb-1">
                  VISITANTE EN COMPLEJO
                </div>
                <div className="text-lg text-blue-400/80">
                  Ingreso registrado correctamente
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Main Card - DATOS ESENCIALES */}
        <Card className="p-8 mb-6">
          {/* Casa - PRIMERA Y MÁS IMPORTANTE */}
          <div className="mb-8 bg-primary/5 p-6 rounded-xl border-2 border-primary/20">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Home className="size-10 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                CASA DE DESTINO
              </div>
            </div>
            <div className="text-6xl tracking-tight font-bold pl-2">{visitor.casa}</div>
          </div>

          <Separator className="my-8" />

          {/* Visitor Info */}
          <div className="space-y-8">
            {/* Nombre - MÁS GRANDE */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <User className="size-8 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                  NOMBRE DEL VISITANTE
                </div>
              </div>
              <div className="text-4xl pl-2 font-medium">{visitor.nombre}</div>
            </div>

            {/* Placa - MÁS GRANDE Y CLARA */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Car className="size-8 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                  PLACA DEL VEHÍCULO
                </div>
              </div>
              <div className="text-4xl tracking-[0.3em] pl-2 font-mono font-bold">{visitor.placa}</div>
            </div>

            {/* Tipo */}
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-3 font-semibold">
                TIPO DE VISITANTE
              </div>
              <Badge variant="outline" className={`text-xl px-5 py-2.5 ${getTipoColor(visitor.tipo)}`}>
                {visitor.tipo}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Timestamps */}
        {(visitor.horaIngreso || visitor.horaSalida) && (
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              {visitor.horaIngreso && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="size-6 text-green-500" />
                    <span className="text-xl">Hora de Ingreso</span>
                  </div>
                  <span className="text-2xl font-mono">
                    {new Date(visitor.horaIngreso).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}
              {visitor.horaSalida && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="size-6 text-red-500" />
                    <span className="text-xl">Hora de Salida</span>
                  </div>
                  <span className="text-2xl font-mono">
                    {new Date(visitor.horaSalida).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {canRegistrarIngreso && (
            <Button
              onClick={onRegistrarIngreso}
              size="lg"
              className="w-full h-20 text-2xl bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="size-8 mr-4" />
              Registrar Ingreso
            </Button>
          )}

          {canRegistrarSalida && (
            <Button
              onClick={onRegistrarSalida}
              size="lg"
              variant="destructive"
              className="w-full h-20 text-2xl"
            >
              <XCircle className="size-8 mr-4" />
              Registrar Salida
            </Button>
          )}

          {visitor.estado === 'Salida registrada' && (
            <div className="text-center py-8 text-muted-foreground text-xl">
              Visita completada
            </div>
          )}
        </div>
      </div>
    </div>
  );
}