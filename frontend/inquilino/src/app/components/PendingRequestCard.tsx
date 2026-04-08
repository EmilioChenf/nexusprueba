import { Clock, Eye, X } from "lucide-react";

export interface PendingRequest {
  id: string;
  type: string;
  title: string;
  date: string;
  status: "pendiente" | "aprobado" | "rechazado";
}

interface PendingRequestCardProps {
  request: PendingRequest;
  onView: (id: string) => void;
  onCancel: (id: string) => void;
}

const statusConfig = {
  pendiente: { label: "Pendiente", color: "bg-amber-100 text-amber-700" },
  aprobado: { label: "Aprobado", color: "bg-green-100 text-green-700" },
  rechazado: { label: "Rechazado", color: "bg-red-100 text-red-700" },
};

export function PendingRequestCard({ request, onView, onCancel }: PendingRequestCardProps) {
  const status = statusConfig[request.status];

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>
              {status.label}
            </span>
            <span className="text-xs text-gray-500">{request.type}</span>
          </div>
          <h4 className="text-base mb-1">{request.title}</h4>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{request.date}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onView(request.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg text-sm active:bg-blue-100 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Ver</span>
        </button>
        {request.status === "pendiente" && (
          <button
            onClick={() => onCancel(request.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm active:bg-red-100 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Cancelar</span>
          </button>
        )}
      </div>
    </div>
  );
}
