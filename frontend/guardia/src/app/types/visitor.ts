export type VisitorType = 'Visita' | 'Delivery' | 'Proveedor';

export type VisitorStatus = 'Autorizado' | 'En el complejo' | 'Salida registrada';

export interface Visitor {
  id: string;
  casa: string;
  nombre: string;
  placa: string;
  tipo: VisitorType;
  estado: VisitorStatus;
  horaIngreso?: string;
  horaSalida?: string;
}
