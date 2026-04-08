import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { VisitorDetail } from './components/VisitorDetail';
import { QuickDelivery } from './components/QuickDelivery';
import { mockVisitors } from './data/mockVisitors';
import { Visitor } from './types/visitor';
import { toast, Toaster } from 'sonner';

type View = 'dashboard' | 'detail' | 'quickDelivery';

export default function App() {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleVisitorClick = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setCurrentView('dashboard');
    setSelectedVisitor(null);
  };

  const handleRegistrarIngreso = () => {
    if (!selectedVisitor) return;

    const now = new Date().toISOString();
    const updatedVisitors = visitors.map((v) =>
      v.id === selectedVisitor.id
        ? { ...v, estado: 'En el complejo' as const, horaIngreso: now }
        : v
    );

    setVisitors(updatedVisitors);
    const updatedVisitor = updatedVisitors.find((v) => v.id === selectedVisitor.id);
    if (updatedVisitor) {
      setSelectedVisitor(updatedVisitor);
    }

    toast.success('Ingreso registrado correctamente', {
      description: `${selectedVisitor.nombre} - ${new Date(now).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      duration: 3000,
    });
  };

  const handleRegistrarSalida = () => {
    if (!selectedVisitor) return;

    const now = new Date().toISOString();
    const updatedVisitors = visitors.map((v) =>
      v.id === selectedVisitor.id
        ? { ...v, estado: 'Salida registrada' as const, horaSalida: now }
        : v
    );

    setVisitors(updatedVisitors);
    const updatedVisitor = updatedVisitors.find((v) => v.id === selectedVisitor.id);
    if (updatedVisitor) {
      setSelectedVisitor(updatedVisitor);
    }

    toast.success('Salida registrada correctamente', {
      description: `${selectedVisitor.nombre} - ${new Date(now).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      duration: 3000,
    });

    // Auto-navigate back after 2 seconds
    setTimeout(() => {
      handleBack();
    }, 2000);
  };

  const handleQuickDeliveryConfirm = (casa: string) => {
    const now = new Date().toISOString();
    toast.success('Delivery registrado', {
      description: `Entrega confirmada para ${casa}`,
      duration: 3000,
    });

    // Auto-navigate back
    setTimeout(() => {
      handleBack();
    }, 1500);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {currentView === 'dashboard' && (
        <Dashboard
          visitors={visitors}
          onVisitorClick={handleVisitorClick}
          onQuickDeliveryClick={() => setCurrentView('quickDelivery')}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      )}

      {currentView === 'detail' && selectedVisitor && (
        <VisitorDetail
          visitor={selectedVisitor}
          onBack={handleBack}
          onRegistrarIngreso={handleRegistrarIngreso}
          onRegistrarSalida={handleRegistrarSalida}
        />
      )}

      {currentView === 'quickDelivery' && (
        <QuickDelivery onBack={handleBack} onConfirm={handleQuickDeliveryConfirm} />
      )}

      <Toaster position="top-center" richColors />
    </>
  );
}
