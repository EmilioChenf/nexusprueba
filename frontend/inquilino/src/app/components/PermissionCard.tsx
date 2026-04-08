import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface PermissionCardProps {
  title: string;
  permissions: Array<{ name: string; allowed: boolean }>;
}

export function PermissionCard({ title, permissions }: PermissionCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="mb-3">{title}</h3>
      <div className="space-y-2">
        {permissions.map((permission, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
          >
            <span className="text-sm text-gray-700">{permission.name}</span>
            {permission.allowed ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs">Permitido</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-500">
                <XCircle className="w-4 h-4" />
                <span className="text-xs">Restringido</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
