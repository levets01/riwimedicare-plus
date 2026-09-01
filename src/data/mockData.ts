import { MedicalItem, ColdChainSensor, MedicalShipment, HospitalOrder, User } from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Dra. Elena Vance',
    email: 'elena.vance@riwimedicare.com',
    role: 'farmaceutico_jefe',
    roleTitle: 'Directora de Farmacia Hospitalaria',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
    hospital: 'Hospital Universitario San Rafael',
    department: 'Farmacología Clínica & Suministros'
  },
  {
    id: 'usr-2',
    name: 'Ing. Carlos Mendoza',
    email: 'carlos.mendoza@riwimedicare.com',
    role: 'coordinador_logistica',
    roleTitle: 'Coordinador de Cadena de Frío & Flotas',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    hospital: 'Hub Central de Distribución RiwiMediCare',
    department: 'Operaciones Logísticas de Precisión'
  },
  {
    id: 'usr-3',
    name: 'Dra. Sofía Rincón',
    email: 'sofia.rincon@riwimedicare.com',
    role: 'auditor_calidad',
    roleTitle: 'Auditora de Cumplimiento Sanitario & BPM',
    avatar: 'https://images.unsplash.com/photo-1594824813589-cf77ef293070?auto=format&fit=crop&q=80&w=256',
    hospital: 'Superintendencia de Salud & Control',
    department: 'Garantía de Calidad y Farmacovigilancia'
  },
  {
    id: 'usr-4',
    name: 'Dr. Mateo Alarcón',
    email: 'mateo.alarcon@riwimedicare.com',
    role: 'enfermero_quirofano',
    roleTitle: 'Jefe de Quirófano y Urgencias Críticas',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
    hospital: 'Clínica Cardioinfantil del Norte',
    department: 'Unidad de Cirugía Mayor y Trasplantes'
  }
];

export const INITIAL_ITEMS: MedicalItem[] = [
  {
    id: 'med-01',
    name: 'Insulina Glargina 100 UI/ml',
    genericName: 'Insulina Glargina Solución Inyectable',
    atcCode: 'A10AE04',
    category: 'Anestesia y UCI',
    batchNumber: 'LOT-GLA-2026-09A',
    rfidTag: 'RFID-9942-8812',
    stock: 480,
    minStock: 150,
    unit: 'Viales 10ml',
    storageCondition: '2_8_C',
    targetTemp: '2°C a 8°C (Monitoreo Continuo)',
    currentTemp: 4.2,
    expiryDate: '2027-11-15',
    manufacturer: 'Sanofi BioCare Pharma',
    location: 'Cámara Fría A-03, Rack 2',
    status: 'optimo',
    price: 34.50
  },
  {
    id: 'med-02',
    name: 'Pembrolizumab 100mg/4ml',
    genericName: 'Anticuerpo Monoclonal Anti-PD-1',
    atcCode: 'L01FF02',
    category: 'Oncología',
    batchNumber: 'LOT-KEY-2026-44B',
    rfidTag: 'RFID-8811-3390',
    stock: 64,
    minStock: 25,
    unit: 'Frascos Ampolla',
    storageCondition: '2_8_C',
    targetTemp: '2°C a 8°C (No Congelar)',
    currentTemp: 3.8,
    expiryDate: '2027-04-30',
    manufacturer: 'Merck BioLogics',
    location: 'Cámara Fría B-01, Zona Seguridad',
    status: 'optimo',
    price: 1890.00
  },
  {
    id: 'med-03',
    name: 'Vacuna Bivalente ARNm COVID/Flu',
    genericName: 'Vacuna de ARN Mensajero Modificado',
    atcCode: 'J07BX03',
    category: 'Vacunas',
    batchNumber: 'LOT-VAC-2026-108',
    rfidTag: 'RFID-1002-7723',
    stock: 1200,
    minStock: 300,
    unit: 'Dosis viales multidosis',
    storageCondition: 'minus_20_C',
    targetTemp: '-25°C a -15°C',
    currentTemp: -19.4,
    expiryDate: '2026-12-20',
    manufacturer: 'BioNTech Pfizer Logistics',
    location: 'Congelador Ultra Frío U-02',
    status: 'optimo',
    price: 28.00
  },
  {
    id: 'med-04',
    name: 'Fentanilo 0.05mg/ml 10ml',
    genericName: 'Fentanilo Citrato Inyectable',
    atcCode: 'N01AH01',
    category: 'Anestesia y UCI',
    batchNumber: 'LOT-FEN-2026-72C',
    rfidTag: 'RFID-7712-4411',
    stock: 42,
    minStock: 60,
    unit: 'Ampollas 10ml',
    storageCondition: '15_25_C',
    targetTemp: '15°C a 25°C (Controlado Estupefacientes)',
    currentTemp: 21.0,
    expiryDate: '2028-02-10',
    manufacturer: 'Laboratorios Baxter Hospira',
    location: 'Bóveda de Seguridad Controlada Q-1',
    status: 'stock_bajo',
    price: 12.80
  },
  {
    id: 'med-05',
    name: 'Inmunoglobulina Humana Normal 10g',
    genericName: 'Inmunoglobulina Intravenosa (IGIV)',
    atcCode: 'J06BA02',
    category: 'Hemoderivados',
    batchNumber: 'LOT-IGIV-2026-03Z',
    rfidTag: 'RFID-5520-9901',
    stock: 18,
    minStock: 20,
    unit: 'Frascos 200ml',
    storageCondition: '2_8_C',
    targetTemp: '2°C a 8°C (Protegido de luz)',
    currentTemp: 4.8,
    expiryDate: '2026-10-05',
    manufacturer: 'Grifols Biologicals',
    location: 'Cámara Fría A-01, Nivel 4',
    status: 'caducidad_proxima',
    price: 650.00
  },
  {
    id: 'med-06',
    name: 'Meropenem Trihidrato 1g',
    genericName: 'Meropenem Polvo para Solución',
    atcCode: 'J01DH02',
    category: 'Antibióticos',
    batchNumber: 'LOT-MER-2026-89M',
    rfidTag: 'RFID-3341-2299',
    stock: 950,
    minStock: 200,
    unit: 'Viales I.V.',
    storageCondition: '15_25_C',
    targetTemp: '15°C a 30°C',
    currentTemp: 20.5,
    expiryDate: '2027-08-25',
    manufacturer: 'AstraZeneca Hospital Pharma',
    location: 'Almacén Central Rack G-12',
    status: 'optimo',
    price: 18.20
  },
  {
    id: 'med-07',
    name: 'Set de Válvulas Aórticas Transcatéter (TAVI)',
    genericName: 'Prótesis Biológica Valvular Estéril',
    atcCode: 'SURG-091',
    category: 'Material Quirúrgico',
    batchNumber: 'LOT-TAVI-2026-004',
    rfidTag: 'RFID-8833-1100',
    stock: 8,
    minStock: 5,
    unit: 'Kits Quirúrgicos Estériles',
    storageCondition: '15_25_C',
    targetTemp: '15°C a 25°C Seco',
    currentTemp: 19.8,
    expiryDate: '2028-09-01',
    manufacturer: 'Edwards Lifesciences',
    location: 'Zona Estéril Quirúrgica S-04',
    status: 'optimo',
    price: 14500.00
  },
  {
    id: 'med-08',
    name: 'Factor VIII de Coagulación Recombinante',
    genericName: 'Octocog Alfa 1000 UI',
    atcCode: 'B02BD02',
    category: 'Hemoderivados',
    batchNumber: 'LOT-F8-2026-11Q',
    rfidTag: 'RFID-4419-7731',
    stock: 35,
    minStock: 15,
    unit: 'Viales con solvente',
    storageCondition: '2_8_C',
    targetTemp: '2°C a 8°C',
    currentTemp: 5.1,
    expiryDate: '2027-03-18',
    manufacturer: 'Bayer Healthcare Biolab',
    location: 'Cámara Fría A-02',
    status: 'optimo',
    price: 820.00
  }
];

export const INITIAL_SENSORS: ColdChainSensor[] = [
  {
    id: 'sens-01',
    name: 'Cámara Principal A-01 (Biológicos & Vacunas)',
    type: 'Camara_Fria',
    location: 'Centro Logístico Riwi Central - Nave Norte',
    currentTemp: 4.3,
    minAllowed: 2.0,
    maxAllowed: 8.0,
    humidity: 48,
    battery: 100,
    status: 'normal',
    lastPing: 'Hace 12 seg',
    assignedLots: ['LOT-GLA-2026-09A', 'LOT-KEY-2026-44B', 'LOT-IGIV-2026-03Z'],
    history: [
      { time: '08:00', temp: 4.1, humidity: 47 },
      { time: '08:15', temp: 4.2, humidity: 48 },
      { time: '08:30', temp: 4.5, humidity: 50 },
      { time: '08:45', temp: 4.3, humidity: 49 },
      { time: '09:00', temp: 4.3, humidity: 48 }
    ]
  },
  {
    id: 'sens-02',
    name: 'Ultra-Freezer U-02 (ARNm -20°C)',
    type: 'Camara_Fria',
    location: 'Sala Criogénica Nivel -1',
    currentTemp: -19.4,
    minAllowed: -25.0,
    maxAllowed: -15.0,
    humidity: 15,
    battery: 98,
    status: 'normal',
    lastPing: 'Hace 8 seg',
    assignedLots: ['LOT-VAC-2026-108'],
    history: [
      { time: '08:00', temp: -19.8, humidity: 14 },
      { time: '08:15', temp: -19.5, humidity: 15 },
      { time: '08:30', temp: -19.2, humidity: 16 },
      { time: '08:45', temp: -19.4, humidity: 15 },
      { time: '09:00', temp: -19.4, humidity: 15 }
    ]
  },
  {
    id: 'sens-03',
    name: 'Unidad Móvil Refrigerada 04 (ThermoKing)',
    type: 'Vehiculo_Refrigerado',
    location: 'Autopista Norte Km 14 (Hacia Hospital Metropolitano)',
    currentTemp: 4.8,
    minAllowed: 2.0,
    maxAllowed: 8.0,
    humidity: 52,
    battery: 89,
    status: 'normal',
    lastPing: 'Hace 3 seg (Telemetría GPS activa)',
    assignedLots: ['LOT-GLA-2026-09A', 'LOT-TAVI-2026-004'],
    history: [
      { time: '08:00', temp: 4.0, humidity: 50 },
      { time: '08:15', temp: 4.4, humidity: 51 },
      { time: '08:30', temp: 4.9, humidity: 53 },
      { time: '08:45', temp: 4.7, humidity: 52 },
      { time: '09:00', temp: 4.8, humidity: 52 }
    ]
  },
  {
    id: 'sens-04',
    name: 'Nevera Quirúrgica Emergencias UCI-02',
    type: 'Nevera_Quirofano',
    location: 'Hospital San Rafael - Bloque Quirúrgico Piso 3',
    currentTemp: 5.6,
    minAllowed: 2.0,
    maxAllowed: 8.0,
    humidity: 55,
    battery: 94,
    status: 'normal',
    lastPing: 'Hace 20 seg',
    assignedLots: ['LOT-F8-2026-11Q', 'LOT-FEN-2026-72C'],
    history: [
      { time: '08:00', temp: 5.1, humidity: 54 },
      { time: '08:15', temp: 5.3, humidity: 54 },
      { time: '08:30', temp: 5.8, humidity: 56 },
      { time: '08:45', temp: 5.7, humidity: 55 },
      { time: '09:00', temp: 5.6, humidity: 55 }
    ]
  }
];

export const INITIAL_SHIPMENTS: MedicalShipment[] = [
  {
    id: 'ship-01',
    trackingNumber: 'RWM-EXP-88910',
    destination: 'Hospital Universitario San Rafael',
    origin: 'Hub Farmacéutico Central Riwi',
    recipientDepartment: 'Quirófano 4 & Unidad de Trasplantes',
    priority: 'Urgencia_Vital',
    status: 'en_transito',
    driver: 'Javier Restrepo (Certificación Cadena Frío GxP)',
    vehiclePlate: 'MED-749 (ThermoKing Dual Temp)',
    currentTemp: 4.1,
    tempAlert: false,
    eta: '18 mins (09:42 AM)',
    dispatchTime: 'Hoy 08:30 AM',
    items: [
      { itemId: 'med-01', name: 'Insulina Glargina 100 UI/ml', batchNumber: 'LOT-GLA-2026-09A', quantity: 40, tempRequirement: '2°C a 8°C' },
      { itemId: 'med-07', name: 'Set de Válvulas Aórticas Transcatéter (TAVI)', batchNumber: 'LOT-TAVI-2026-004', quantity: 2, tempRequirement: '15°C a 25°C' }
    ],
    custodyChain: [
      { timestamp: '08:15 AM', stage: 'Empaque Isotérmico & Validación RFID', responsible: 'Auditoría GxP Centro', notes: 'Sensores iButton calibrados insertados', tempSnapshot: 3.9 },
      { timestamp: '08:30 AM', stage: 'Carga en Vehículo MED-749', responsible: 'Javier Restrepo', notes: 'Sellos de seguridad #48991 y #48992 aplicados', tempSnapshot: 4.0 },
      { timestamp: '09:00 AM', stage: 'Tránsito Controlado por Autopista', responsible: 'Sistema IoT Satelital', notes: 'Temperatura estable sin desviaciones', tempSnapshot: 4.1 }
    ]
  },
  {
    id: 'ship-02',
    trackingNumber: 'RWM-ORD-44120',
    destination: 'Centro Oncológico Santa María',
    origin: 'Hub Farmacéutico Central Riwi',
    recipientDepartment: 'Unidad de Quimioterapia Ambulatoria',
    priority: 'Alta_Prioridad',
    status: 'preparando',
    driver: 'Sandra Morales',
    vehiclePlate: 'MED-310 (Camioneta Fría)',
    currentTemp: 3.8,
    tempAlert: false,
    eta: '45 mins (10:15 AM)',
    dispatchTime: 'Hoy 09:10 AM',
    items: [
      { itemId: 'med-02', name: 'Pembrolizumab 100mg/4ml', batchNumber: 'LOT-KEY-2026-44B', quantity: 12, tempRequirement: '2°C a 8°C' },
      { itemId: 'med-08', name: 'Factor VIII Coagulación', batchNumber: 'LOT-F8-2026-11Q', quantity: 10, tempRequirement: '2°C a 8°C' }
    ],
    custodyChain: [
      { timestamp: '08:45 AM', stage: 'Recepción de Orden Médica Firmada', responsible: 'Dra. Elena Vance', notes: 'Prescripción oncológica verificada', tempSnapshot: 3.8 }
    ]
  },
  {
    id: 'ship-03',
    trackingNumber: 'RWM-DISP-11099',
    destination: 'Clínica Cardioinfantil del Norte',
    origin: 'Depósito Criogénico Riwi',
    recipientDepartment: 'Centro de Vacunación Especial',
    priority: 'Programada',
    status: 'entregado',
    driver: 'Mario Gómez',
    vehiclePlate: 'MED-902',
    currentTemp: -19.1,
    tempAlert: false,
    eta: 'Completado (08:15 AM)',
    dispatchTime: 'Hoy 07:00 AM',
    items: [
      { itemId: 'med-03', name: 'Vacuna Bivalente ARNm', batchNumber: 'LOT-VAC-2026-108', quantity: 300, tempRequirement: '-20°C Criogénico' }
    ],
    custodyChain: [
      { timestamp: '07:00 AM', stage: 'Despacho con Hielo Seco y Contenedor Vacio', responsible: 'Operador Criogénico', notes: 'Temperatura inicial -22°C', tempSnapshot: -22.0 },
      { timestamp: '08:15 AM', stage: 'Entrega en Destino y Firma Electrónica', responsible: 'Dr. Mateo Alarcón', notes: 'Recepción conforme, cadena de custodia intacta', tempSnapshot: -19.1 }
    ]
  }
];

export const INITIAL_ORDERS: HospitalOrder[] = [
  {
    id: 'ord-101',
    orderCode: 'REQ-2026-HSR-091',
    hospital: 'Hospital Universitario San Rafael',
    department: 'Cirugía Cardiovascular (Quirófano 2)',
    doctorInCharge: 'Dr. Carlos Benítez (Cirujano Cardiovascular)',
    createdAt: 'Hoy 08:10 AM',
    priority: 'Urgencia_Vital',
    status: 'en_preparacion',
    items: [
      { name: 'Set de Válvulas Aórticas Transcatéter (TAVI)', quantity: 2, unit: 'Kits', urgent: true },
      { name: 'Fentanilo 0.05mg/ml Ampollas', quantity: 20, unit: 'Ampollas', urgent: true },
      { name: 'Factor VIII 1000 UI', quantity: 6, unit: 'Viales', urgent: false }
    ],
    totalEstimated: 32400.00,
    surgeryTime: 'Hoy 11:30 AM (Programada)'
  },
  {
    id: 'ord-102',
    orderCode: 'REQ-2026-COSM-014',
    hospital: 'Centro Oncológico Santa María',
    department: 'Hospital de Día Oncológico',
    doctorInCharge: 'Dra. Marcela Duarte (Oncóloga Médica)',
    createdAt: 'Hoy 07:30 AM',
    priority: 'Alta_Prioridad',
    status: 'despachado',
    items: [
      { name: 'Pembrolizumab 100mg/4ml', quantity: 12, unit: 'Frascos', urgent: true },
      { name: 'Meropenem Trihidrato 1g', quantity: 50, unit: 'Viales', urgent: false }
    ],
    totalEstimated: 23590.00
  },
  {
    id: 'ord-103',
    orderCode: 'REQ-2026-CCN-302',
    hospital: 'Clínica Cardioinfantil del Norte',
    department: 'UCI Pediátrica',
    doctorInCharge: 'Dr. Fernando Londoño',
    createdAt: 'Ayer 18:20 PM',
    priority: 'Normal',
    status: 'completado',
    items: [
      { name: 'Insulina Glargina 100 UI/ml', quantity: 50, unit: 'Viales', urgent: false },
      { name: 'Inmunoglobulina Humana 10g', quantity: 4, unit: 'Frascos', urgent: false }
    ],
    totalEstimated: 4325.00
  }
];
