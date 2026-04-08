import { useState } from "react";
import { Search, Download, Filter } from "lucide-react";

interface Resident {
  id: string;
  nombre: string;
  unidad: string;
  estado: 'Al día' | 'Pendiente' | 'Mora';
  fechaLimite: string;
  montoPendiente: number;
  diasAtraso?: number;
}

const residentsData: Resident[] = [
  { id: '1', nombre: 'Juan Pérez', unidad: 'A-101', estado: 'Al día', fechaLimite: '2026-03-01', montoPendiente: 0 },
  { id: '2', nombre: 'María García', unidad: 'B-205', estado: 'Al día', fechaLimite: '2026-03-01', montoPendiente: 0 },
  { id: '3', nombre: 'Carlos Rodríguez', unidad: 'C-303', estado: 'Mora', fechaLimite: '2026-01-15', montoPendiente: 1500, diasAtraso: 32 },
  { id: '4', nombre: 'Ana Martínez', unidad: 'A-102', estado: 'Pendiente', fechaLimite: '2026-02-20', montoPendiente: 500 },
  { id: '5', nombre: 'Luis Hernández', unidad: 'B-201', estado: 'Al día', fechaLimite: '2026-03-01', montoPendiente: 0 },
  { id: '6', nombre: 'Sofia López', unidad: 'C-401', estado: 'Mora', fechaLimite: '2026-01-20', montoPendiente: 1000, diasAtraso: 27 },
  { id: '7', nombre: 'Roberto Sánchez', unidad: 'A-104', estado: 'Mora', fechaLimite: '2026-02-01', montoPendiente: 500, diasAtraso: 15 },
  { id: '8', nombre: 'Patricia Torres', unidad: 'B-302', estado: 'Pendiente', fechaLimite: '2026-02-25', montoPendiente: 500 },
  { id: '9', nombre: 'Diego Ramírez', unidad: 'C-501', estado: 'Al día', fechaLimite: '2026-03-01', montoPendiente: 0 },
  { id: '10', nombre: 'Valentina Cruz', unidad: 'A-203', estado: 'Al día', fechaLimite: '2026-03-01', montoPendiente: 0 },
];

export function PaymentsView() {
  const [selectedMonth, setSelectedMonth] = useState('febrero-2026');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (estado: Resident['estado']) => {
    switch (estado) {
      case 'Al día':
        return 'bg-green-100 text-green-700';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Mora':
        return 'bg-red-100 text-red-700';
    }
  };

  const filteredResidents = residentsData.filter(resident => {
    const matchesSearch = resident.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resident.unidad.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'todos' || resident.estado === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    alDia: residentsData.filter(r => r.estado === 'Al día').length,
    pendiente: residentsData.filter(r => r.estado === 'Pendiente').length,
    mora: residentsData.filter(r => r.estado === 'Mora').length,
    totalPendiente: residentsData.reduce((acc, r) => acc + r.montoPendiente, 0),
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Pagos y Morosidad</h1>
        <p className="text-gray-500">Gestión de pagos mensuales</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Al día</p>
          <p className="text-3xl text-green-600">{stats.alDia}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Pendientes</p>
          <p className="text-3xl text-yellow-600">{stats.pendiente}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">En mora</p>
          <p className="text-3xl text-red-600">{stats.mora}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Total pendiente</p>
          <p className="text-3xl text-gray-900">${stats.totalPendiente.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nombre o unidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Month Filter */}
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="febrero-2026">Febrero 2026</option>
                <option value="enero-2026">Enero 2026</option>
                <option value="diciembre-2025">Diciembre 2025</option>
              </select>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  <option value="Al día">Al día</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Mora">Mora</option>
                </select>
              </div>
            </div>

            {/* Generate Report */}
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={20} />
              Generar Reporte
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Unidad
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Fecha Límite
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Monto Pendiente
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredResidents.map((resident) => (
                <tr key={resident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resident.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {resident.unidad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusColor(resident.estado)}`}>
                      {resident.estado}
                      {resident.diasAtraso && ` (${resident.diasAtraso}d)`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(resident.fechaLimite).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${resident.montoPendiente.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 hover:underline">
                      Ver detalle
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
