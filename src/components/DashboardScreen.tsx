import React from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Boxes,
  ThermometerSnowflake,
  Truck,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  RefreshCw,
  Plus
} from 'lucide-react';
import { MedicalItem, ColdChainSensor, MedicalShipment, HospitalOrder } from '../types';

interface DashboardScreenProps {
  items: MedicalItem[];
  sensors: ColdChainSensor[];
  shipments: MedicalShipment[];
  orders: HospitalOrder[];
  onNavigate: (tab: any) => void;
  onOpenScanner: () => void;
  onSelectLotTraceability: (item: MedicalItem) => void;
  onSimulateTempAlert: () => void;
}

export default function DashboardScreen({
  items,
  sensors,
  shipments,
  orders,
  onNavigate,
  onOpenScanner,
  onSelectLotTraceability,
  onSimulateTempAlert
}: DashboardScreenProps) {
  const totalStock = items.reduce((acc, item) => acc + item.stock, 0);
  const lowStockCount = items.filter((i) => i.status === 'stock_bajo' || i.stock <= i.minStock).length;
  const activeShipments = shipments.filter((s) => s.status === 'en_transito');
  const alertSensors = sensors.filter((s) => s.status !== 'normal');
  const urgentOrders = orders.filter((o) => o.priority === 'Urgencia_Vital' && o.status !== 'completado');

  return (
    <div className="space-y-6">
      {/* Top Banner / System Health Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0058bc] to-[#0070eb] rounded-2xl text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#72fe88] animate-pulse"></span>
            Centro de Distribución Hospitalaria Operativo
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Control de Precisión y Trazabilidad Farmacéutica
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
            Monitoreo en tiempo real de 1,482 lotes clínicos, 14 rutas con cadena de frío continua (2°C-8°C) y suministros prioritarios para quirófano.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto shrink-0">
          <button
            id="dash-scanner-btn"
            onClick={onOpenScanner}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-[#0058bc] hover:bg-blue-50 font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Escanear Lote RFID</span>
          </button>
          <button
            id="dash-simulate-temp-btn"
            onClick={onSimulateTempAlert}
            className="px-3.5 py-2.5 bg-white/15 hover:bg-white/25 text-white text-xs font-medium rounded-xl border border-white/25 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Simular fluctuación en sensor IoT"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Simular IoT</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 bg-white rounded-2xl border border-[#e4e2e4] hover:border-[#0058bc]/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#717786]">Lotes en Custodia</span>
            <div className="w-9 h-9 rounded-xl bg-[#0058bc]/10 text-[#0058bc] flex items-center justify-center">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1b1b1d] tracking-tight">
            {totalStock.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-[#006b27] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verificados
            </span>
            <button
              onClick={() => onNavigate('inventory')}
              className="text-[#0058bc] hover:underline font-semibold text-[11px] cursor-pointer"
            >
              Ver inventario
            </button>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 bg-white rounded-2xl border border-[#e4e2e4] hover:border-[#0058bc]/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#717786]">Cadena de Frío IoT</span>
            <div className="w-9 h-9 rounded-xl bg-[#006b27]/10 text-[#006b27] flex items-center justify-center">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1b1b1d] tracking-tight flex items-baseline gap-1.5">
            <span>99.8%</span>
            <span className="text-xs font-normal text-[#717786]">en rango</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className={alertSensors.length > 0 ? 'text-[#ba1a1a] font-semibold' : 'text-[#717786]'}>
              {alertSensors.length > 0 ? `${alertSensors.length} Excursión Térmica` : '4 Sensores Estables'}
            </span>
            <button
              onClick={() => onNavigate('coldchain')}
              className="text-[#0058bc] hover:underline font-semibold text-[11px] cursor-pointer"
            >
              Ver telemetría
            </button>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 bg-white rounded-2xl border border-[#e4e2e4] hover:border-[#0058bc]/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#717786]">Envíos en Tránsito</span>
            <div className="w-9 h-9 rounded-xl bg-[#0070eb]/10 text-[#0070eb] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1b1b1d] tracking-tight">
            {activeShipments.length}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-[#0058bc] font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> GPS Activo
            </span>
            <button
              onClick={() => onNavigate('shipments')}
              className="text-[#0058bc] hover:underline font-semibold text-[11px] cursor-pointer"
            >
              Monitorear
            </button>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 bg-white rounded-2xl border border-[#e4e2e4] hover:border-[#0058bc]/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#717786]">Alertas Quirófano</span>
            <div className="w-9 h-9 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1b1b1d] tracking-tight">
            {urgentOrders.length + lowStockCount}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-[#ba1a1a] font-semibold">
              {urgentOrders.length} Urgencias Vitales
            </span>
            <button
              onClick={() => onNavigate('orders')}
              className="text-[#0058bc] hover:underline font-semibold text-[11px] cursor-pointer"
            >
              Revisar órdenes
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Live Cold-Chain & Urgent Shipments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Shipments Live Card */}
          <div className="bg-white rounded-2xl border border-[#e4e2e4] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#1b1b1d]">
                  Rutas y Despachos Refrigerados Activos
                </h3>
                <p className="text-xs text-[#717786]">
                  Monitoreo de temperatura y cadena de custodia en carretera
                </p>
              </div>
              <button
                onClick={() => onNavigate('shipments')}
                className="text-xs font-semibold text-[#0058bc] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Ver todos ({shipments.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {shipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="p-4 bg-[#fcf8fb] hover:bg-[#f6f3f5] rounded-xl border border-[#e4e2e4] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#0058bc]">
                        {shipment.trackingNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          shipment.priority === 'Urgencia_Vital'
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : shipment.priority === 'Alta_Prioridad'
                            ? 'bg-[#ffe8b3] text-[#7a4f00]'
                            : 'bg-[#d8e2ff] text-[#004493]'
                        }`}
                      >
                        {shipment.priority.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-medium text-[#717786]">
                        {shipment.status === 'en_transito' ? '🚚 En Ruta' : '📦 Preparando'}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-[#1b1b1d]">
                      {shipment.destination}
                    </div>
                    <div className="text-xs text-[#717786]">
                      {shipment.recipientDepartment} • Conductor: {shipment.driver.split(' ')[0]} ({shipment.vehiclePlate.split(' ')[0]})
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-[#e4e2e4]">
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <ThermometerSnowflake className="w-4 h-4 text-[#0058bc]" />
                      <span className={shipment.tempAlert ? 'text-[#ba1a1a]' : 'text-[#006b27]'}>
                        {shipment.currentTemp}°C
                      </span>
                    </div>
                    <div className="text-[11px] text-[#717786] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>ETA: {shipment.eta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Lots Radar */}
          <div className="bg-white rounded-2xl border border-[#e4e2e4] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#1b1b1d]">
                  Medicamentos de Alta Vigilancia & Biológicos
                </h3>
                <p className="text-xs text-[#717786]">
                  Lotes con requerimiento estricto de temperatura 2°C-8°C o stock mínimo
                </p>
              </div>
              <button
                onClick={() => onNavigate('inventory')}
                className="text-xs font-semibold text-[#0058bc] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Catálogo Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-[#e4e2e4] bg-[#fcf8fb] flex flex-col justify-between hover:border-[#0058bc]/50 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#0058bc]/10 text-[#0058bc] rounded font-mono">
                        {item.batchNumber}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          item.status === 'optimo'
                            ? 'bg-[#006b27]/10 text-[#006b27]'
                            : item.status === 'stock_bajo'
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : 'bg-[#ffe8b3] text-[#7a4f00]'
                        }`}
                      >
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#1b1b1d] group-hover:text-[#0058bc] transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#717786] line-clamp-1">
                      {item.location}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#e4e2e4] flex items-center justify-between text-xs">
                    <span className="text-[#414755] font-semibold">
                      Stock: {item.stock} {item.unit.split(' ')[0]}
                    </span>
                    <button
                      onClick={() => onSelectLotTraceability(item)}
                      className="text-[11px] font-semibold text-[#0058bc] hover:underline cursor-pointer"
                    >
                      Trazabilidad →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: IoT Sensor Stream & Quick Actions */}
        <div className="space-y-6">
          {/* IoT Live Sensors */}
          <div className="bg-white rounded-2xl border border-[#e4e2e4] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#006b27] animate-ping"></div>
                <h3 className="text-base font-bold text-[#1b1b1d]">Sensores IoT en Vivo</h3>
              </div>
              <span className="text-[10px] font-mono text-[#717786]">915 MHz LoraWAN</span>
            </div>

            <div className="space-y-3">
              {sensors.map((sensor) => (
                <div
                  key={sensor.id}
                  className={`p-3 rounded-xl border transition-all ${
                    sensor.status === 'critico'
                      ? 'bg-[#ffdad6]/40 border-[#ba1a1a]'
                      : sensor.status === 'alerta'
                      ? 'bg-[#ffe8b3]/30 border-[#ffb74d]'
                      : 'bg-[#fcf8fb] border-[#e4e2e4]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1b1b1d] truncate max-w-[170px]">
                      {sensor.name}
                    </span>
                    <span
                      className={`text-xs font-bold font-mono ${
                        sensor.status !== 'normal' ? 'text-[#ba1a1a]' : 'text-[#0058bc]'
                      }`}
                    >
                      {sensor.currentTemp > 0 ? `+${sensor.currentTemp}` : sensor.currentTemp}°C
                    </span>
                  </div>
                  <div className="text-[11px] text-[#717786] truncate">
                    {sensor.location}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-[#717786]">
                    <span>Rango: {sensor.minAllowed}°C a {sensor.maxAllowed}°C</span>
                    <span>Bat: {sensor.battery}%</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('coldchain')}
              className="w-full mt-4 py-2 bg-[#f0edef] hover:bg-[#e4e2e4] text-[#1b1b1d] text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ThermometerSnowflake className="w-3.5 h-3.5 text-[#0058bc]" />
              <span>Ver Gráficas y Calibración</span>
            </button>
          </div>

          {/* Quick Regulatory Note */}
          <div className="p-4 bg-[#f6f3f5] rounded-2xl border border-[#e4e2e4] text-xs text-[#414755] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#1b1b1d]">
              <ShieldCheck className="w-4 h-4 text-[#0058bc]" />
              <span>Normativa Sanitaria GxP Activa</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#717786]">
              Todos los registros de temperatura, movimientos de lote y recepciones hospitalarias se firman electrónicamente conforme a la directiva FDA 21 CFR Part 11.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
