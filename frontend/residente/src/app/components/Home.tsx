import React from 'react';
import { UserCircle, Users, CreditCard, Calendar, Bell } from 'lucide-react';
import { Card } from './ui/card';
import { Screen } from '../App';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const menuItems = [
    {
      id: 'visitas' as Screen,
      title: 'Autorizar Visita',
      description: 'Registra tus visitantes',
      icon: Users,
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 'amenidades' as Screen,
      title: 'Servicios',
      description: 'Amenidades y cuenta',
      icon: Calendar,
      color: 'from-purple-400 to-purple-600',
    },
    {
      id: 'avisos' as Screen,
      title: 'Avisos Oficiales',
      description: 'Comunicados importantes',
      icon: Bell,
      color: 'from-orange-400 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
              <UserCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">NexusResidencial</h1>
              <p className="text-gray-600">Portal del Residente</p>
            </div>
          </div>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg">
            <div className="p-6 text-white">
              <p className="text-blue-100 text-sm">Bienvenido de nuevo</p>
              <h2 className="text-2xl font-bold mt-1">Carlos Mendoza</h2>
              <p className="text-blue-100 mt-2">Casa #42 - Sector Norte</p>
            </div>
          </Card>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 overflow-hidden">
                <div className="p-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </Card>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>¿Necesitas ayuda? Contacta a administración</p>
          <p className="font-semibold text-blue-600 mt-1">+502 2345-6789</p>
        </div>
      </div>
    </div>
  );
}