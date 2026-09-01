import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Truck,
  MapPin,
  Clock,
  ThermometerSnowflake,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  FileSignature,
  Plus,
  UserCheck,
  Boxes,
  AlertCircle
} from 'lucide-react';
import { MedicalShipment } from '../types';

interface ShipmentsScreenProps {
  shipments: MedicalShipment[];
  onSignDelivery: (shipmentId: string) => void;
  onCreateShipment: (newShipment: MedicalShipment) => void;
}

export default function ShipmentsScreen({
  shipments,
  onSignDelivery,
  onCreateShipment
}: ShipmentsScreenProps) {
  const [selectedShipment, setSelectedShipment] = useState<MedicalShipment>(shipments[0]);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [signName, setSignName] = useState('Dr. Mateo Alarcón');
  const [signNotes, setSignNotes] = useState('Recepción conforme en Quirófano Central');

  const handleConfirmSignature = (e: React.FormEvent) => {
    e.preventDefault();
    onSignDelivery(selectedShipment.id);
    setIsSignModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1b1b1d] tracking-tight">
            Envíos y Cadena de Custodia en Tránsito
          </h2>
          <p className="text-xs sm:text-sm text-[#717786]">
            Monitoreo satelital GPS, vehículos refrigerados con telemetría dual y entrega certificada
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipments List */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#717786] px-1">
            Despachos Hospitalarios ({shipments.length})
          </div>

          {shipments.map((shipment) => {
            const isSelected = shipment.id === selectedShipment?.id;

            return (
              <div
                key={shipment.id}
                onClick={() => setSelectedShipment(shipment)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#0058bc] bg-[#0058bc]/5 shadow-xs ring-1 ring-[#0058bc]'
                    : 'border-[#e4e2e4] bg-white hover:border-[#0058bc]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-[#0058bc]">
                    {shipment.trackingNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      shipment.priority === 'Urgencia_Vital'
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : 'bg-[#d8e2ff] text-[#004493]'
                    }`}
                  >
                    {shipment.priority.replace('_', ' ')}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#1b1b1d] truncate">{shipment.destination}</h4>
                <p className="text-[11px] text-[#717786]">{shipment.recipientDepartment}</p>

                <div className="mt-3 pt-2 border-t border-[#f0edef] flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#006b27] flex items-center gap-1">
                    <ThermometerSnowflake className="w-3.5 h-3.5" /> {shipment.currentTemp}°C
                  </span>
                  <span className="text-[#717786] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {shipment.eta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shipment Details & Telemetry Route HUD */}
        {selectedShipment && (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e4e2e4] p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e4e2e4]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#0058bc]">
                    {selectedShipment.trackingNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedShipment.status === 'entregado'
                        ? 'bg-[#006b27]/10 text-[#006b27]'
                        : 'bg-[#0058bc]/10 text-[#0058bc]'
                    }`}
                  >
                    {selectedShipment.status === 'entregado' ? 'Entregado & Validado' : 'En Tránsito Refrigerado'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1b1b1d] mt-1">{selectedShipment.destination}</h3>
                <p className="text-xs text-[#717786]">{selectedShipment.recipientDepartment}</p>
              </div>

              {selectedShipment.status !== 'entregado' && (
                <button
                  onClick={() => setIsSignModalOpen(true)}
                  className="px-4 py-2.5 bg-[#0058bc] hover:bg-[#00489c] text-white text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <FileSignature className="w-4 h-4" />
                  <span>Firmar Recepción Hospitalaria</span>
                </button>
              )}
            </div>

            {/* Visual Simulated GPS Route Card */}
            <div className="relative h-48 bg-[#1e293b] rounded-2xl overflow-hidden p-4 text-white flex flex-col justify-between border border-slate-700">
              {/* Grid Background Effect */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Simulated Route Line */}
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-600 rounded">
                <div className="h-full bg-[#0070eb] w-3/4 relative">
                  <div className="absolute right-0 -top-2 w-5 h-5 rounded-full bg-white border-2 border-[#0058bc] flex items-center justify-center shadow-md animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-[#0058bc]"></div>
                  </div>
                </div>
              </div>

              {/* Map overlay tags */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Origen: {selectedShipment.origin}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  <Navigation className="w-3.5 h-3.5 text-[#72fe88]" />
                  <span>Destino: {selectedShipment.destination}</span>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs pt-2">
                <div className="bg-black/60 backdrop-blur-xs px-3 py-1 rounded-lg text-slate-300">
                  Vehículo: <strong className="text-white">{selectedShipment.vehiclePlate}</strong>
                </div>
                <div className="bg-black/60 backdrop-blur-xs px-3 py-1 rounded-lg text-emerald-300 font-mono font-bold">
                  Temp Cámara: {selectedShipment.currentTemp}°C
                </div>
              </div>
            </div>

            {/* Items inside this shipment */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#717786] mb-3">
                Medicamentos e Insumos en Este Despacho
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedShipment.items.map((it, idx) => (
                  <div key={idx} className="p-3.5 bg-[#fcf8fb] border border-[#e4e2e4] rounded-xl">
                    <div className="text-xs font-bold text-[#1b1b1d]">{it.name}</div>
                    <div className="text-[11px] font-mono text-[#0058bc] mt-0.5">{it.batchNumber}</div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-[#717786]">
                      <span>Cantidad: {it.quantity} unidades</span>
                      <span className="font-semibold text-[#006b27]">{it.tempRequirement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custody Chain Log */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#717786] mb-3">
                Registro de Cadena de Custodia GxP
              </h4>
              <div className="space-y-2">
                {selectedShipment.custodyChain.map((c, i) => (
                  <div key={i} className="p-3 bg-[#f6f3f5] rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-[#1b1b1d]">{c.stage}</div>
                      <div className="text-[11px] text-[#717786]">{c.responsible} • {c.notes}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[11px] font-semibold text-[#0058bc]">{c.timestamp}</div>
                      <div className="text-[10px] text-[#006b27]">Temp: {c.tempSnapshot}°C</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Signature Modal */}
      <AnimatePresence>
        {isSignModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1b1d]/40 backdrop-blur-xs"
            onClick={() => setIsSignModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e4e2e4]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0058bc]/10 text-[#0058bc] flex items-center justify-center">
                  <FileSignature className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1b1b1d]">Firma de Entrega Hospitalaria</h3>
                  <p className="text-xs text-[#717786]">Certificación de recepción y cierre de cadena de frío</p>
                </div>
              </div>

              <form onSubmit={handleConfirmSignature} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-[#414755] mb-1">Nombre del Profesional Receptor</label>
                  <input
                    type="text"
                    required
                    value={signName}
                    onChange={(e) => setSignName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#414755] mb-1">Observaciones de Inspección</label>
                  <textarea
                    rows={3}
                    value={signNotes}
                    onChange={(e) => setSignNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg text-xs"
                  />
                </div>

                <div className="p-3 bg-[#006b27]/10 rounded-xl text-[11px] text-[#006b27] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Cadena de frío validada dentro del rango 2.0°C - 8.0°C sin excursión.</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSignModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#414755] hover:bg-[#eae7ea] rounded-lg cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold bg-[#0058bc] hover:bg-[#00489c] text-white rounded-lg cursor-pointer shadow-xs"
                  >
                    Firmar y Cerrar Custodia
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
