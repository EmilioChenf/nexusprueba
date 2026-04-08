import { useState } from "react";
import { Download, FileText, DollarSign, Key, Calendar, Filter } from "lucide-react";

interface Report {
  id: string;
  tipo: string;
  nombre: string;
  descripcion: string;
  icon: any;
  color: string;
}

const reportTypes: Report[] = [
  {
    id: '1',
    tipo: 'Financiero',
    nombre: 'Reporte de Ingresos',
    descripcion: 'Estado de pagos, morosos y proyecciones financieras',
    icon: DollarSign,
    color: 'green',
  },
  {
    id: '2',
    tipo: 'Financiero',
    nombre: 'Reporte de Morosidad',
    descripcion: 'Listado detallado de residentes con pagos pendientes',
    icon: FileText,
    color: 'red',
  },
  {
    id: '3',
    tipo: 'Accesos',
    nombre: 'Reporte de Accesos',
    descripcion: 'Registro completo de ingresos y salidas por fecha',
    icon: Key,
    color: 'blue',
  },
  {
    id: '4',
    tipo: 'Amenidades',
    nombre: 'Reporte de Reservas',
    descripcion: 'Historial de uso y reservas de amenidades',
    icon: Calendar,
    color: 'purple',
  },
  {
    id: '5',
    tipo: 'General',
    nombre: 'Reporte Mensual Completo',
    descripcion: 'Resumen ejecutivo de todas las actividades del mes',
    icon: FileText,
    color: 'gray',
  },
  {
    id: '6',
    tipo: 'General',
    nombre: 'Reporte de Comunicados',
    descripcion: 'Estadísticas de comunicados enviados y lectura',
    icon: FileText,
    color: 'orange',
  },
];

export function ReportesView() {
  const [fechaInicio, setFechaInicio] = useState('2026-02-01');
  const [fechaFin, setFechaFin] = useState('2026-02-28');
  const [selectedTipo, setSelectedTipo] = useState('todos');

  const filteredReports = selectedTipo === 'todos' 
    ? reportTypes 
    : reportTypes.filter(r => r.tipo === selectedTipo);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> = {
      green: { bg: 'bg-green-50', text: 'text-green-600', hover: 'hover:bg-green-100' },
      red: { bg: 'bg-red-50', text: 'text-red-600', hover: 'hover:bg-red-100' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:bg-blue-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', hover: 'hover:bg-purple-100' },
      gray: { bg: 'bg-gray-50', text: 'text-gray-600', hover: 'hover:bg-gray-100' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', hover: 'hover:bg-orange-100' },
    };
    return colors[color] || colors.gray;
  };

  const handleDownload = (reportName: string) => {
    alert(`Descargando ${reportName} del ${fechaInicio} al ${fechaFin}`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Reportes</h1>
        <p className="text-gray-500">Generación y descarga de informes</p>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-sm text-gray-700">Filtrar por:</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Fecha inicio:</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Fecha fin:</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedTipo}
              onChange={(e) => setSelectedTipo(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los tipos</option>
              <option value="Financiero">Financiero</option>
              <option value="Accesos">Accesos</option>
              <option value="Amenidades">Amenidades</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Reportes este mes</p>
          <p className="text-3xl text-gray-900">24</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Más descargado</p>
          <p className="text-sm text-gray-900 mt-2">Ingresos</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Último generado</p>
          <p className="text-sm text-gray-900 mt-2">Hace 2 horas</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Formato</p>
          <p className="text-sm text-gray-900 mt-2">PDF / Excel</p>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => {
          const Icon = report.icon;
          const colors = getColorClasses(report.color);
          
          return (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`p-6 ${colors.bg}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center border border-gray-200`}>
                    <Icon size={24} className={colors.text} />
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                    {report.tipo}
                  </span>
                </div>
                <h3 className="text-lg text-gray-900 mb-2">{report.nombre}</h3>
                <p className="text-sm text-gray-600">{report.descripcion}</p>
              </div>

              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(report.nombre)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={16} />
                    PDF
                  </button>
                  <button
                    onClick={() => handleDownload(report.nombre)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download size={16} />
                    Excel
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Downloads */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg text-gray-900">Descargas Recientes</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { nombre: 'Reporte de Ingresos - Enero 2026', fecha: '2026-02-15 14:30', formato: 'PDF' },
            { nombre: 'Reporte de Accesos - Semana 6', fecha: '2026-02-14 10:15', formato: 'Excel' },
            { nombre: 'Reporte de Morosidad - Febrero 2026', fecha: '2026-02-13 16:45', formato: 'PDF' },
            { nombre: 'Reporte Mensual Completo - Enero 2026', fecha: '2026-02-12 09:00', formato: 'PDF' },
          ].map((download, index) => (
            <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">{download.nombre}</p>
                  <p className="text-xs text-gray-500">{download.fecha}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {download.formato}
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
