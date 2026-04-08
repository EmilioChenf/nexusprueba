import { useState } from "react";
import { ProfileSection } from "./components/ProfileSection";
import { PermissionCard } from "./components/PermissionCard";
import { ActionButton } from "./components/ActionButton";
import { PermissionModal } from "./components/PermissionModal";
import { ReportForm } from "./components/ReportForm";
import { TicketList } from "./components/TicketList";
import { Ticket } from "./components/TicketCard";
import { ActiveVisitorCard, ActiveVisitor } from "./components/ActiveVisitorCard";
import { AuthorizeVisitForm } from "./components/AuthorizeVisitForm";
import { PermissionTypeCard } from "./components/PermissionTypeCard";
import { PendingRequestCard, PendingRequest } from "./components/PendingRequestCard";
import { BottomNav } from "./components/BottomNav";
import { ProviderCard, Provider } from "./components/ProviderCard";
import { AlertCard, Alert } from "./components/AlertCard";
import { RegisterProviderForm } from "./components/RegisterProviderForm";
import {
  UserCheck,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  Users,
  Package,
  Wrench,
  Plus,
  Bell,
  UserPlus,
  CreditCard,
} from "lucide-react";

export default function App() {
  // User profile
  const userProfile = {
    name: "María González",
    unit: "302",
    building: "Torre B",
    role: "Inquilino",
  };

  // Permissions state
  const [permissions] = useState([
    { name: "Autorizar visitas", allowed: true },
    { name: "Reservar amenidades", allowed: false },
    { name: "Modificar datos", allowed: false },
  ]);

  // Modal states
  const [permissionModal, setPermissionModal] = useState<{
    isOpen: boolean;
    actionName: string;
  }>({ isOpen: false, actionName: "" });

  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [visitFormOpen, setVisitFormOpen] = useState(false);
  const [editingVisitor, setEditingVisitor] = useState<ActiveVisitor | null>(null);
  const [activeTab, setActiveTab] = useState("inicio");
  const [providerFormOpen, setProviderFormOpen] = useState(false);

  // Alerts state
  const [alerts] = useState<Alert[]>([
    {
      id: "1",
      type: "info",
      icon: Users,
      title: "Visita por llegar",
      message: "Carlos Rodríguez llegará en 15 minutos",
      time: "Hace 5 min",
    },
    {
      id: "2",
      type: "success",
      icon: CheckCircle,
      title: "Solicitud aprobada",
      message: "Tu solicitud para reservar el salón de eventos fue aprobada",
      time: "Hace 1 hora",
    },
    {
      id: "3",
      type: "warning",
      icon: CreditCard,
      title: "Recordatorio de pago",
      message: "El pago de mantenimiento vence en 3 días",
      time: "Hace 2 horas",
    },
  ]);

  // Providers state
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "1",
      name: "Servicio de Limpieza ProClean",
      serviceType: "Limpieza",
      status: "validado",
      schedule: "Lunes a Viernes 8:00-17:00",
      enabled: true,
    },
    {
      id: "2",
      name: "Juan Martínez - Plomero",
      serviceType: "Plomería",
      status: "validado",
      schedule: "Martes y Jueves 9:00-18:00",
      enabled: true,
    },
    {
      id: "3",
      name: "Electricidad Rápida",
      serviceType: "Electricidad",
      status: "pendiente",
      schedule: "Lunes a Sábado 7:00-19:00",
      enabled: false,
    },
  ]);

  // Pending requests state
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([
    {
      id: "1",
      type: "Amenidad",
      title: "Solicitud para reservar salón de eventos",
      date: "18 Mar 2026",
      status: "pendiente",
    },
    {
      id: "2",
      type: "Permiso",
      title: "Autorización para instalar aire acondicionado",
      date: "17 Mar 2026",
      status: "pendiente",
    },
    {
      id: "3",
      type: "Acceso",
      title: "Permiso permanente para empleada doméstica",
      date: "15 Mar 2026",
      status: "aprobado",
    },
  ]);

  // Active visitors state
  const [activeVisitors, setActiveVisitors] = useState<ActiveVisitor[]>([
    {
      id: "1",
      name: "Carlos Rodríguez",
      type: "temporal",
      validUntil: "2026-03-05",
      authorizedBy: "María González",
    },
    {
      id: "2",
      name: "Ana Martínez",
      type: "recurrente",
      validUntil: "2026-03-15",
      authorizedBy: "María González",
    },
    {
      id: "3",
      name: "Servicio de Limpieza",
      type: "permanente",
      validUntil: "2026-12-31",
      authorizedBy: "María González",
    },
  ]);

  // Tickets state
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      title: "Fuga de agua en baño principal",
      category: "Plomería",
      description:
        "Hay una pequeña fuga debajo del lavabo que está causando humedad en el gabinete.",
      priority: "alta",
      status: "en_proceso",
      date: "15 Feb 2026",
    },
    {
      id: "2",
      title: "Luz del estacionamiento no funciona",
      category: "Electricidad",
      description:
        "La luz del espacio de estacionamiento #45 no enciende desde hace 3 días.",
      priority: "media",
      status: "enviado",
      date: "14 Feb 2026",
    },
    {
      id: "3",
      title: "Problema con cerradura de puerta",
      category: "Mantenimiento",
      description:
        "La cerradura de la puerta principal está trabándose y es difícil abrir.",
      priority: "media",
      status: "resuelto",
      date: "10 Feb 2026",
    },
  ]);

  // Handle restricted actions
  const handleRestrictedAction = (actionName: string) => {
    const permission = permissions.find((p) => p.name === actionName);
    if (permission && !permission.allowed) {
      setPermissionModal({ isOpen: true, actionName });
      return false;
    }
    return true;
  };

  // Handle approval request
  const handleRequestApproval = () => {
    showSuccessMessage("Solicitud de aprobación enviada al propietario");
  };

  // Handle authorized visit
  const handleAuthorizeVisit = () => {
    if (handleRestrictedAction("Autorizar visitas")) {
      setVisitFormOpen(true);
    }
  };

  // Handle request owner permission
  const handleRequestOwnerPermission = () => {
    showSuccessMessage("Solicitud enviada al propietario");
  };

  // Handle reserve amenity
  const handleReserveAmenity = () => {
    if (handleRestrictedAction("Reservar amenidades")) {
      showSuccessMessage("Amenidad reservada exitosamente");
    }
  };

  // Handle report submission
  const handleSubmitReport = (report: {
    category: string;
    title: string;
    description: string;
    priority: string;
  }) => {
    const newTicket: Ticket = {
      id: String(tickets.length + 1),
      title: report.title,
      category: report.category,
      description: report.description,
      priority: report.priority,
      status: "enviado",
      date: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
    setTickets([newTicket, ...tickets]);
    showSuccessMessage("Reporte enviado exitosamente");
  };

  // Handle visit authorization
  const handleSubmitVisit = (visit: {
    name: string;
    type: "temporal" | "recurrente" | "permanente";
    validUntil: string;
  }) => {
    if (editingVisitor) {
      // Update existing visitor
      setActiveVisitors(
        activeVisitors.map((v) =>
          v.id === editingVisitor.id
            ? { ...v, ...visit }
            : v
        )
      );
      showSuccessMessage("Acceso modificado correctamente");
      setEditingVisitor(null);
    } else {
      // Add new visitor
      const newVisitor: ActiveVisitor = {
        id: String(activeVisitors.length + 1),
        ...visit,
        authorizedBy: userProfile.name,
      };
      setActiveVisitors([newVisitor, ...activeVisitors]);
      showSuccessMessage("Visita autorizada exitosamente");
    }
  };

  // Handle edit visitor
  const handleEditVisitor = (id: string) => {
    const visitor = activeVisitors.find((v) => v.id === id);
    if (visitor) {
      setEditingVisitor(visitor);
      setVisitFormOpen(true);
    }
  };

  // Handle cancel visitor
  const handleCancelVisitor = (id: string) => {
    setActiveVisitors(activeVisitors.filter((v) => v.id !== id));
    showSuccessMessage("Acceso cancelado correctamente");
  };

  // Handle view request
  const handleViewRequest = (id: string) => {
    showSuccessMessage("Viendo detalles de la solicitud");
  };

  // Handle cancel request
  const handleCancelRequest = (id: string) => {
    setPendingRequests(pendingRequests.filter((r) => r.id !== id));
    showSuccessMessage("Solicitud cancelada");
  };

  // Handle toggle provider
  const handleToggleProvider = (id: string) => {
    setProviders(
      providers.map((p) =>
        p.id === id ? { ...p, enabled: !p.enabled } : p
      )
    );
  };

  // Handle submit provider
  const handleSubmitProvider = (provider: {
    name: string;
    serviceType: string;
    schedule: string;
  }) => {
    const newProvider: Provider = {
      id: String(providers.length + 1),
      ...provider,
      status: "pendiente",
      enabled: false,
    };
    setProviders([newProvider, ...providers]);
    showSuccessMessage("Proveedor registrado - Pendiente de validación");
  };

  // Success message helper
  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">NexusResidencial</h1>
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Inquilino
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-16 left-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Profile Section */}
        <ProfileSection
          name={userProfile.name}
          unit={userProfile.unit}
          building={userProfile.building}
          role={userProfile.role}
        />

        {activeTab === "inicio" && (
          <>
            {/* Alerts Section */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-gray-700" />
                <h3>Alertas Recientes</h3>
              </div>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-2 gap-3">
                <ActionButton
                  icon={UserCheck}
                  label="Autorizar Visita"
                  onClick={handleAuthorizeVisit}
                  variant="primary"
                />
                <ActionButton
                  icon={FileText}
                  label="Solicitar Permiso"
                  onClick={handleRequestOwnerPermission}
                  variant="secondary"
                />
                <ActionButton
                  icon={Calendar}
                  label="Reservar Amenidad"
                  onClick={handleReserveAmenity}
                  variant="secondary"
                />
                <ActionButton
                  icon={AlertCircle}
                  label="Reportar Problema"
                  onClick={() => setReportFormOpen(true)}
                  variant="danger"
                />
              </div>
            </div>

            {/* Pending Requests Section */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3>Solicitudes Pendientes</h3>
                <span className="text-sm text-gray-500">
                  {pendingRequests.filter((r) => r.status === "pendiente").length}{" "}
                  pendientes
                </span>
              </div>
              <div className="space-y-3">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm">No hay solicitudes</p>
                  </div>
                ) : (
                  pendingRequests.map((request) => (
                    <PendingRequestCard
                      key={request.id}
                      request={request}
                      onView={handleViewRequest}
                      onCancel={handleCancelRequest}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Ticket List */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <TicketList tickets={tickets} />
            </div>
          </>
        )}

        {activeTab === "permisos" && (
          <>
            {/* Permissions Card */}
            <PermissionCard title="Permisos Activos" permissions={permissions} />

            {/* Permission Type Cards */}
            <div className="space-y-3">
              <h3>Tipos de Permisos</h3>
              <PermissionTypeCard
                icon={UserCheck}
                title="Autorizar Visitas"
                description="Gestiona el acceso de visitantes a tu unidad"
                enabled={true}
                onClick={handleAuthorizeVisit}
              />
              <PermissionTypeCard
                icon={Package}
                title="Gestionar Deliveries"
                description="Autoriza entregas y paquetería"
                enabled={true}
                onClick={() => showSuccessMessage("Gestión de deliveries próximamente")}
              />
              <PermissionTypeCard
                icon={Wrench}
                title="Autorizar Proveedores"
                description="Permite acceso a personal de servicio"
                enabled={false}
                onClick={() => handleRestrictedAction("Autorizar proveedores")}
              />
            </div>
          </>
        )}

        {activeTab === "visitas" && (
          <>
            {/* Active Visitors Section */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-700" />
                  <h3>Accesos Autorizados</h3>
                </div>
                <span className="text-sm text-gray-500">
                  {activeVisitors.length} activos
                </span>
              </div>
              <div className="space-y-3">
                {activeVisitors.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No hay accesos autorizados</p>
                  </div>
                ) : (
                  activeVisitors.map((visitor) => (
                    <ActiveVisitorCard
                      key={visitor.id}
                      visitor={visitor}
                      onEdit={handleEditVisitor}
                      onCancel={handleCancelVisitor}
                    />
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === "perfil" && (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
              <h3 className="mb-4">Información del Perfil</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Nombre Completo</label>
                  <p className="text-base">{userProfile.name}</p>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <label className="text-sm text-gray-500">Unidad</label>
                  <p className="text-base">Unidad {userProfile.unit}</p>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <label className="text-sm text-gray-500">Edificio</label>
                  <p className="text-base">{userProfile.building}</p>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <label className="text-sm text-gray-500">Rol</label>
                  <p className="text-base">{userProfile.role}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Permission Modal */}
      <PermissionModal
        isOpen={permissionModal.isOpen}
        onClose={() => setPermissionModal({ isOpen: false, actionName: "" })}
        actionName={permissionModal.actionName}
        onRequestApproval={handleRequestApproval}
      />

      {/* Report Form */}
      <ReportForm
        isOpen={reportFormOpen}
        onClose={() => setReportFormOpen(false)}
        onSubmit={handleSubmitReport}
      />

      {/* Authorize Visit Form */}
      <AuthorizeVisitForm
        isOpen={visitFormOpen}
        onClose={() => {
          setVisitFormOpen(false);
          setEditingVisitor(null);
        }}
        onSubmit={handleSubmitVisit}
        editingVisitor={editingVisitor}
      />

      {/* Register Provider Form */}
      <RegisterProviderForm
        isOpen={providerFormOpen}
        onClose={() => setProviderFormOpen(false)}
        onSubmit={handleSubmitProvider}
      />

      {/* FAB - Floating Action Button */}
      <button
        onClick={handleRequestOwnerPermission}
        className="fixed bottom-20 right-4 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}