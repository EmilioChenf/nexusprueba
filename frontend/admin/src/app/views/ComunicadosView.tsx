import { useState } from "react";
import { Send, Paperclip, Eye, EyeOff, Trash2 } from "lucide-react";

interface Comunicado {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  leidos: number;
  total: number;
  archivo?: string;
}

const comunicadosData: Comunicado[] = [
  { id: '1', titulo: 'Mantenimiento programado de piscina', descripcion: 'Se realizará mantenimiento de la piscina el próximo sábado de 8:00 a.m. a 4:00 p.m.', fecha: '2026-02-15', leidos: 180, total: 248 },
  { id: '2', titulo: 'Cambio de horario de recolección de basura', descripcion: 'A partir del 1 de marzo, la recolección será los martes y viernes a las 7:00 a.m.', fecha: '2026-02-12', leidos: 220, total: 248, archivo: 'horarios.pdf' },
  { id: '3', titulo: 'Asamblea general de residentes', descripcion: 'Convocamos a todos los residentes a la asamblea general el 28 de febrero a las 6:00 p.m.', fecha: '2026-02-10', leidos: 200, total: 248 },
  { id: '4', titulo: 'Recordatorio de pago de cuota mensual', descripcion: 'Les recordamos que el pago de la cuota mensual vence el último día de cada mes.', fecha: '2026-02-08', leidos: 240, total: 248 },
  { id: '5', titulo: 'Nuevas normas de convivencia', descripcion: 'Se han actualizado las normas de convivencia. Por favor, revisar el documento adjunto.', fecha: '2026-02-05', leidos: 195, total: 248, archivo: 'normas.pdf' },
];

export function ComunicadosView() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);

  const handlePublish = () => {
    if (!titulo || !descripcion) {
      alert('Por favor, complete todos los campos');
      return;
    }
    
    alert('Comunicado publicado exitosamente');
    setTitulo('');
    setDescripcion('');
    setArchivo(null);
  };

  const getReadPercentage = (leidos: number, total: number) => {
    return Math.round((leidos / total) * 100);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Comunicados</h1>
        <p className="text-gray-500">Gestión de anuncios y notificaciones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Create Form */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg text-gray-900 mb-6">Crear Nuevo Comunicado</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Título del comunicado
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Mantenimiento programado"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Escriba aquí el contenido del comunicado..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Adjuntar archivo (opcional)
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <Paperclip size={20} className="text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {archivo ? archivo.name : 'Seleccionar archivo'}
                  </span>
                  <input
                    type="file"
                    onChange={(e) => setArchivo(e.target.files?.[0] || null)}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                </label>
                {archivo && (
                  <button
                    onClick={() => setArchivo(null)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Formatos permitidos: PDF, DOC, DOCX, JPG, PNG (máx. 5MB)
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send size={20} />
                Publicar Comunicado
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg text-gray-900 mb-4">Estadísticas</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Comunicados publicados</p>
              <p className="text-3xl text-blue-900">{comunicadosData.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 mb-1">Promedio de lectura</p>
              <p className="text-3xl text-green-900">82%</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 mb-1">Esta semana</p>
              <p className="text-3xl text-purple-900">3</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm text-gray-700 mb-3">Consejos</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Usa títulos claros y descriptivos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Mantén el mensaje breve y directo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Adjunta archivos solo cuando sea necesario</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sent Announcements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg text-gray-900">Comunicados Enviados</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {comunicadosData.map((comunicado) => {
            const readPercentage = getReadPercentage(comunicado.leidos, comunicado.total);
            
            return (
              <div key={comunicado.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-900">{comunicado.titulo}</h3>
                      {comunicado.archivo && (
                        <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          <Paperclip size={12} />
                          {comunicado.archivo}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{comunicado.descripcion}</p>
                    <p className="text-xs text-gray-500">
                      Publicado el {new Date(comunicado.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Read Status */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Estado de lectura</span>
                      <span className="text-xs text-gray-700">{readPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${readPercentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <Eye size={16} />
                      <span>{comunicado.leidos}</span>
                    </div>
                    <span className="text-gray-400">/</span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <EyeOff size={16} />
                      <span>{comunicado.total - comunicado.leidos}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
