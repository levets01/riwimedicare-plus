import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Lock, Award, CheckCircle2 } from 'lucide-react';

interface TermsAndPrivacyModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export default function TermsAndPrivacyModal({ isOpen, type, onClose }: TermsAndPrivacyModalProps) {
  if (!isOpen || !type) return null;

  return (
    <AnimatePresence>
      <div
        id="terms-privacy-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1b1d]/40 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-[#ffffff] rounded-2xl shadow-2xl border border-[#e4e2e4] overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#e4e2e4] flex items-center justify-between bg-[#fcf8fb]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0058bc]/10 text-[#0058bc] flex items-center justify-center">
                {type === 'terms' ? <FileText className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1b1b1d]">
                  {type === 'terms' ? 'Términos de Servicio RiwiMediCare Plus' : 'Política de Privacidad y Seguridad GxP'}
                </h3>
                <p className="text-xs text-[#414755]">
                  Normativa de Trazabilidad Farmacéutica y Gestión Hospitalaria v4.2
                </p>
              </div>
            </div>
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-[#717786] hover:text-[#1b1b1d] hover:bg-[#eae7ea] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#414755] leading-relaxed">
            {type === 'terms' ? (
              <>
                <div className="p-3.5 bg-[#0058bc]/5 border border-[#0058bc]/20 rounded-xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#0058bc] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#0058bc] font-medium leading-normal">
                    Este software está homologado bajo estándares internacionales FDA 21 CFR Part 11 para registros y firmas electrónicas en el sector salud.
                  </p>
                </div>

                <section className="space-y-1.5">
                  <h4 className="font-semibold text-[#1b1b1d] text-base">1. Ámbito de Aplicación y Uso Autorizado</h4>
                  <p>
                    RiwiMediCare Plus es una plataforma de precisión diseñada exclusivamente para instituciones de salud, farmacias hospitalarias, operadores logísticos con certificación de cadena de frío y personal médico acreditado.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-semibold text-[#1b1b1d] text-base">2. Cadena de Custodia y Trazabilidad de Lotes</h4>
                  <p>
                    Toda transacción, despacho, recepción o ajuste de inventario queda registrado de forma inmutable mediante firmas digitales y sellos de tiempo criptográficos. Cualquier alteración manual no autorizada será reportada a la gerencia de calidad.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-semibold text-[#1b1b1d] text-base">3. Monitoreo de Temperatura y Excursiones Térmicas</h4>
                  <p>
                    Las alertas IoT generadas por el sistema respecto a medicamentos termolábiles (2°C-8°C / -20°C) conllevan el aislamiento preventivo del lote en cuarentena hasta la validación formal del farmacéutico responsable.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-semibold text-[#1b1b1d] text-base">4. Responsabilidad Médica y Despachos Quirúrgicos</h4>
                  <p>
                    Los despachos clasificados como Urgencia Vital tendrán prioridad automatizada en el hub de distribución y asignación de vehículos con telemetría en tiempo real.
                  </p>
                </section>
              </>
            ) : (
              <>
                <div className="p-3.5 bg-[#006b27]/5 border border-[#006b27]/20 rounded-xl flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#006b27] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#006b27] font-medium leading-normal">
                    Cumplimiento integral con regulaciones de protección de datos clínicos (HIPAA, GDPR Salud y normativas nacionales de farmacovigilancia).
                  </p>
                </div>

                <section className="space-y-1.5">
                  <h4 className="font-semibold text-[#1b1b1d] text-base">1. Tratamiento de Datos Clínicos y de Trazabilidad</h4>
                  <p>
                    Los datos de pacientes vinculados a lotes de implantes o medicamentos de uso compasivo se encuentran anonimizados mediante tokenización de grado bancario (AES-256).
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-semibold text-[#1b1b1d] text-base">2. Registros de Auditoría y Acceso por Roles (RBAC)</h4>
                  <p>
                    El acceso a la información se encuentra estrictamente segmentado según el rol operativo: Farmacéutico Jefe, Coordinador Logístico, Auditor de Calidad o Personal de Quirófano.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-semibold text-[#1b1b1d] text-base">3. Retención de Registros Farmacéuticos</h4>
                  <p>
                    Los historiales de temperatura, calibración de sensores y recepciones hospitalarias se preservan durante 10 años conforme a las Buenas Prácticas de Manufactura y Almacenamiento (BPM/BPA).
                  </p>
                </section>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#e4e2e4] bg-[#fcf8fb] flex items-center justify-between">
            <span className="text-xs text-[#717786] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#006b27]" /> Certificación ISO 13485 & GDP
            </span>
            <button
              id="accept-terms-btn"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium bg-[#0058bc] hover:bg-[#00489c] text-white rounded-lg transition-colors cursor-pointer"
            >
              Comprendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
