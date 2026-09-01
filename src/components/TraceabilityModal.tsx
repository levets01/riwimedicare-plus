import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Thermometer,
  Clock,
  MapPin,
  UserCheck,
  FileCheck2,
  Boxes,
  Truck,
  Building,
  HeartPulse
} from 'lucide-react';
import { MedicalItem, TraceabilityStep } from '../types';

interface TraceabilityModalProps {
  item: MedicalItem | null;
  onClose: () => void;
}

export default function TraceabilityModal({ item, onClose }: TraceabilityModalProps) {
  if (!item) return null;

  const steps: TraceabilityStep[] = [
    {
      id: 'step-1',
      stepName: 'Síntesis Farmacéutica & Formulación Estéril',
      timestamp: '2026-06-10 06:30 UTC',
      location: `${item.manufacturer} - Laboratorio Planta A`,
      operator: 'Dra. Marianne Weber (Farmacovigilancia)',
      verificationHash: '0x8f9c1b4e239a44d18076e0129bcdef44',
      tempRecorded: 4.0,
      status: 'validado',
      details: `Lote ${item.batchNumber} sintetizado bajo norma BPM GMP-A1. Esterilización térmica y microfiltración 0.22µm completada.`
    },
    {
      id: 'step-2',
      stepName: 'Control de Calidad Fisicoquímico y Microbiológico',
      timestamp: '2026-06-12 14:15 UTC',
      location: 'Laboratorio Central de Análisis Cromatográfico',
      operator: 'Dr. Klaus Steiner (Control Calidad)',
      verificationHash: '0x3a4b910fcde891238477123901bcaefa',
      status: 'validado',
      details: 'Pureza activa: 99.84%. Endotoxinas bacterianas < 0.05 EU/ml. Ensayo de esterilidad conforme a Farmacopea Europea.'
    },
    {
      id: 'step-3',
      stepName: 'Empaque Primario, Sellado y Transpondedor RFID',
      timestamp: '2026-06-14 09:00 UTC',
      location: 'Línea de Envasado Robótico Estéril #3',
      operator: 'Ing. Roberto Paz',
      verificationHash: '0x99201bfd908234ea7781200192abce10',
      status: 'validado',
      details: `Asignación de etiqueta RFID ${item.rfidTag} con sensor de temperatura pasivo integrado.`
    },
    {
      id: 'step-4',
      stepName: 'Almacenamiento en Cámara Fría Automatizada',
      timestamp: '2026-06-15 11:30 UTC',
      location: `Riwi Hub Central - ${item.location}`,
      operator: 'Sistema Robótico ASRS & Sensores IoT',
      verificationHash: '0xaa1290bb34e127909012387129038bca',
      tempRecorded: item.currentTemp || 4.2,
      status: 'validado',
      details: `Monitoreo continuo en rango ${item.targetTemp}. Cero excursiones térmicas registradas durante 45 días continuos.`
    },
    {
      id: 'step-5',
      stepName: 'Despacho y Cadena de Custodia en Tránsito',
      timestamp: 'Hoy 08:30 UTC',
      location: 'Vehículo Móvil Refrigerado MED-749',
      operator: 'Javier Restrepo (Conductor GxP Certificado)',
      verificationHash: '0xee9100129bcfa8819023419087ea7112',
      tempRecorded: 4.1,
      status: 'validado',
      details: 'Sellado electrónico #48991 validado. Telemetría GPS y sensor de temperatura transmitiendo cada 10 segundos.'
    }
  ];

  return (
    <AnimatePresence>
      <div
        id="traceability-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1b1d]/40 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#e4e2e4] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#e4e2e4] bg-[#fcf8fb] flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#0058bc] text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#1b1b1d]">
                    Trazabilidad Inmutable del Lote
                  </h3>
                  <span className="px-2 py-0.5 bg-[#006b27]/10 text-[#006b27] text-[10px] font-bold rounded-md border border-[#006b27]/20">
                    GxP AUDITADO
                  </span>
                </div>
                <p className="text-xs text-[#717786]">
                  {item.name} • {item.batchNumber} • Tag: {item.rfidTag}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#717786] hover:text-[#1b1b1d] rounded-lg hover:bg-[#eae7ea] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="px-6 py-3 bg-[#f6f3f5] border-b border-[#e4e2e4] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="text-[#717786] block text-[10px]">Fabricante:</span>
              <span className="font-semibold text-[#1b1b1d] truncate">{item.manufacturer}</span>
            </div>
            <div>
              <span className="text-[#717786] block text-[10px]">Código ATC:</span>
              <span className="font-mono font-bold text-[#0058bc]">{item.atcCode}</span>
            </div>
            <div>
              <span className="text-[#717786] block text-[10px]">Condición Térmica:</span>
              <span className="font-semibold text-[#1b1b1d] flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-[#0058bc]" />
                {item.targetTemp.split(' ')[0]}
              </span>
            </div>
            <div>
              <span className="text-[#717786] block text-[10px]">Caducidad:</span>
              <span className="font-semibold text-[#006b27]">{item.expiryDate}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#0058bc]/20">
              {steps.map((step, idx) => (
                <div key={step.id} className="relative group">
                  {/* Timeline Node Point */}
                  <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-[#0058bc] flex items-center justify-center shadow-xs">
                    <div className="w-2 h-2 rounded-full bg-[#0058bc]"></div>
                  </div>

                  <div className="p-4 bg-white border border-[#e4e2e4] rounded-xl hover:border-[#0058bc]/40 hover:shadow-xs transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#0058bc]/10 text-[#0058bc] rounded">
                          FASE {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-[#1b1b1d]">{step.stepName}</h4>
                      </div>
                      <span className="text-[11px] text-[#717786] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {step.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-[#414755] mb-3 leading-relaxed">
                      {step.details}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#f0edef] text-[11px] text-[#717786]">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#0058bc] shrink-0" />
                        <span className="truncate">{step.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <UserCheck className="w-3.5 h-3.5 text-[#006b27] shrink-0" />
                        <span className="truncate">{step.operator}</span>
                      </div>
                      {step.tempRecorded !== undefined && (
                        <div className="flex items-center gap-1.5 font-semibold text-[#0058bc]">
                          <Thermometer className="w-3.5 h-3.5 shrink-0" />
                          <span>Temp: {step.tempRecorded}°C</span>
                        </div>
                      )}
                    </div>

                    {/* Cryptographic Hash */}
                    <div className="mt-2.5 pt-2 border-t border-dashed border-[#e4e2e4] flex items-center justify-between text-[10px] text-[#717786] font-mono">
                      <span>Firma Electrónica: {step.verificationHash}</span>
                      <span className="text-[#006b27] font-sans font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verificado
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#e4e2e4] bg-[#fcf8fb] flex items-center justify-between">
            <span className="text-xs text-[#717786] flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-[#0058bc]" /> Certificado de Autenticidad Farmacéutica Emitido
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#0058bc] hover:bg-[#00489c] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Cerrar Auditoría
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
