import { useState } from "react";
import { X, AlertCircle, Home, Zap, Droplet, Wrench } from "lucide-react";

interface ReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: {
    category: string;
    title: string;
    description: string;
    priority: string;
  }) => void;
}

const categories = [
  { value: "mantenimiento", label: "Mantenimiento", icon: Wrench },
  { value: "electricidad", label: "Electricidad", icon: Zap },
  { value: "plomeria", label: "Plomería", icon: Droplet },
  { value: "areas_comunes", label: "Áreas Comunes", icon: Home },
];

const priorities = [
  { value: "baja", label: "Baja", color: "text-green-600 bg-green-50" },
  { value: "media", label: "Media", color: "text-amber-600 bg-amber-50" },
  { value: "alta", label: "Alta", color: "text-red-600 bg-red-50" },
];

export function ReportForm({ isOpen, onClose, onSubmit }: ReportFormProps) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("media");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !title || !description) return;

    onSubmit({ category, title, description, priority });
    setCategory("");
    setTitle("");
    setDescription("");
    setPriority("media");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg sm:mx-4 max-h-[90vh] overflow-y-auto shadow-xl animate-in slide-in-from-bottom duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg">Reportar Problema</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Categoría</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      category === cat.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Título del reporte
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Fuga de agua en baño"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el problema en detalle..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Prioridad</label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                    priority === p.value
                      ? p.color + " ring-2 ring-offset-2 ring-current"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Tu reporte será enviado al equipo de mantenimiento del condominio.
            </p>
          </div>

          <button
            type="submit"
            disabled={!category || !title || !description}
            className="w-full py-3 bg-blue-500 text-white rounded-xl active:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Enviar Reporte
          </button>
        </form>
      </div>
    </div>
  );
}
