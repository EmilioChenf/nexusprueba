import { Calendar } from "lucide-react";

interface Reservation {
  id: string;
  amenity: string;
  resident: string;
  date: string;
  time: string;
  unit: string;
}

const reservations: Reservation[] = [
  { id: '1', amenity: 'Salón de eventos', resident: 'María García', date: '2026-02-18', time: '18:00', unit: 'B-205' },
  { id: '2', amenity: 'Cancha de tenis', resident: 'Juan Pérez', date: '2026-02-17', time: '16:00', unit: 'A-101' },
  { id: '3', amenity: 'Piscina', resident: 'Ana Martínez', date: '2026-02-19', time: '14:00', unit: 'A-102' },
  { id: '4', amenity: 'Salón de eventos', resident: 'Luis Hernández', date: '2026-02-20', time: '19:00', unit: 'B-201' },
];

export function AmenityCalendar() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg text-gray-900">Próximas Reservas</h2>
      </div>
      <div className="p-6 space-y-3">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-sm text-gray-900">{reservation.amenity}</p>
                  <p className="text-xs text-gray-500">{reservation.resident} - {reservation.unit}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {new Date(reservation.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} • {reservation.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
