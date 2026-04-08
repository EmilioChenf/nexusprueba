import { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

interface PermissionTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  enabled: boolean;
  onClick: () => void;
}

export function PermissionTypeCard({
  icon: Icon,
  title,
  description,
  enabled,
  onClick,
}: PermissionTypeCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-left w-full active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start gap-3">
        <div className={`rounded-full p-3 ${enabled ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <Icon className={`w-6 h-6 ${enabled ? 'text-blue-600' : 'text-gray-400'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-base">{title}</h4>
            {enabled && (
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
}
