import { User, Clock, X, Edit2 } from "lucide-react";

export interface ActiveVisitor {
  id: string;
  name: string;
  type: "temporal" | "recurrente" | "permanente";
  validUntil: string;
  authorizedBy: string;
}

interface ActiveVisitorCardProps {
  visitor: ActiveVisitor;
  onEdit: (id: string) => void;
  onCancel: (id: string) => void;
}

const typeConfig = {
  temporal: { label: "Temporal", color: "bg-blue-100 text-blue-700" },
  recurrente: { label: "Recurrente", color: "bg-purple-100 text-purple-700" },
  permanente: { label: "Permanente", color: "bg-green-100 text-green-700" },
};

export function ActiveVisitorCard({ visitor, onEdit, onCancel }: ActiveVisitorCardProps) {
  const config = typeConfig[visitor.type];

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-blue-100 rounded-full p-2">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base mb-1">{visitor.name}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Válido hasta {visitor.validUntil}</span>
            </div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${config.color}`}>
          {config.label}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(visitor.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm active:bg-gray-200 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          <span>Modificar</span>
        </button>
        <button
          onClick={() => onCancel(visitor.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm active:bg-red-100 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Cancelar</span>
        </button>
      </div>
    </div>
  );
}
