import { LucideIcon } from "lucide-react";

export interface Alert {
  id: string;
  type: "info" | "success" | "warning";
  icon: LucideIcon;
  title: string;
  message: string;
  time: string;
}

interface AlertCardProps {
  alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
  const Icon = alert.icon;
  
  const typeConfig = {
    info: { bg: "bg-blue-50", iconColor: "text-blue-600", borderColor: "border-l-blue-500" },
    success: { bg: "bg-green-50", iconColor: "text-green-600", borderColor: "border-l-green-500" },
    warning: { bg: "bg-amber-50", iconColor: "text-amber-600", borderColor: "border-l-amber-500" },
  };

  const config = typeConfig[alert.type];

  return (
    <div className={`${config.bg} rounded-lg p-3 border-l-4 ${config.borderColor} flex gap-3`}>
      <div className={`flex-shrink-0 ${config.iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm mb-1">{alert.title}</h4>
        <p className="text-xs text-gray-600 mb-1">{alert.message}</p>
        <span className="text-xs text-gray-500">{alert.time}</span>
      </div>
    </div>
  );
}
