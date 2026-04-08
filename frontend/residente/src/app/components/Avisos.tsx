import React, { useState } from 'react';
import { ArrowLeft, Bell, AlertCircle, Info, CheckCircle, Eye } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Aviso {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  tipo: 'urgente' | 'informativo' | 'mantenimiento';
  leido: boolean;
}

interface AvisosProps {
  onBack: () => void;
}

export function Avisos({ onBack }: AvisosProps) {
  const [avisos, setAvisos] = useState<Aviso[]>([
    {
      id: '1',
      titulo: 'Corte de Agua Programado',
      mensaje: 'Se realizará mantenimiento en las tuberías principales. El servicio estará suspendido desde las 8:00 AM hasta las 2:00 PM del día viernes 21 de febrero.',
      fecha: '2026-02-17',
      tipo: 'urgente',
      leido: false,
    },
    {
      id: '2',
      titulo: 'Nueva Área de Juegos Infantiles',
      mensaje: 'Nos complace informar que se ha inaugurado la nueva área de juegos infantiles en el sector sur. Está disponible para todos los residentes de 7:00 AM a 7:00 PM.',
      fecha: '2026-02-15',
      tipo: 'informativo',
      leido: false,
    },
    {
      id: '3',
      titulo: 'Fumigación General',
      mensaje: 'Este sábado 22 de febrero se realizará fumigación en áreas comunes. Se recomienda mantener puertas y ventanas cerradas de 6:00 AM a 9:00 AM.',
      fecha: '2026-02-14',
      tipo: 'mantenimiento',
      leido: true,
    },
    {
      id: '4',
      titulo: 'Actualización de Reglamento',
      mensaje: 'Se ha actualizado el reglamento interno del residencial. Pueden consultar la versión completa en la oficina de administración o descargarla desde el portal.',
      fecha: '2026-02-10',
      tipo: 'informativo',
      leido: true,
    },
    {
      id: '5',
      titulo: 'Recordatorio de Pago',
      mensaje: 'Les recordamos que la fecha límite para el pago de la cuota de mantenimiento es el día 15 de cada mes. Evita cargos por mora.',
      fecha: '2026-02-08',
      tipo: 'informativo',
      leido: true,
    },
  ]);

  const marcarComoLeido = (id: string) => {
    setAvisos(avisos.map(aviso => 
      aviso.id === id ? { ...aviso, leido: true } : aviso
    ));
  };

  const noLeidos = avisos.filter(a => !a.leido).length;

  const getTipoConfig = (tipo: string) => {
    switch (tipo) {
      case 'urgente':
        return {
          icon: AlertCircle,
          bgColor: 'from-red-500 to-red-600',
          lightBg: 'bg-red-50',
          textColor: 'text-red-700',
          badgeColor: 'bg-red-100 text-red-700',
        };
      case 'mantenimiento':
        return {
          icon: Bell,
          bgColor: 'from-orange-500 to-orange-600',
          lightBg: 'bg-orange-50',
          textColor: 'text-orange-700',
          badgeColor: 'bg-orange-100 text-orange-700',
        };
      default:
        return {
          icon: Info,
          bgColor: 'from-blue-500 to-blue-600',
          lightBg: 'bg-blue-50',
          textColor: 'text-blue-700',
          badgeColor: 'bg-blue-100 text-blue-700',
        };
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-800">Avisos Oficiales</h1>
              {noLeidos > 0 && (
                <Badge className="bg-red-500 text-white">
                  {noLeidos}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">Comunicados de la administración</p>
          </div>
        </div>

        {/* Contador */}
        {noLeidos > 0 && (
          <Card className="mb-6 p-4 bg-gradient-to-r from-orange-500 to-orange-600 border-0 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {noLeidos} {noLeidos === 1 ? 'aviso nuevo' : 'avisos nuevos'}
                </p>
                <p className="text-orange-100 text-sm">
                  Haz clic en un aviso para marcarlo como leído
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Lista de Avisos */}
        <div className="space-y-4">
          {avisos.map((aviso) => {
            const config = getTipoConfig(aviso.tipo);
            const Icon = config.icon;

            return (
              <Card
                key={aviso.id}
                className={`border-0 shadow-md overflow-hidden transition-all hover:shadow-lg ${
                  !aviso.leido ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className={`h-1.5 bg-gradient-to-r ${config.bgColor}`}></div>
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${config.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-gray-800 leading-tight">
                          {aviso.titulo}
                        </h3>
                        {!aviso.leido && (
                          <Badge className="bg-blue-500 text-white flex-shrink-0">
                            Nuevo
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(aviso.fecha).toLocaleDateString('es-GT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className={`${config.lightBg} rounded-lg p-3 mb-3`}>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {aviso.mensaje}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={config.badgeColor}>
                      {aviso.tipo === 'urgente' && 'Urgente'}
                      {aviso.tipo === 'mantenimiento' && 'Mantenimiento'}
                      {aviso.tipo === 'informativo' && 'Informativo'}
                    </Badge>

                    {aviso.leido ? (
                      <div className="flex items-center gap-1.5 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-semibold">Leído</span>
                      </div>
                    ) : (
                      <Button
                        onClick={() => marcarComoLeido(aviso.id)}
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        Marcar como leído
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {avisos.length === 0 && (
          <Card className="p-12 text-center border-0 shadow-md">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-semibold mb-2">
              No hay avisos disponibles
            </p>
            <p className="text-gray-400 text-sm">
              Los comunicados importantes aparecerán aquí
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
