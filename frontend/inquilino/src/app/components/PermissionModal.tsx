import { X, AlertTriangle } from "lucide-react";

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionName: string;
  onRequestApproval: () => void;
}

export function PermissionModal({
  isOpen,
  onClose,
  actionName,
  onRequestApproval,
}: PermissionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 rounded-full p-2">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg">Acción Restringida</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">{actionName}</span> requiere
              autorización del propietario.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                Se enviará una solicitud de aprobación al propietario de la unidad.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl active:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onRequestApproval();
                  onClose();
                }}
                className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl active:bg-blue-600 transition-colors"
              >
                Solicitar Aprobación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
