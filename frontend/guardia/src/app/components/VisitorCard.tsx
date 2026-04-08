import { Home, User, Car, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Visitor } from '../types/visitor';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface VisitorCardProps {
  visitor: Visitor;
  onClick: () => void;
}

export function VisitorCard({ visitor, onClick }: VisitorCardProps) {
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

  // Determinar si está autorizado para entrada
  const esAutorizado = visitor.estado === 'Autorizado';
  const enComplejo = visitor.estado === 'En el complejo';
  
  // Colores de borde según autorización
  const getBorderColor = () => {
    if (esAutorizado) return 'border-green-500/60 shadow-green-500/20';
    if (enComplejo) return 'border-blue-500/60 shadow-blue-500/20';
    return 'border-border';
  };

  return (
    <Card
      className={`p-5 cursor-pointer hover:bg-accent/50 transition-all border-[3px] active:scale-[0.98] transform shadow-lg ${getBorderColor()}`}
      onClick={onClick}
    >
      {/* Indicador de Autorización - MUY VISIBLE */}
      <div className="flex items-center justify-between gap-4 mb-5">
        {esAutorizado && (
          <div className="flex items-center gap-3 bg-green-500/20 px-4 py-2.5 rounded-xl border-2 border-green-500/50">
            <CheckCircle className="size-8 text-green-500 flex-shrink-0" />
            <span className="text-xl text-green-400 font-medium">AUTORIZADO</span>
          </div>
        )}
        {enComplejo && (
          <div className="flex items-center gap-3 bg-blue-500/20 px-4 py-2.5 rounded-xl border-2 border-blue-500/50">
            <CheckCircle className="size-8 text-blue-500 flex-shrink-0" />
            <span className="text-xl text-blue-400 font-medium">EN COMPLEJO</span>
          </div>
        )}
        {!esAutorizado && !enComplejo && (
          <div className="flex items-center gap-3 bg-gray-500/20 px-4 py-2.5 rounded-xl border-2 border-gray-500/50">
            <XCircle className="size-8 text-gray-400 flex-shrink-0" />
            <span className="text-xl text-gray-400 font-medium">COMPLETADO</span>
          </div>
        )}
        <Badge variant="outline" className={getTipoColor(visitor.tipo)}>
          {visitor.tipo}
        </Badge>
      </div>

      {/* DATOS ESENCIALES - Más prominentes */}
      <div className="space-y-4">
        {/* Casa - Muy destacada */}
        <div className="flex items-center gap-4 bg-primary/5 p-3 rounded-lg">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Home className="size-7 text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Casa</div>
            <div className="text-3xl tracking-tight">{visitor.casa}</div>
          </div>
        </div>

        {/* Nombre - Destacado */}
        <div className="flex items-center gap-3">
          <User className="size-6 text-muted-foreground flex-shrink-0" />
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Nombre</div>
            <div className="text-xl font-medium">{visitor.nombre}</div>
          </div>
        </div>

        {/* Placa - Destacada */}
        <div className="flex items-center gap-3">
          <Car className="size-6 text-muted-foreground flex-shrink-0" />
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Placa</div>
            <div className="text-2xl tracking-widest font-mono">{visitor.placa}</div>
          </div>
        </div>

        {visitor.horaIngreso && (
          <div className="flex items-center gap-3 pt-2 border-t border-border/50">
            <Clock className="size-5 text-muted-foreground flex-shrink-0" />
            <span className="text-lg text-muted-foreground">
              Ingreso: {new Date(visitor.horaIngreso).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}