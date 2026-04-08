import { Users, AlertTriangle, Calendar, Key, Clock, CheckCircle, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const accessByHour = [
  { hora: '00:00', accesos: 4 },
  { hora: '02:00', accesos: 2 },
  { hora: '04:00', accesos: 1 },
  { hora: '06:00', accesos: 12 },
  { hora: '08:00', accesos: 35 },
  { hora: '10:00', accesos: 28 },
  { hora: '12:00', accesos: 42 },
  { hora: '14:00', accesos: 31 },
  { hora: '16:00', accesos: 38 },
  { hora: '18:00', accesos: 45 },
  { hora: '20:00', accesos: 22 },
  { hora: '22:00', accesos: 8 },
];

const realTimeAccess = [
  { id: '1', hora: '16:45', tipo: 'Residente', nombre: 'Juan Pérez', unidad: 'A-101', placa: 'ABC-123', estado: 'Aprobado' },
  { id: '2', hora: '16:42', tipo: 'Visitante', nombre: 'María González', unidad: 'B-205', placa: '-', estado: 'Aprobado' },
  { id: '3', hora: '16:38', tipo: 'Proveedor', nombre: 'Servicio de limpieza', unidad: 'C-303', placa: 'XYZ-789', estado: 'Pendiente' },
  { id: '4', hora: '16:35', tipo: 'Residente', nombre: 'Ana Martínez', unidad: 'A-102', placa: 'DEF-456', estado: 'Aprobado' },
  { id: '5', hora: '16:30', tipo: 'Visitante', nombre: 'Carlos López', unidad: 'B-201', placa: '-', estado: 'Aprobado' },
  { id: '6', hora: '16:28', tipo: 'Residente', nombre: 'Sofia López', unidad: 'C-401', placa: 'GHI-789', estado: 'Aprobado' },
];

export function DashboardView() {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Aprobado':
        return 'bg-green-100 text-green-700';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rechazado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Residente':
        return 'bg-blue-100 text-blue-700';
      case 'Visitante':
        return 'bg-purple-100 text-purple-700';
      case 'Proveedor':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500">Resumen general del residencial</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Accesos Hoy</p>
              <p className="text-3xl text-gray-900">142</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Key size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Visitas Pendientes</p>
              <p className="text-3xl text-yellow-600">3</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Morosos</p>
              <p className="text-3xl text-red-600">8</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Reservas Activas</p>
              <p className="text-3xl text-green-600">15</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Access Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg text-gray-900">Accesos en Tiempo Real</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Unidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Placa
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {realTimeAccess.map((access) => (
                  <tr key={access.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {access.hora}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getTipoColor(access.tipo)}`}>
                        {access.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {access.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {access.unidad}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {access.placa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusColor(access.estado)}`}>
                        {access.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Access by Hour Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg text-gray-900 mb-6">Accesos por Hora</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accessByHour}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accesos" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}