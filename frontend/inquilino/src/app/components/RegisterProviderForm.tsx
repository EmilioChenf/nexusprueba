import { useState } from "react";
import { X, User, Briefcase, Clock } from "lucide-react";

interface RegisterProviderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (provider: {
    name: string;
    serviceType: string;
    schedule: string;
  }) => void;
}

const serviceTypes = [
  "Limpieza",
  "Plomería",
  "Electricidad",
  "Jardinería",
  "Mantenimiento",
  "Carpintería",
  "Pintura",
  "Otro",
];

export function RegisterProviderForm({
  isOpen,
  onClose,
  onSubmit,
}: RegisterProviderFormProps) {
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [schedule, setSchedule] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !serviceType || !schedule) return;

    onSubmit({ name, serviceType, schedule });
    setName("");
    setServiceType("");
    setSchedule("");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setServiceType("");
    setSchedule("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg sm:mx-4 shadow-xl animate-in slide-in-from-bottom duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-3xl sm:rounded-t-2xl">
          <h2 className="text-lg">Registrar Proveedor</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Nombre del proveedor
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Tipo de servicio</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                required
              >
                <option value="">Seleccionar servicio</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Horario permitido
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="Ej: Lunes a Viernes 8:00-17:00"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              El proveedor será validado por administración antes de activarse.
            </p>
          </div>

          <button
            type="submit"
            disabled={!name || !serviceType || !schedule}
            className="w-full py-3 bg-blue-500 text-white rounded-xl active:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Registrar Proveedor
          </button>
        </form>
      </div>
    </div>
  );
}
