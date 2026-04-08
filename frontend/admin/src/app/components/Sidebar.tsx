import { LayoutDashboard, Key, DollarSign, Home, FileText, Settings } from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'accesos', label: 'Accesos', icon: Key },
  { id: 'pagos', label: 'Pagos', icon: DollarSign },
  { id: 'amenidades', label: 'Amenidades', icon: Home },
  { id: 'reportes', label: 'Reportes', icon: FileText },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl text-blue-600">NexusResidencial</h1>
        <p className="text-sm text-gray-500">Panel de Administración</p>
      </div>
      
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600">AD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm">Administrador</p>
            <p className="text-xs text-gray-500">admin@residencial.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}