import { useState } from "react";
import { Search, Download, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Access {
  id: string;
  tipo: 'Residente' | 'Visitante' | 'Proveedor';
  nombre: string;
  unidad: string;
  placa?: string;
  estado: 'Aprobado' | 'Pendiente' | 'Rechazado';
  timestamp: string;
  autorizado?: string;
}

const accessData: Access[] = [
  { id: '1', tipo: 'Residente', nombre: 'Juan Pérez', unidad: 'A-101', placa: 'ABC-123', estado: 'Aprobado', timestamp: '2026-02-17T08:30:00', autorizado: 'Guardia 1' },
  { id: '2', tipo: 'Visitante', nombre: 'María Gonzales', unidad: 'B-205', estado: 'Aprobado', timestamp: '2026-02-17T09:15:00', autorizado: 'Juan Pérez' },
  { id: '3', tipo: 'Proveedor', nombre: 'Servicio de limpieza', unidad: 'C-303', placa: 'XYZ-789', estado: 'Aprobado', timestamp: '2026-02-17T10:00:00', autorizado: 'Administración' },
  { id: '4', tipo: 'Visitante', nombre: 'Pedro Ramírez', unidad: 'A-102', estado: 'Pendiente', timestamp: '2026-02-17T11:30:00' },
  { id: '5', tipo: 'Residente', nombre: 'Ana Martínez', unidad: 'A-102', placa: 'DEF-456', estado: 'Aprobado', timestamp: '2026-02-17T12:00:00', autorizado: 'Guardia 2' },
  { id: '6', tipo: 'Visitante', nombre: 'Carlos López', unidad: 'B-201', estado: 'Rechazado', timestamp: '2026-02-17T13:45:00', autorizado: 'Luis Hernández' },
  { id: '7', tipo: 'Residente', nombre: 'Sofia López', unidad: 'C-401', placa: 'GHI-789', estado: 'Aprobado', timestamp: '2026-02-17T14:20:00', autorizado: 'Guardia 1' },
  { id: '8', tipo: 'Proveedor', nombre: 'Plomero Express', unidad: 'B-302', estado: 'Aprobado', timestamp: '2026-02-17T15:00:00', autorizado: 'Patricia Torres' },
];

export function AccesosView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [filterTipo, setFilterTipo] = useState('todos');

  const filteredAccess = accessData.filter(access => {
    const matchesSearch = 
      access.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      access.unidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (access.placa && access.placa.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEstado = filterEstado === 'todos' || access.estado === filterEstado;
    const matchesTipo = filterTipo === 'todos' || access.tipo === filterTipo;
    
    return matchesSearch && matchesEstado && matchesTipo;
  });

  const stats = {
    total: accessData.length,
    aprobados: accessData.filter(a => a.estado === 'Aprobado').length,
    pendientes: accessData.filter(a => a.estado === 'Pendiente').length,
    rechazados: accessData.filter(a => a.estado === 'Rechazado').length,
  };

  const getStatusIcon = (estado: Access['estado']) => {
    switch (estado) {
      case 'Aprobado':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Pendiente':
        return <AlertCircle size={16} className="text-yellow-600" />;
      case 'Rechazado':
        return <XCircle size={16} className="text-red-600" />;
    }
  };

  const getStatusColor = (estado: Access['estado']) => {
    switch (estado) {
      case 'Aprobado':
        return 'bg-green-100 text-green-700';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rechazado':
        return 'bg-red-100 text-red-700';
    }
  };

  const getTipoColor = (tipo: Access['tipo']) => {
    switch (tipo) {
      case 'Residente':
        return 'bg-blue-100 text-blue-700';
      case 'Visitante':
        return 'bg-purple-100 text-purple-700';
      case 'Proveedor':
        return 'bg-orange-100 text-orange-700';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Control de Accesos</h1>
        <p className="text-gray-500">Registro de ingresos y salidas del día</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Total del día</p>
          <p className="text-3xl text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Aprobados</p>
          <p className="text-3xl text-green-600">{stats.aprobados}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Pendientes</p>
          <p className="text-3xl text-yellow-600">{stats.pendientes}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Rechazados</p>
          <p className="text-3xl text-red-600">{stats.rechazados}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por casa, nombre o placa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Type Filter */}
              <select
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos los tipos</option>
                <option value="Residente">Residente</option>
                <option value="Visitante">Visitante</option>
                <option value="Proveedor">Proveedor</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos los estados</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={20} />
              Exportar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Access Log Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
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
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Autorizado por
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredAccess.map((access) => (
                <tr key={access.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      {formatTimestamp(access.timestamp)}
                    </div>
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
                    {access.placa || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(access.estado)}
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusColor(access.estado)}`}>
                        {access.estado}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {access.autorizado || '-'}
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
