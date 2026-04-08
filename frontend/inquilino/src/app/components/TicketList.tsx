import { useState } from "react";
import { TicketCard, Ticket } from "./TicketCard";
import { Filter } from "lucide-react";

interface TicketListProps {
  tickets: Ticket[];
}

export function TicketList({ tickets }: TicketListProps) {
  const [filter, setFilter] = useState<"todos" | "enviado" | "en_proceso" | "resuelto">(
    "todos"
  );

  const filteredTickets =
    filter === "todos"
      ? tickets
      : tickets.filter((ticket) => ticket.status === filter);

  const counts = {
    todos: tickets.length,
    enviado: tickets.filter((t) => t.status === "enviado").length,
    en_proceso: tickets.filter((t) => t.status === "en_proceso").length,
    resuelto: tickets.filter((t) => t.status === "resuelto").length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">Mis Reportes</h3>
        <div className="flex items-center gap-2 text-gray-500">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filtrar</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {(["todos", "enviado", "en_proceso", "resuelto"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              filter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status === "todos"
              ? "Todos"
              : status === "enviado"
              ? "Enviados"
              : status === "en_proceso"
              ? "En Proceso"
              : "Resueltos"}{" "}
            <span
              className={`ml-1 ${
                filter === status ? "text-white/80" : "text-gray-500"
              }`}
            >
              ({counts[status]})
            </span>
          </button>
        ))}
      </div>

      {filteredTickets.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No hay reportes en esta categoría</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}
