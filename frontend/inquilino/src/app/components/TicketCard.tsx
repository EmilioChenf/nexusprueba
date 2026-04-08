import { Clock, CheckCircle2, Loader2 } from "lucide-react";

export interface Ticket {
  id: string;
  title: string;
  category: string;
  description: string;
  priority: string;
  status: "enviado" | "en_proceso" | "resuelto";
  date: string;
}

interface TicketCardProps {
  ticket: Ticket;
}

const statusConfig = {
  enviado: {
    label: "Enviado",
    icon: Clock,
    color: "text-gray-600 bg-gray-100",
  },
  en_proceso: {
    label: "En Proceso",
    icon: Loader2,
    color: "text-blue-600 bg-blue-100",
  },
  resuelto: {
    label: "Resuelto",
    icon: CheckCircle2,
    color: "text-green-600 bg-green-100",
  },
};

const priorityColors = {
  baja: "border-l-green-500",
  media: "border-l-amber-500",
  alta: "border-l-red-500",
};

export function TicketCard({ ticket }: TicketCardProps) {
  const status = statusConfig[ticket.status];
  const StatusIcon = status.icon;

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${
        priorityColors[ticket.priority as keyof typeof priorityColors]
      } border border-gray-100`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="text-base mb-1">{ticket.title}</h4>
          <p className="text-xs text-gray-500">
            {ticket.category} • {ticket.date}
          </p>
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.color}`}
        >
          <StatusIcon
            className={`w-3 h-3 ${
              ticket.status === "en_proceso" ? "animate-spin" : ""
            }`}
          />
          <span>{status.label}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
    </div>
  );
}
