import React, { useState } from 'react';
import { ArrowLeft, UserPlus, X, CheckCircle, Star, Clock, Zap, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';

interface Visita {
  id: string;
  nombre: string;
  dpi: string;
  placa: string;
  fecha: string;
  hora: string;
  horaFin?: string;
  tipoVisita?: string;
  motivo?: string;
  ingresoUnico?: boolean;
  notificarLlegada?: boolean;
  compartirGuardia?: boolean;
}

interface VisitanteFrecuente {
  id: string;
  nombre: string;
  dpi: string;
  placa: string;
}

interface AutorizarVisitaProps {
  onBack: () => void;
}

export function AutorizarVisita({ onBack }: AutorizarVisitaProps) {
  const [visitas, setVisitas] = useState<Visita[]>([
    {
      id: '1',
      nombre: 'María García',
      dpi: '2345678901234',
      placa: 'P-123ABC',
      fecha: '2026-02-20',
      hora: '14:00',
      horaFin: '16:00',
      tipoVisita: 'personal',
      motivo: 'Visita familiar',
    },
  ]);

  const [visitantesFrecuentes, setVisitantesFrecuentes] = useState<VisitanteFrecuente[]>([
    {
      id: '1',
      nombre: 'Juan Pérez',
      dpi: '1234567890123',
      placa: 'P-456DEF',
    },
    {
      id: '2',
      nombre: 'Ana López',
      dpi: '9876543210987',
      placa: 'P-789GHI',
    },
  ]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSaveFrequentModal, setShowSaveFrequentModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(1);
  const [lastRegisteredVisit, setLastRegisteredVisit] = useState<Visita | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>('');
  
  const [formData, setFormData] = useState({
    nombre: '',
    dpi: '',
    placa: '',
    fecha: '',
    hora: '',
    horaFin: '',
    tipoVisita: 'personal',
    motivo: '',
    ingresoUnico: true,
    notificarLlegada: true,
    compartirGuardia: true,
  });

  // Obtener fecha y hora actuales por defecto
  const getDefaultDateTime = () => {
    const now = new Date();
    const fecha = now.toISOString().split('T')[0];
    const hora = now.toTimeString().slice(0, 5);
    const horaFin = new Date(now.getTime() + 2 * 60 * 60 * 1000).toTimeString().slice(0, 5);
    return { fecha, hora, horaFin };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVisita: Visita = {
      id: Date.now().toString(),
      ...formData,
    };
    setVisitas([newVisita, ...visitas]);
    setLastRegisteredVisit(newVisita);
    setShowConfirmModal(true);
    setFormData({
      nombre: '',
      dpi: '',
      placa: '',
      fecha: '',
      hora: '',
      horaFin: '',
      tipoVisita: 'personal',
      motivo: '',
      ingresoUnico: true,
      notificarLlegada: true,
      compartirGuardia: true,
    });
    setCurrentCard(1);
    setFotoPreview('');
  };

  const handleRegistroRapido = (visitante: VisitanteFrecuente) => {
    const { fecha, hora, horaFin } = getDefaultDateTime();
    const newVisita: Visita = {
      id: Date.now().toString(),
      nombre: visitante.nombre,
      dpi: visitante.dpi,
      placa: visitante.placa,
      fecha,
      hora,
      horaFin,
      tipoVisita: 'personal',
      motivo: 'Visita frecuente',
      ingresoUnico: true,
      notificarLlegada: true,
      compartirGuardia: true,
    };
    setVisitas([newVisita, ...visitas]);
    setLastRegisteredVisit(newVisita);
    setShowConfirmModal(true);
  };

  const handleUsarFrecuente = (visitante: VisitanteFrecuente) => {
    const { fecha, hora, horaFin } = getDefaultDateTime();
    setFormData({
      ...formData,
      nombre: visitante.nombre,
      dpi: visitante.dpi,
      placa: visitante.placa,
      fecha,
      hora,
      horaFin,
    });
    setCurrentCard(1);
  };

  const handleSaveAsFrecuente = () => {
    if (lastRegisteredVisit) {
      const exists = visitantesFrecuentes.some(v => v.dpi === lastRegisteredVisit.dpi);
      if (!exists) {
        const newFrecuente: VisitanteFrecuente = {
          id: Date.now().toString(),
          nombre: lastRegisteredVisit.nombre,
          dpi: lastRegisteredVisit.dpi,
          placa: lastRegisteredVisit.placa,
        };
        setVisitantesFrecuentes([...visitantesFrecuentes, newFrecuente]);
      }
    }
    setShowSaveFrequentModal(false);
  };

  const handleRemoveFrecuente = (id: string) => {
    setVisitantesFrecuentes(visitantesFrecuentes.filter(v => v.id !== id));
  };

  const handleCancel = (id: string) => {
    setVisitas(visitas.filter((v) => v.id !== id));
  };

  const handleFotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextCard = () => {
    if (currentCard < 3) setCurrentCard(currentCard + 1);
  };

  const prevCard = () => {
    if (currentCard > 1) setCurrentCard(currentCard - 1);
  };

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
            <h1 className="text-2xl font-bold text-gray-800">Autorizar Visita</h1>
            <p className="text-sm text-gray-600">Registro rápido e intuitivo</p>
          </div>
        </div>

        {/* Visitantes Frecuentes - Acceso Rápido */}
        {visitantesFrecuentes.length > 0 && (
          <Card className="mb-6 border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <div className="flex items-center gap-2 text-white">
                <Zap className="w-5 h-5" />
                <h3 className="font-bold">Acceso Rápido</h3>
                <Badge className="bg-white/20 text-white border-0">
                  ¡1 click!
                </Badge>
              </div>
              <p className="text-purple-100 text-sm mt-1">
                Autoriza visitantes frecuentes instantáneamente
              </p>
            </div>
            <div className="p-4 space-y-2">
              {visitantesFrecuentes.map((visitante) => (
                <div
                  key={visitante.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{visitante.nombre}</p>
                      <p className="text-xs text-gray-500">
                        {visitante.placa && `${visitante.placa} • `}DPI: {visitante.dpi}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleRegistroRapido(visitante)}
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                    >
                      <Zap className="w-3.5 h-3.5 mr-1" />
                      Autorizar
                    </Button>
                    <Button
                      onClick={() => handleRemoveFrecuente(visitante.id)}
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Indicador de Progreso */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all ${
                  step === currentCard
                    ? 'w-8 bg-blue-500'
                    : step < currentCard
                    ? 'w-2 bg-blue-300'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Paso {currentCard} de 3
          </p>
        </div>

        {/* Form con Tarjetas */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${(currentCard - 1) * 100}%)` }}
            >
              {/* Tarjeta 1: Datos del Visitante */}
              <div className="w-full flex-shrink-0 px-1">
                <Card className="shadow-lg border-0 p-6 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-blue-500" />
                      Datos del Visitante
                    </h3>
                    <p className="text-sm text-gray-600">Información básica de identificación</p>
                  </div>

                  <div>
                    <Label htmlFor="nombre" className="text-gray-700 font-semibold">
                      Nombre Completo *
                    </Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Ej. Juan Pérez García"
                      className="mt-1.5"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dpi" className="text-gray-700 font-semibold">
                      DPI / Documento de Identidad
                    </Label>
                    <Input
                      id="dpi"
                      value={formData.dpi}
                      onChange={(e) => setFormData({ ...formData, dpi: e.target.value })}
                      placeholder="1234567890123"
                      maxLength={13}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="placa" className="text-gray-700 font-semibold">
                      Placa del Vehículo
                    </Label>
                    <Input
                      id="placa"
                      value={formData.placa}
                      onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
                      placeholder="P-123ABC"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Foto del Visitante (Opcional)
                    </Label>
                    <div className="mt-1.5">
                      {fotoPreview ? (
                        <div className="relative">
                          <img
                            src={fotoPreview}
                            alt="Preview"
                            className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
                          />
                          <Button
                            type="button"
                            onClick={() => setFotoPreview('')}
                            size="sm"
                            variant="ghost"
                            className="absolute top-1 right-1 bg-white/90 hover:bg-white"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                          <Camera className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">Tomar o subir foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            capture="user"
                            onChange={handleFotoCapture}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Tarjeta 2: Detalles de la Visita */}
              <div className="w-full flex-shrink-0 px-1">
                <Card className="shadow-lg border-0 p-6 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      Detalles de la Visita
                    </h3>
                    <p className="text-sm text-gray-600">Fecha, hora y propósito</p>
                  </div>

                  <div>
                    <Label htmlFor="fecha" className="text-gray-700 font-semibold">
                      Fecha de la Visita *
                    </Label>
                    <Input
                      id="fecha"
                      type="date"
                      value={formData.fecha || getDefaultDateTime().fecha}
                      onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                      className="mt-1.5"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hora" className="text-gray-700 font-semibold">
                        Hora de Inicio *
                      </Label>
                      <Input
                        id="hora"
                        type="time"
                        value={formData.hora || getDefaultDateTime().hora}
                        onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                        className="mt-1.5"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="horaFin" className="text-gray-700 font-semibold">
                        Hora de Fin
                      </Label>
                      <Input
                        id="horaFin"
                        type="time"
                        value={formData.horaFin || getDefaultDateTime().horaFin}
                        onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tipoVisita" className="text-gray-700 font-semibold">
                      Tipo de Visita *
                    </Label>
                    <select
                      id="tipoVisita"
                      value={formData.tipoVisita}
                      onChange={(e) => setFormData({ ...formData, tipoVisita: e.target.value })}
                      className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="personal">Personal</option>
                      <option value="familiar">Familiar</option>
                      <option value="trabajo">Trabajo/Servicio</option>
                      <option value="entrega">Entrega/Delivery</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="motivo" className="text-gray-700 font-semibold">
                      Motivo de la Visita
                    </Label>
                    <Textarea
                      id="motivo"
                      value={formData.motivo}
                      onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                      placeholder="Ej. Reunión familiar, reparación, entrega..."
                      className="mt-1.5"
                      rows={3}
                    />
                  </div>
                </Card>
              </div>

              {/* Tarjeta 3: Opciones de Seguridad */}
              <div className="w-full flex-shrink-0 px-1">
                <Card className="shadow-lg border-0 p-6 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      Opciones de Seguridad
                    </h3>
                    <p className="text-sm text-gray-600">Configuración de acceso y notificaciones</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 pr-4">
                        <Label htmlFor="ingresoUnico" className="text-gray-800 font-semibold cursor-pointer">
                          Ingreso Único
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          El visitante solo puede ingresar una vez
                        </p>
                      </div>
                      <Switch
                        id="ingresoUnico"
                        checked={formData.ingresoUnico}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, ingresoUnico: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 pr-4">
                        <Label htmlFor="notificarLlegada" className="text-gray-800 font-semibold cursor-pointer">
                          Notificar Llegada
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Recibir alerta cuando el visitante ingrese
                        </p>
                      </div>
                      <Switch
                        id="notificarLlegada"
                        checked={formData.notificarLlegada}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, notificarLlegada: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 pr-4">
                        <Label htmlFor="compartirGuardia" className="text-gray-800 font-semibold cursor-pointer">
                          Compartir con Guardia
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Enviar información a la caseta de seguridad
                        </p>
                      </div>
                      <Switch
                        id="compartirGuardia"
                        checked={formData.compartirGuardia}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, compartirGuardia: checked })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Resumen:</strong> {formData.nombre || 'Visitante'} podrá ingresar el{' '}
                      {formData.fecha ? new Date(formData.fecha).toLocaleDateString('es-GT', {
                        day: 'numeric',
                        month: 'long',
                      }) : 'día seleccionado'} a las {formData.hora || 'hora indicada'}.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Navegación entre tarjetas */}
          <div className="flex items-center justify-between mt-6 gap-3">
            <Button
              type="button"
              onClick={prevCard}
              disabled={currentCard === 1}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>

            {currentCard < 3 ? (
              <Button
                type="button"
                onClick={nextCard}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmar Autorización
              </Button>
            )}
          </div>
        </form>

        {/* Lista de Visitas */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            Visitas Autorizadas Hoy ({visitas.length})
          </h2>
          <div className="space-y-3">
            {visitas.length === 0 ? (
              <Card className="p-8 text-center border-0 shadow-md">
                <p className="text-gray-500">No hay visitas autorizadas</p>
              </Card>
            ) : (
              visitas.map((visita) => (
                <Card key={visita.id} className="border-0 shadow-md">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <UserPlus className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{visita.nombre}</h3>
                            {visita.dpi && (
                              <p className="text-xs text-gray-500">DPI: {visita.dpi}</p>
                            )}
                          </div>
                        </div>
                        <div className="ml-12 space-y-1 text-sm">
                          {visita.placa && (
                            <p className="text-gray-600">
                              <span className="font-semibold">Placa:</span> {visita.placa}
                            </p>
                          )}
                          <p className="text-gray-600">
                            <span className="font-semibold">Fecha:</span>{' '}
                            {new Date(visita.fecha).toLocaleDateString('es-GT', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">Hora:</span> {visita.hora}
                            {visita.horaFin && ` - ${visita.horaFin}`}
                          </p>
                          {visita.tipoVisita && (
                            <Badge className="bg-blue-100 text-blue-700 mt-1">
                              {visita.tipoVisita}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCancel(visita.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmModal} onOpenChange={(open) => {
          setShowConfirmModal(open);
          if (!open && lastRegisteredVisit && lastRegisteredVisit.dpi) {
            // Preguntar si quiere guardar como frecuente
            const exists = visitantesFrecuentes.some(v => v.dpi === lastRegisteredVisit.dpi);
            if (!exists) {
              setShowSaveFrequentModal(true);
            }
          }
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <DialogTitle className="text-center text-xl">
                ¡Visita Autorizada!
              </DialogTitle>
              <DialogDescription className="text-center">
                {lastRegisteredVisit?.nombre} ha sido registrado exitosamente. La seguridad del
                residencial ha sido notificada.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => setShowConfirmModal(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Entendido
            </Button>
          </DialogContent>
        </Dialog>

        {/* Save as Frequent Modal */}
        <Dialog open={showSaveFrequentModal} onOpenChange={setShowSaveFrequentModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-10 h-10 text-purple-600" />
                </div>
              </div>
              <DialogTitle className="text-center text-xl">
                ¿Guardar como Visitante Frecuente?
              </DialogTitle>
              <DialogDescription className="text-center">
                Guarda a {lastRegisteredVisit?.nombre} para autorizarlo con un solo click la próxima vez.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowSaveFrequentModal(false)}
                variant="outline"
                className="flex-1"
              >
                No, gracias
              </Button>
              <Button
                onClick={handleSaveAsFrecuente}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                <Star className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}