import { Clock } from "lucide-react";

export interface Provider {
  id: string;
  name: string;
  serviceType: string;
  status: "validado" | "pendiente";
  schedule: string;
  enabled: boolean;
}

interface ProviderCardProps {
  provider: Provider;
  onToggle: (id: string) => void;
}

export function ProviderCard({ provider, onToggle }: ProviderCardProps) {
  const statusConfig = {
    validado: { label: "Validado", color: "bg-green-100 text-green-700" },
    pendiente: { label: "Pendiente", color: "bg-amber-100 text-amber-700" },
  };

  const status = statusConfig[provider.status];

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-base">{provider.name}</h4>
            <span className={`px-2 py-0.5 rounded-full text-xs ${status.color}`}>
              {status.label}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{provider.serviceType}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{provider.schedule}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button
            onClick={() => onToggle(provider.id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              provider.enabled ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                provider.enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-xs text-gray-500">
            {provider.enabled ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
    </div>
  );
}
