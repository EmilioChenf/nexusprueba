import { useState } from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";

interface Reservation {
  id: string;
  amenidad: string;
  residente: string;
  unidad: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: 'Disponible' | 'Ocupado' | 'Pendiente';
}

const reservationsData: Reservation[] = [
  { id: '1', amenidad: 'Salón de eventos', residente: 'María García', unidad: 'B-205', fecha: '2026-02-18', horaInicio: '18:00', horaFin: '22:00', estado: 'Ocupado' },
  { id: '2', amenidad: 'Cancha de tenis', residente: 'Juan Pérez', unidad: 'A-101', fecha: '2026-02-17', horaInicio: '16:00', horaFin: '18:00', estado: 'Ocupado' },
  { id: '3', amenidad: 'Piscina', residente: 'Ana Martínez', unidad: 'A-102', fecha: '2026-02-19', horaInicio: '14:00', horaFin: '16:00', estado: 'Ocupado' },
  { id: '4', amenidad: 'Salón de eventos', residente: 'Luis Hernández', unidad: 'B-201', fecha: '2026-02-20', horaInicio: '19:00', horaFin: '23:00', estado: 'Ocupado' },
  { id: '5', amenidad: 'Gimnasio', residente: 'Carlos Rodríguez', unidad: 'C-303', fecha: '2026-02-17', horaInicio: '07:00', horaFin: '08:30', estado: 'Pendiente' },
  { id: '6', amenidad: 'Cancha de tenis', residente: 'Sofia López', unidad: 'C-401', fecha: '2026-02-21', horaInicio: '10:00', horaFin: '12:00', estado: 'Ocupado' },
];

const amenidades = [
  { nombre: 'Salón de eventos', disponibilidadHoy: 'Disponible' },
  { nombre: 'Cancha de tenis', disponibilidadHoy: 'Ocupado' },
  { nombre: 'Piscina', disponibilidadHoy: 'Disponible' },
  { nombre: 'Gimnasio', disponibilidadHoy: 'Disponible' },
  { nombre: 'Área de parrillas', disponibilidadHoy: 'Disponible' },
  { nombre: 'Salón infantil', disponibilidadHoy: 'Ocupado' },
];

export function AmenidadesView() {
  const [selectedAmenidad, setSelectedAmenidad] = useState('todas');

  const filteredReservations = selectedAmenidad === 'todas' 
    ? reservationsData 
    : reservationsData.filter(r => r.amenidad === selectedAmenidad);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Amenidades</h1>
        <p className="text-gray-500">Gestión de reservas y disponibilidad</p>
      </div>

      {/* Amenities Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {amenidades.map((amenidad, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Calendar size={20} className="text-blue-600" />
              <span className={`w-3 h-3 rounded-full ${amenidad.disponibilidadHoy === 'Disponible' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </div>
            <p className="text-sm text-gray-900 mb-1">{amenidad.nombre}</p>
            <p className={`text-xs ${amenidad.disponibilidadHoy === 'Disponible' ? 'text-green-600' : 'text-red-600'}`}>
              {amenidad.disponibilidadHoy}
            </p>
          </div>
        ))}
      </div>

      {/* Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg text-gray-900 mb-6">Calendario de Reservas</h2>
          
          {/* Filter */}
          <div className="mb-6">
            <select
              value={selectedAmenidad}
              onChange={(e) => setSelectedAmenidad(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todas">Todas las amenidades</option>
              {amenidades.map((a, i) => (
                <option key={i} value={a.nombre}>{a.nombre}</option>
              ))}
            </select>
          </div>

          {/* Mini Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
              const hasReservation = day >= 17 && day <= 21;
              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors ${
                    day === 17
                      ? 'bg-blue-600 text-white'
                      : hasReservation
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-500 rounded"></span>
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-red-500 rounded"></span>
              <span>Ocupado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-600 rounded"></span>
              <span>Hoy</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Nueva Reserva
            </button>
            <button className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Ver Disponibilidad
            </button>
            <button className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Configurar Horarios
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Reservas esta semana</p>
            <p className="text-3xl text-gray-900 mb-1">24</p>
            <p className="text-xs text-green-600">+6 vs semana anterior</p>
          </div>
        </div>
      </div>

      {/* Upcoming Reservations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg text-gray-900">Próximas Reservas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Amenidad
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Residente
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Unidad
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Horario
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.amenidad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.residente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reservation.unidad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(reservation.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {reservation.horaInicio} - {reservation.horaFin}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${
                      reservation.estado === 'Ocupado' 
                        ? 'bg-red-100 text-red-700' 
                        : reservation.estado === 'Pendiente'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {reservation.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-red-600 hover:text-red-800 hover:underline flex items-center gap-1">
                      <AlertCircle size={14} />
                      Aplicar sanción
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
