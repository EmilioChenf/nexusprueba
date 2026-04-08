import { Settings, User, Bell, Shield, Database } from "lucide-react";

export function ConfiguracionView() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-500">Gestión de preferencias del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
            <h2 className="text-lg text-gray-900">Perfil de Usuario</h2>
          </div>
          <p className="text-sm text-gray-600">Configuración de cuenta y permisos</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Bell size={20} className="text-purple-600" />
            </div>
            <h2 className="text-lg text-gray-900">Notificaciones</h2>
          </div>
          <p className="text-sm text-gray-600">Preferencias de alertas y avisos</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-green-600" />
            </div>
            <h2 className="text-lg text-gray-900">Seguridad</h2>
          </div>
          <p className="text-sm text-gray-600">Configuración de acceso y autenticación</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Database size={20} className="text-orange-600" />
            </div>
            <h2 className="text-lg text-gray-900">Respaldos</h2>
          </div>
          <p className="text-sm text-gray-600">Gestión de copias de seguridad</p>
        </div>
      </div>
    </div>
  );
}
