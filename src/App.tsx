import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import LoginScreen from './components/LoginScreen';
import HeaderNav, { ActiveTab } from './components/HeaderNav';
import DashboardScreen from './components/DashboardScreen';
import InventoryScreen from './components/InventoryScreen';
import ColdChainScreen from './components/ColdChainScreen';
import ShipmentsScreen from './components/ShipmentsScreen';
import HospitalOrdersScreen from './components/HospitalOrdersScreen';
import RfidScannerModal from './components/RfidScannerModal';
import TraceabilityModal from './components/TraceabilityModal';
import {
  INITIAL_ITEMS,
  INITIAL_SENSORS,
  INITIAL_SHIPMENTS,
  INITIAL_ORDERS,
  DEMO_USERS
} from './data/mockData';
import { MedicalItem, ColdChainSensor, MedicalShipment, HospitalOrder, User } from './types';

export default function App() {
  // Authentication & Screen state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginScreen, setShowLoginScreen] = useState(true);

  // Core Data State
  const [items, setItems] = useState<MedicalItem[]>(INITIAL_ITEMS);
  const [sensors, setSensors] = useState<ColdChainSensor[]>(INITIAL_SENSORS);
  const [shipments, setShipments] = useState<MedicalShipment[]>(INITIAL_SHIPMENTS);
  const [orders, setOrders] = useState<HospitalOrder[]>(INITIAL_ORDERS);

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedTraceItem, setSelectedTraceItem] = useState<MedicalItem | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'alert' } | null>(null);

  const triggerToast = (text: string, type: 'success' | 'alert' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowLoginScreen(false);
    triggerToast(`Sesión iniciada: ${user.name} (${user.roleTitle})`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLoginScreen(true);
  };

  // Cold Chain simulation triggers
  const handleSimulateExcursion = (sensorId: string) => {
    setSensors((prev) =>
      prev.map((s) => {
        if (s.id === sensorId) {
          return {
            ...s,
            currentTemp: 9.8,
            status: 'critico',
            history: [...s.history, { time: 'Ahora', temp: 9.8, humidity: 62 }]
          };
        }
        return s;
      })
    );
    triggerToast('¡ALERTA TÉRMICA! Excursión de temperatura detectada (>8°C) en sensor IoT.', 'alert');
  };

  const handleRestoreSensor = (sensorId: string) => {
    setSensors((prev) =>
      prev.map((s) => {
        if (s.id === sensorId) {
          return {
            ...s,
            currentTemp: 4.2,
            status: 'normal',
            history: [...s.history, { time: 'Ahora', temp: 4.2, humidity: 48 }]
          };
        }
        return s;
      })
    );
    triggerToast('Sensor restablecido a parámetros normales (2°C - 8°C).', 'success');
  };

  const handleSimulateGlobalAlert = () => {
    handleSimulateExcursion(sensors[0].id);
  };

  // Inventory actions
  const handleAddItem = (newItem: MedicalItem) => {
    setItems((prev) => [newItem, ...prev]);
    triggerToast(`Lote ${newItem.batchNumber} emitido con transpondedor ${newItem.rfidTag}`, 'success');
  };

  // Shipment delivery signature
  const handleSignDelivery = (shipmentId: string) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          return {
            ...s,
            status: 'entregado',
            eta: 'Entregado & Validado',
            custodyChain: [
              ...s.custodyChain,
              {
                timestamp: 'Ahora',
                stage: 'Recepción y Firma Electrónica Hospitalaria',
                responsible: currentUser?.name || 'Receptor Hospitalario',
                notes: 'Validación conforme FDA 21 CFR Part 11',
                tempSnapshot: s.currentTemp
              }
            ]
          };
        }
        return s;
      })
    );

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    triggerToast('Despacho recepcionado con éxito y firmado digitalmente.', 'success');
  };

  const handleCreateShipment = (newShipment: MedicalShipment) => {
    setShipments((prev) => [newShipment, ...prev]);
    triggerToast(`Despacho ${newShipment.trackingNumber} generado con ruta GPS activa.`, 'success');
  };

  // Hospital Order actions
  const handleApproveOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'despachado'
          };
        }
        return o;
      })
    );

    // Also create matching shipment
    const ord = orders.find((o) => o.id === orderId);
    if (ord) {
      const newShip: MedicalShipment = {
        id: `ship-${Date.now()}`,
        trackingNumber: `RWM-ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        destination: ord.hospital,
        origin: 'Hub Central RiwiMediCare',
        recipientDepartment: ord.department,
        priority: ord.priority,
        status: 'en_transito',
        driver: 'Conductor GxP Asignado',
        vehiclePlate: 'MED-550 (ThermoKing)',
        currentTemp: 4.1,
        tempAlert: false,
        eta: '30 mins',
        dispatchTime: 'Ahora',
        items: ord.items.map((it) => ({
          itemId: 'med-auto',
          name: it.name,
          batchNumber: 'LOT-AUTO-2026',
          quantity: it.quantity,
          tempRequirement: '2°C a 8°C'
        })),
        custodyChain: [
          {
            timestamp: 'Ahora',
            stage: 'Despacho Rápido Hospitalario Aprobado',
            responsible: currentUser?.name || 'Farmacia Central',
            notes: 'Aprobación médica formal',
            tempSnapshot: 4.1
          }
        ]
      };
      setShipments((prev) => [newShip, ...prev]);
    }

    triggerToast('Orden hospitalaria aprobada. Vehículo refrigerado en camino.', 'success');
  };

  const handleCreateOrder = (newOrder: HospitalOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    triggerToast(`Requisición ${newOrder.orderCode} registrada.`, 'success');
  };

  const activeAlertCount = sensors.filter((s) => s.status !== 'normal').length;

  return (
    <div className="min-h-screen bg-[#fcf8fb] text-[#1b1b1d] font-sans antialiased selection:bg-[#0058bc]/20 selection:text-[#0058bc]">
      {/* If showLoginScreen is true, render the exact 1:1 Login Screen from screenshot */}
      {showLoginScreen ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        /* Authenticated Main App Workflow */
        <div className="min-h-screen flex flex-col">
          {/* Header Navigation */}
          <HeaderNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenScanner={() => setIsScannerOpen(true)}
            onGoToLoginScreen={() => setShowLoginScreen(true)}
            alertCount={activeAlertCount}
          />

          {/* Main Workspace Body */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {activeTab === 'dashboard' && (
              <DashboardScreen
                items={items}
                sensors={sensors}
                shipments={shipments}
                orders={orders}
                onNavigate={setActiveTab}
                onOpenScanner={() => setIsScannerOpen(true)}
                onSelectLotTraceability={(item) => setSelectedTraceItem(item)}
                onSimulateTempAlert={handleSimulateGlobalAlert}
              />
            )}

            {activeTab === 'inventory' && (
              <InventoryScreen
                items={items}
                onSelectItemForTraceability={(item) => setSelectedTraceItem(item)}
                onAddItem={handleAddItem}
                onOpenScanner={() => setIsScannerOpen(true)}
              />
            )}

            {activeTab === 'coldchain' && (
              <ColdChainScreen
                sensors={sensors}
                onSimulateExcursion={handleSimulateExcursion}
                onRestoreSensor={handleRestoreSensor}
              />
            )}

            {activeTab === 'shipments' && (
              <ShipmentsScreen
                shipments={shipments}
                onSignDelivery={handleSignDelivery}
                onCreateShipment={handleCreateShipment}
              />
            )}

            {activeTab === 'orders' && (
              <HospitalOrdersScreen
                orders={orders}
                onApproveOrder={handleApproveOrder}
                onCreateOrder={handleCreateOrder}
              />
            )}
          </main>
        </div>
      )}

      {/* Global RFID Scanner Modal */}
      <RfidScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        items={items}
        onSelectItemForTraceability={(item) => setSelectedTraceItem(item)}
      />

      {/* Global Traceability Modal */}
      <TraceabilityModal
        item={selectedTraceItem}
        onClose={() => setSelectedTraceItem(null)}
      />

      {/* Floating System Toast */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
            toastMessage.type === 'alert'
              ? 'bg-[#ba1a1a] text-white'
              : 'bg-[#1b1b1d] text-white border border-[#414755]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              toastMessage.type === 'alert' ? 'bg-white animate-ping' : 'bg-[#72fe88]'
            }`}
          ></span>
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
