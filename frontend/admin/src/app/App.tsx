import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { DashboardView } from "./views/DashboardView";
import { PaymentsView } from "./views/PaymentsView";
import { AmenidadesView } from "./views/AmenidadesView";
import { AccesosView } from "./views/AccesosView";
import { ComunicadosView } from "./views/ComunicadosView";
import { ReportesView } from "./views/ReportesView";
import { ConfiguracionView } from "./views/ConfiguracionView";

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'accesos':
        return <AccesosView />;
      case 'pagos':
        return <PaymentsView />;
      case 'amenidades':
        return <AmenidadesView />;
      case 'reportes':
        return <ReportesView />;
      case 'configuracion':
        return <ConfiguracionView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}