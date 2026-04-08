import { useState } from "react";
import { X, Calendar, User } from "lucide-react";

interface AuthorizeVisitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (visit: {
    name: string;
    type: "temporal" | "recurrente" | "permanente";
    validUntil: string;
  }) => void;
  editingVisitor?: {
    id: string;
    name: string;
    type: "temporal" | "recurrente" | "permanente";
    validUntil: string;
  } | null;
}

export function AuthorizeVisitForm({
  isOpen,
  onClose,
  onSubmit,
  editingVisitor,
}: AuthorizeVisitFormProps) {
  const [name, setName] = useState(editingVisitor?.name || "");
  const [type, setType] = useState<"temporal" | "recurrente" | "permanente">(
    editingVisitor?.type || "temporal"
  );
  const [validUntil, setValidUntil] = useState(editingVisitor?.validUntil || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !validUntil) return;

    onSubmit({ name, type, validUntil });
    setName("");
    setType("temporal");
    setValidUntil("");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setType("temporal");
    setValidUntil("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg sm:mx-4 shadow-xl animate-in slide-in-from-bottom duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-3xl sm:rounded-t-2xl">
          <h2 className="text-lg">
            {editingVisitor ? "Modificar Acceso" : "Autorizar Visita"}
          </h2>
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
              Nombre del visitante
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Carlos Rodríguez"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Tipo de acceso</label>
            <div className="space-y-2">
              {[
                {
                  value: "temporal" as const,
                  label: "Temporal",
                  desc: "Una sola vez",
                },
                {
                  value: "recurrente" as const,
                  label: "Recurrente",
                  desc: "Múltiples visitas",
                },
                {
                  value: "permanente" as const,
                  label: "Permanente",
                  desc: "Sin límite de tiempo",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setType(option.value)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    type === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm mb-0.5">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.desc}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        type === option.value
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {type === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Válido hasta
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!name || !validUntil}
            className="w-full py-3 bg-blue-500 text-white rounded-xl active:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {editingVisitor ? "Guardar Cambios" : "Autorizar Acceso"}
          </button>
        </form>
      </div>
    </div>
  );
}
