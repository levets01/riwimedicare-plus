export type UserRole = 
  | 'admin'
  | 'farmaceutico_jefe'
  | 'coordinador_logistica'
  | 'auditor_calidad'
  | 'enfermero_quirofano';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  avatar: string;
  hospital: string;
  department: string;
}

export type StorageCondition = '2_8_C' | 'minus_20_C' | '15_25_C' | 'deep_freeze';

export interface MedicalItem {
  id: string;
  name: string;
  genericName: string;
  atcCode: string;
  category: 'Oncología' | 'Vacunas' | 'Anestesia y UCI' | 'Hemoderivados' | 'Antibióticos' | 'Material Quirúrgico';
  batchNumber: string;
  rfidTag: string;
  stock: number;
  minStock: number;
  unit: string;
  storageCondition: StorageCondition;
  targetTemp: string;
  currentTemp?: number;
  expiryDate: string;
  manufacturer: string;
  location: string;
  status: 'optimo' | 'stock_bajo' | 'caducidad_proxima' | 'cuarentena';
  price: number;
}

export interface ColdChainSensor {
  id: string;
  name: string;
  type: 'Camara_Fria' | 'Vehiculo_Refrigerado' | 'Nevera_Quirofano' | 'Contenedor_Transporte';
  location: string;
  currentTemp: number;
  minAllowed: number;
  maxAllowed: number;
  humidity: number;
  battery: number;
  status: 'normal' | 'alerta' | 'critico';
  lastPing: string;
  assignedLots: string[];
  history: { time: string; temp: number; humidity: number }[];
}

export interface ShipmentItem {
  itemId: string;
  name: string;
  batchNumber: string;
  quantity: number;
  tempRequirement: string;
}

export interface MedicalShipment {
  id: string;
  trackingNumber: string;
  destination: string;
  origin: string;
  recipientDepartment: string;
  priority: 'Urgencia_Vital' | 'Alta_Prioridad' | 'Programada';
  status: 'preparando' | 'en_transito' | 'en_revision' | 'entregado';
  driver: string;
  vehiclePlate: string;
  currentTemp: number;
  tempAlert: boolean;
  eta: string;
  dispatchTime: string;
  items: ShipmentItem[];
  custodyChain: {
    timestamp: string;
    stage: string;
    responsible: string;
    notes: string;
    tempSnapshot: number;
  }[];
}

export interface HospitalOrder {
  id: string;
  orderCode: string;
  hospital: string;
  department: string;
  doctorInCharge: string;
  createdAt: string;
  priority: 'Urgencia_Vital' | 'Alta_Prioridad' | 'Normal';
  status: 'pendiente_aprobacion' | 'en_preparacion' | 'despachado' | 'completado' | 'rechazado';
  items: {
    name: string;
    quantity: number;
    unit: string;
    urgent: boolean;
  }[];
  totalEstimated: number;
  surgeryTime?: string;
}

export interface TraceabilityStep {
  id: string;
  stepName: string;
  timestamp: string;
  location: string;
  operator: string;
  verificationHash: string;
  tempRecorded?: number;
  status: 'validado' | 'en_proceso' | 'pendiente';
  details: string;
}
