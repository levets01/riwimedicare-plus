import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  QrCode,
  Radio,
  Search,
  CheckCircle2,
  AlertTriangle,
  Thermometer,
  Calendar,
  Building2,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { MedicalItem } from '../types';

interface RfidScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MedicalItem[];
  onSelectItemForTraceability: (item: MedicalItem) => void;
}

export default function RfidScannerModal({
  isOpen,
  onClose,
  items,
  onSelectItemForTraceability
}: RfidScannerModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [scannedItem, setScannedItem] = useState<MedicalItem | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = (item: MedicalItem) => {
    setIsScanning(true);
    setScannedItem(null);
    setTimeout(() => {
      setIsScanning(false);
      setScannedItem(item);
    }, 500);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    const match = items.find(
      (i) =>
        i.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.rfidTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (match) {
      handleSimulateScan(match);
    }
  };

  return (
    <AnimatePresence>
      <div
        id="scanner-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1b1d]/40 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#e4e2e4] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#e4e2e4] flex items-center justify-between bg-[#fcf8fb]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0058bc]/10 text-[#0058bc] flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1b1b1d]">
                  Lector Óptico & Antena RFID UHF
                </h3>
                <p className="text-xs text-[#717786]">
                  Escaneo instantáneo de código Datamatrix GS1 y transpondedores médicos
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

          <div className="p-6 overflow-y-auto space-y-6">
            {/* Visual Scanner HUD Animation */}
            <div className="relative h-44 bg-[#1b1b1d] rounded-xl overflow-hidden flex flex-col items-center justify-center text-white border border-slate-700">
              {/* Scan Beam */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0070eb] to-transparent animate-pulse shadow-[0_0_15px_#0070eb]"></div>

              {/* Reticle Target */}
              <div className="relative w-28 h-28 border-2 border-dashed border-[#adc6ff]/60 rounded-xl flex items-center justify-center">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#0070eb]"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#0070eb]"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#0070eb]"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#0070eb]"></div>

                <Radio className={`w-8 h-8 text-[#adc6ff] ${isScanning ? 'animate-ping' : 'animate-pulse'}`} />
              </div>

              <div className="mt-3 text-xs font-mono text-[#adc6ff] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse"></span>
                {isScanning ? 'DECODIFICANDO TRANSPONDEDOR...' : 'SENSOR RFID ACTIVO (915 MHz)'}
              </div>
            </div>

            {/* Quick Demo Batch selector buttons */}
            <div>
              <div className="text-xs font-semibold text-[#414755] mb-2 flex items-center justify-between">
                <span>Simular Lectura de Lote Disponible:</span>
                <span className="text-[11px] text-[#717786]">Haga clic para escanear</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {items.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSimulateScan(item)}
                    className="p-2.5 bg-[#f6f3f5] hover:bg-[#0058bc]/10 hover:border-[#0058bc] border border-[#e4e2e4] rounded-lg text-left transition-all cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-[#1b1b1d] group-hover:text-[#0058bc] truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#717786] font-mono flex items-center justify-between mt-1">
                      <span>{item.batchNumber}</span>
                      <span className="text-[#0058bc] font-semibold">{item.rfidTag}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scanned Result Card */}
            {scannedItem && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-[#fcf8fb] border-2 border-[#0058bc]/30 rounded-xl space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 bg-[#0058bc] text-white text-[10px] font-bold rounded-md uppercase">
                      Lote Verificado GxP
                    </span>
                    <h4 className="text-base font-bold text-[#1b1b1d] mt-1.5">{scannedItem.name}</h4>
                    <p className="text-xs text-[#717786]">{scannedItem.genericName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-[#0058bc]">
                      {scannedItem.batchNumber}
                    </div>
                    <div className="text-[10px] text-[#717786]">{scannedItem.rfidTag}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#e4e2e4] text-xs">
                  <div className="p-2 bg-white rounded-lg border border-[#e4e2e4]">
                    <div className="text-[10px] text-[#717786]">Temperatura Req.</div>
                    <div className="font-semibold text-[#1b1b1d] flex items-center gap-1 mt-0.5">
                      <Thermometer className="w-3.5 h-3.5 text-[#0058bc]" />
                      {scannedItem.targetTemp.split(' ')[0]}
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#e4e2e4]">
                    <div className="text-[10px] text-[#717786]">Vencimiento</div>
                    <div className="font-semibold text-[#1b1b1d] flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#006b27]" />
                      {scannedItem.expiryDate}
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#e4e2e4]">
                    <div className="text-[10px] text-[#717786]">Stock Actual</div>
                    <div className="font-semibold text-[#1b1b1d] flex items-center gap-1 mt-0.5">
                      <Layers className="w-3.5 h-3.5 text-[#0058bc]" />
                      {scannedItem.stock} {scannedItem.unit}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      onSelectItemForTraceability(scannedItem);
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 bg-[#0058bc] hover:bg-[#00489c] text-white font-medium text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Ver Árbol de Trazabilidad Completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="px-6 py-3 border-t border-[#e4e2e4] bg-[#fcf8fb] flex items-center justify-between text-xs text-[#717786]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#006b27]" /> Validación Criptográfica Activa
            </span>
            <button onClick={onClose} className="px-4 py-1.5 bg-[#eae7ea] hover:bg-[#dcd9dc] rounded-lg font-medium text-[#1b1b1d] cursor-pointer">
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
