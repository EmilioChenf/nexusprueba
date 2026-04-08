import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, CheckCircle, Clock, Users, MapPin, Dumbbell, CreditCard, Download, Eye, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Amenidad {
  id: string;
  nombre: string;
  icono: React.ReactNode;
  disponible: boolean;
  ocupacion: number;
}

interface Reserva {
  fecha: string;
  hora: string;
  amenidad: string;
}

interface Pago {
  id: string;
  fecha: string;
  concepto: string;
  monto: number;
  estado: 'pagado' | 'pendiente';
}

interface AmenidadesProps {
  onBack: () => void;
}

export function Amenidades({ onBack }: AmenidadesProps) {
  const [selectedAmenidad, setSelectedAmenidad] = useState<string>('piscina');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHora, setSelectedHora] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [reservas, setReservas] = useState<Reserva[]>([
    { fecha: '2026-03-17', hora: '10:00', amenidad: 'piscina' },
    { fecha: '2026-03-18', hora: '15:00', amenidad: 'salon' },
  ]);

  const [saldo] = useState(750.00);
  const [fechaVencimiento] = useState('2026-03-15');
  const [enMora] = useState(false);
  const [pagos] = useState<Pago[]>([
    {
      id: '1',
      fecha: '2026-02-01',
      concepto: 'Mantenimiento Febrero 2026',
      monto: 750.00,
      estado: 'pendiente',
    },
    {
      id: '2',
      fecha: '2026-01-15',
      concepto: 'Mantenimiento Enero 2026',
      monto: 750.00,
      estado: 'pagado',
    },
    {
      id: '3',
      fecha: '2025-12-15',
      concepto: 'Mantenimiento Diciembre 2025',
      monto: 750.00,
      estado: 'pagado',
    },
  ]);

  const amenidades: Amenidad[] = [
    { 
      id: 'piscina', 
      nombre: 'Piscina', 
      icono: <Users className="w-5 h-5" />,
      disponible: true,
      ocupacion: 35
    },
    { 
      id: 'salon', 
      nombre: 'Salón de Eventos', 
      icono: <MapPin className="w-5 h-5" />,
      disponible: false,
      ocupacion: 80
    },
    { 
      id: 'gym', 
      nombre: 'Gimnasio', 
      icono: <Dumbbell className="w-5 h-5" />,
      disponible: true,
      ocupacion: 20
    },
  ];

  const horas = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  ];

  // Generar días de la semana actual
  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    
    // Obtener el lunes de esta semana
    const currentDay = today.getDay();
    const diff = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const hasReserva = reservas.some(r => r.fecha === dateStr && r.amenidad === selectedAmenidad);
      
      days.push({
        date: dateStr,
        day: date.getDate(),
        dayName: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][date.getDay()],
        isToday: dateStr === today.toISOString().split('T')[0],
        hasReserva,
      });
    }
    
    return days;
  };

  const isHoraReservada = (hora: string) => {
    if (!selectedDate) return false;
    return reservas.some(
      r => r.fecha === selectedDate && r.hora === hora && r.amenidad === selectedAmenidad
    );
  };

  const handleReservar = () => {
    if (!selectedDate || !selectedHora) return;
    
    const newReserva: Reserva = {
      fecha: selectedDate,
      hora: selectedHora,
      amenidad: selectedAmenidad,
    };
    
    setReservas([...reservas, newReserva]);
    setShowConfirmModal(true);
    setSelectedHora('');
  };

  const handleDownloadReceipt = () => {
    alert('Descargando comprobante...');
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const currentMonth = monthNames[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen p-4 md:p-6 pb-24">
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
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Servicios</h1>
            <p className="text-sm text-gray-600">Amenidades y cuenta</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="amenidades" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="amenidades">Amenidades</TabsTrigger>
            <TabsTrigger value="cuenta">Mi Cuenta</TabsTrigger>
          </TabsList>

          {/* Pestaña Amenidades */}
          <TabsContent value="amenidades" className="space-y-6">
            {/* Cards Horizontales de Amenidades */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Selecciona una amenidad</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {amenidades.map((amenidad) => (
                  <button
                    key={amenidad.id}
                    onClick={() => {
                      setSelectedAmenidad(amenidad.id);
                      setSelectedDate('');
                      setSelectedHora('');
                    }}
                    className={`flex-shrink-0 w-64 transition-all ${
                      selectedAmenidad === amenidad.id ? 'scale-105' : ''
                    }`}
                  >
                    <Card className={`border-2 transition-all ${
                      selectedAmenidad === amenidad.id
                        ? 'border-blue-500 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              selectedAmenidad === amenidad.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {amenidad.icono}
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold text-gray-800">{amenidad.nombre}</h4>
                              <p className="text-xs text-gray-500">Capacidad {amenidad.ocupacion}%</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={amenidad.disponible 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                          }>
                            {amenidad.disponible ? '✓ Disponible' : '✗ Ocupado'}
                          </Badge>
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${amenidad.ocupacion > 70 ? 'bg-red-500' : amenidad.ocupacion > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: `${amenidad.ocupacion}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            </div>

            {/* Calendario Semanal */}
            <Card className="border-0 shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Semana del {getWeekDays()[0].day} al {getWeekDays()[6].day} de {currentMonth}
                </h3>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {getWeekDays().map((day) => (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={`p-3 rounded-lg text-center transition-all ${
                      selectedDate === day.date
                        ? 'bg-blue-500 text-white shadow-md'
                        : day.isToday
                        ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                        : day.hasReserva
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-50 hover:bg-blue-50 text-gray-700'
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1">{day.dayName}</p>
                    <p className="text-lg font-bold">{day.day}</p>
                    {day.hasReserva && selectedDate !== day.date && (
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mx-auto mt-1" />
                    )}
                  </button>
                ))}
              </div>
            </Card>

            {/* Cuadrícula de Horarios */}
            {selectedDate && (
              <Card className="border-0 shadow-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Horarios disponibles
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {horas.map((hora) => {
                    const isReserved = isHoraReservada(hora);
                    return (
                      <button
                        key={hora}
                        onClick={() => !isReserved && setSelectedHora(hora)}
                        disabled={isReserved}
                        className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                          isReserved
                            ? 'bg-red-100 text-red-400 cursor-not-allowed'
                            : selectedHora === hora
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {hora}
                        {isReserved && (
                          <span className="block text-xs mt-0.5">Ocupado</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-green-100 rounded"></div>
                    <span className="text-gray-600">Disponible</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-red-100 rounded"></div>
                    <span className="text-gray-600">Ocupado</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Reglas */}
            <Card className="p-4 bg-blue-50 border-blue-200 border">
              <h3 className="font-semibold text-blue-900 mb-2">Reglas de Uso</h3>
              <ul className="space-y-1.5 text-sm text-blue-800">
                <li>• Las reservas se hacen por bloques de 1 hora</li>
                <li>• Máximo 2 reservas por semana</li>
                <li>• Cancelaciones con 24 horas de anticipación</li>
                <li>• Respetar el horario reservado</li>
                <li>• Mantener el área limpia después de usar</li>
              </ul>
            </Card>
          </TabsContent>

          {/* Pestaña Mi Cuenta */}
          <TabsContent value="cuenta" className="space-y-6">
            {/* Tarjeta de Saldo */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Saldo Pendiente</p>
                    <h2 className="text-4xl font-bold">Q{saldo.toFixed(2)}</h2>
                  </div>
                  <Badge className={enMora 
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 text-white'
                  }>
                    {enMora ? 'En Mora' : 'Al Día'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-blue-100">Fecha de Vencimiento</p>
                    <p className="font-semibold">
                      {new Date(fechaVencimiento).toLocaleDateString('es-GT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {!enMora && (
                    <div className="text-right">
                      <p className="text-blue-100">Días restantes</p>
                      <p className="font-semibold">
                        {Math.ceil((new Date(fechaVencimiento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white flex gap-3">
                <Button
                  onClick={() => setShowDetalleModal(true)}
                  variant="outline"
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Detalle
                </Button>
                <Button
                  onClick={handleDownloadReceipt}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Comprobante
                </Button>
              </div>
            </Card>

            {/* Resumen Rápido */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-4 text-center border-0 shadow-md">
                <p className="text-2xl font-bold text-blue-600">3</p>
                <p className="text-xs text-gray-600 mt-1">Pagos realizados</p>
              </Card>
              <Card className="p-4 text-center border-0 shadow-md">
                <p className="text-2xl font-bold text-green-600">Q2,250</p>
                <p className="text-xs text-gray-600 mt-1">Pagado este año</p>
              </Card>
              <Card className="p-4 text-center border-0 shadow-md">
                <p className="text-2xl font-bold text-orange-600">1</p>
                <p className="text-xs text-gray-600 mt-1">Pago pendiente</p>
              </Card>
            </div>

            {/* Información Adicional */}
            <Card className="p-4 bg-gray-50 border-0">
              <h3 className="font-semibold text-gray-800 mb-3">Información de Pago</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cuota mensual:</span>
                  <span className="font-semibold">Q750.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Día de cobro:</span>
                  <span className="font-semibold">1 de cada mes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha límite de pago:</span>
                  <span className="font-semibold">15 de cada mes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mora después del:</span>
                  <span className="font-semibold text-red-600">15 de cada mes</span>
                </div>
              </div>
            </Card>

            {/* Métodos de Pago */}
            <Card className="p-4 border-0 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">Métodos de Pago Aceptados</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <CreditCard className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-700">Tarjeta</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <Download className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-700">Transferencia</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botón Fijo para Amenidades */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:relative md:border-0 md:bg-transparent md:p-0 md:mt-6">
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={handleReservar}
              disabled={!selectedDate || !selectedHora}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Confirmar Reserva
            </Button>
          </div>
        </div>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <DialogTitle className="text-center text-xl">
                ¡Reserva Confirmada!
              </DialogTitle>
              <DialogDescription className="text-center">
                Tu reserva ha sido registrada exitosamente
              </DialogDescription>
            </DialogHeader>
            <Card className="p-4 bg-gray-50 border-gray-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amenidad:</span>
                  <span className="font-semibold">
                    {amenidades.find(a => a.id === selectedAmenidad)?.nombre}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-semibold">
                    {selectedDate && new Date(selectedDate).toLocaleDateString('es-GT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hora:</span>
                  <span className="font-semibold">{selectedHora}</span>
                </div>
              </div>
            </Card>
            <Button
              onClick={() => setShowConfirmModal(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Entendido
            </Button>
          </DialogContent>
        </Dialog>

        {/* Detalle Modal */}
        <Dialog open={showDetalleModal} onOpenChange={setShowDetalleModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Detalle de Pagos</DialogTitle>
              <DialogDescription>
                Historial completo de tus pagos
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {pagos.map((pago) => (
                <Card key={pago.id} className="p-3 border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-800">{pago.concepto}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(pago.fecha).toLocaleDateString('es-GT', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <Badge className={pago.estado === 'pagado' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                    }>
                      {pago.estado === 'pagado' ? '✓ Pagado' : '✗ Pendiente'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Q{pago.monto.toFixed(2)}</span>
                    {pago.estado === 'pagado' && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={handleDownloadReceipt}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => setShowDetalleModal(false)}
              variant="outline"
              className="w-full"
            >
              Cerrar
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}