import { useState, useMemo } from 'react';
import { Search, Filter, Package, Moon, Sun, CheckCircle, XCircle } from 'lucide-react';
import { Visitor } from '../types/visitor';
import { VisitorCard } from './VisitorCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';

interface DashboardProps {
  visitors: Visitor[];
  onVisitorClick: (visitor: Visitor) => void;
  onQuickDeliveryClick: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Dashboard({
  visitors,
  onVisitorClick,
  onQuickDeliveryClick,
  darkMode,
  onToggleDarkMode,
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [casaFilter, setCasaFilter] = useState<string>('all');
  const [tipoFilter, setTipoFilter] = useState<string>('all');
  const [estadoFilter, setEstadoFilter] = useState<string>('all');

  const filteredVisitors = useMemo(() => {
    return visitors.filter((visitor) => {
      const matchesSearch =
        visitor.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.placa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.casa.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCasa = casaFilter === 'all' || visitor.casa.startsWith(casaFilter);

      const matchesTipo = tipoFilter === 'all' || visitor.tipo === tipoFilter;
      
      const matchesEstado = estadoFilter === 'all' || visitor.estado === estadoFilter;

      return matchesSearch && matchesCasa && matchesTipo && matchesEstado;
    });
  }, [visitors, searchQuery, casaFilter, tipoFilter, estadoFilter]);

  const casas = Array.from(new Set(visitors.map((v) => v.casa.split('-')[0]))).sort();

  const autorizadosCount = visitors.filter((v) => v.estado === 'Autorizado').length;
  const enComplejoCount = visitors.filter((v) => v.estado === 'En el complejo').length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl tracking-tight">NexusResidencial</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleDarkMode}
              className="size-12"
            >
              {darkMode ? <Sun className="size-6" /> : <Moon className="size-6" />}
            </Button>
          </div>
          <p className="text-xl text-muted-foreground">Panel de Seguridad</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-xl border-2 bg-card">
            <div className="text-lg text-muted-foreground mb-1">Autorizados</div>
            <div className="text-4xl">{autorizadosCount}</div>
          </div>
          <div className="p-5 rounded-xl border-2 bg-card">
            <div className="text-lg text-muted-foreground mb-1">En el Complejo</div>
            <div className="text-4xl">{enComplejoCount}</div>
          </div>
        </div>

        {/* Filtros Rápidos de Validación */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button
            variant={estadoFilter === 'Autorizado' ? 'default' : 'outline'}
            onClick={() => setEstadoFilter(estadoFilter === 'Autorizado' ? 'all' : 'Autorizado')}
            className="h-14 text-lg"
          >
            <CheckCircle className="size-5 mr-2 text-green-500" />
            Solo Autorizados
          </Button>
          <Button
            variant={estadoFilter === 'En el complejo' ? 'default' : 'outline'}
            onClick={() => setEstadoFilter(estadoFilter === 'En el complejo' ? 'all' : 'En el complejo')}
            className="h-14 text-lg"
          >
            <CheckCircle className="size-5 mr-2 text-blue-500" />
            En Complejo
          </Button>
          <Button
            variant={estadoFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setEstadoFilter('all')}
            className="h-14 text-lg"
          >
            Todos
          </Button>
        </div>

        {/* Quick Actions */}
        <Button
          onClick={onQuickDeliveryClick}
          size="lg"
          className="w-full mb-6 h-16 text-xl"
        >
          <Package className="size-6 mr-3" />
          Modo Delivery Rápido
        </Button>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-6 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por casa, nombre o placa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-16 text-xl"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <Filter className="size-5 text-muted-foreground flex-shrink-0" />
          <Select value={casaFilter} onValueChange={setCasaFilter}>
            <SelectTrigger className="h-12 text-lg flex-1">
              <SelectValue placeholder="Casa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-lg">
                Todas las casas
              </SelectItem>
              {casas.map((casa) => (
                <SelectItem key={casa} value={casa} className="text-lg">
                  Torre {casa}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="h-12 text-lg flex-1">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-lg">
                Todos los tipos
              </SelectItem>
              <SelectItem value="Visita" className="text-lg">
                Visita
              </SelectItem>
              <SelectItem value="Delivery" className="text-lg">
                Delivery
              </SelectItem>
              <SelectItem value="Proveedor" className="text-lg">
                Proveedor
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(casaFilter !== 'all' || tipoFilter !== 'all' || estadoFilter !== 'all') && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-sm text-muted-foreground">Filtros activos:</span>
            {casaFilter !== 'all' && (
              <Badge variant="secondary" className="text-base">
                Torre {casaFilter}
              </Badge>
            )}
            {tipoFilter !== 'all' && (
              <Badge variant="secondary" className="text-base">
                {tipoFilter}
              </Badge>
            )}
            {estadoFilter !== 'all' && (
              <Badge variant="secondary" className="text-base">
                {estadoFilter}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setCasaFilter('all');
                setTipoFilter('all');
                setEstadoFilter('all');
              }}
              className="text-sm"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-lg text-muted-foreground">
            {filteredVisitors.length} visitante{filteredVisitors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Visitor List */}
        <div className="grid gap-4">
          {filteredVisitors.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-xl">
              No se encontraron visitantes
            </div>
          ) : (
            filteredVisitors.map((visitor) => (
              <VisitorCard
                key={visitor.id}
                visitor={visitor}
                onClick={() => onVisitorClick(visitor)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}