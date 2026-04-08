interface Payment {
  id: string;
  resident: string;
  unit: string;
  amount: number;
  date: string;
  status: 'Al día' | 'Pendiente' | 'Mora';
}

const payments: Payment[] = [
  { id: '1', resident: 'Juan Pérez', unit: 'A-101', amount: 500, date: '2026-02-15', status: 'Al día' },
  { id: '2', resident: 'María García', unit: 'B-205', amount: 500, date: '2026-02-10', status: 'Al día' },
  { id: '3', resident: 'Carlos Rodríguez', unit: 'C-303', amount: 500, date: '2026-01-15', status: 'Mora' },
  { id: '4', resident: 'Ana Martínez', unit: 'A-102', amount: 500, date: '2026-02-05', status: 'Pendiente' },
  { id: '5', resident: 'Luis Hernández', unit: 'B-201', amount: 500, date: '2026-02-12', status: 'Al día' },
  { id: '6', resident: 'Sofia López', unit: 'C-401', amount: 500, date: '2026-01-20', status: 'Mora' },
];

export function PaymentsTable() {
  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'Al día':
        return 'bg-green-100 text-green-700';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Mora':
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg text-gray-900">Pagos Recientes</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Residente
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Unidad
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.resident}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(payment.date).toLocaleDateString('es-ES')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
