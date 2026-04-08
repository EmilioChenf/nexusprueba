import { AlertCircle } from "lucide-react";

interface Alert {
  id: string;
  resident: string;
  unit: string;
  daysOverdue: number;
  amount: number;
}

const alerts: Alert[] = [
  { id: '1', resident: 'Carlos Rodríguez', unit: 'C-303', daysOverdue: 32, amount: 1500 },
  { id: '2', resident: 'Sofia López', unit: 'C-401', daysOverdue: 27, amount: 1000 },
  { id: '3', resident: 'Roberto Sánchez', unit: 'A-104', daysOverdue: 15, amount: 500 },
];

export function MorosityAlerts() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg text-gray-900">Alertas de Morosidad</h2>
      </div>
      <div className="p-6 space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-red-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-sm text-gray-900">{alert.resident}</p>
                  <p className="text-xs text-gray-500">Unidad {alert.unit}</p>
                </div>
                <span className="text-sm text-red-600">${alert.amount}</span>
              </div>
              <p className="text-xs text-red-600 mt-2">
                {alert.daysOverdue} días de atraso
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
