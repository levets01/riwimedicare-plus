import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  HeartPulse,
  Truck
} from 'lucide-react';
import { HospitalOrder } from '../types';

interface HospitalOrdersScreenProps {
  orders: HospitalOrder[];
  onApproveOrder: (orderId: string) => void;
  onCreateOrder: (newOrder: HospitalOrder) => void;
}

export default function HospitalOrdersScreen({
  orders,
  onApproveOrder,
  onCreateOrder
}: HospitalOrdersScreenProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [hospital, setHospital] = useState('Hospital Universitario San Rafael');
  const [department, setDepartment] = useState('Quirófano 1 - Trasplantes');
  const [doctor, setDoctor] = useState('Dra. María Belén Gómez');
  const [priority, setPriority] = useState<'Urgencia_Vital' | 'Alta_Prioridad' | 'Normal'>('Urgencia_Vital');
  const [itemName, setItemName] = useState('Pembrolizumab 100mg/4ml');
  const [itemQty, setItemQty] = useState(6);

  const handleCreateOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrd: HospitalOrder = {
      id: `ord-${Date.now()}`,
      orderCode: `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      hospital,
      department,
      doctorInCharge: doctor,
      createdAt: 'Hace un momento',
      priority,
      status: 'en_preparacion',
      items: [{ name: itemName, quantity: Number(itemQty), unit: 'Unidades', urgent: priority === 'Urgencia_Vital' }],
      totalEstimated: 11340.0,
      surgeryTime: priority === 'Urgencia_Vital' ? 'Hoy 13:00 PM (Emergencia)' : undefined
    };

    onCreateOrder(newOrd);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1b1b1d] tracking-tight">
            Órdenes y Requisiciones Hospitalarias
          </h2>
          <p className="text-xs sm:text-sm text-[#717786]">
            Despachos para cirugía mayor, unidades de cuidados intensivos y farmacias clínicas
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 bg-[#0058bc] hover:bg-[#00489c] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Requisición Médica</span>
        </button>
      </div>

      {/* Orders Grid */}
      <div className="space-y-4">
        {orders.map((order) => {
          const isUrgent = order.priority === 'Urgencia_Vital';

          return (
            <div
              key={order.id}
              className={`p-5 bg-white rounded-2xl border transition-all ${
                isUrgent ? 'border-[#ba1a1a]/30 shadow-xs' : 'border-[#e4e2e4]'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#f0edef]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0058bc]">{order.orderCode}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.priority === 'Urgencia_Vital'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : order.priority === 'Alta_Prioridad'
                          ? 'bg-[#ffe8b3] text-[#7a4f00]'
                          : 'bg-[#d8e2ff] text-[#004493]'
                      }`}
                    >
                      {order.priority.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-[#717786]">{order.createdAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1b1b1d]">{order.hospital}</h3>
                  <p className="text-xs text-[#717786]">
                    {order.department} • Solicitante: <strong>{order.doctorInCharge}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {order.status === 'en_preparacion' ? (
                    <button
                      onClick={() => onApproveOrder(order.id)}
                      className="px-4 py-2 bg-[#006b27] hover:bg-[#00531c] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Aprobar & Despachar Frío</span>
                    </button>
                  ) : order.status === 'despachado' ? (
                    <span className="px-3 py-1.5 bg-[#0058bc]/10 text-[#0058bc] text-xs font-semibold rounded-xl flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> En Ruta Refrigerada
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 bg-[#006b27]/10 text-[#006b27] text-xs font-semibold rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Entregado en Quirófano
                    </span>
                  )}
                </div>
              </div>

              {/* Items in order */}
              <div className="pt-3">
                <div className="text-[11px] font-bold text-[#717786] uppercase tracking-wider mb-2">
                  Ítems Solicitados:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="p-2.5 bg-[#fcf8fb] border border-[#e4e2e4] rounded-lg text-xs flex items-center justify-between">
                      <span className="font-semibold text-[#1b1b1d] truncate">{item.name}</span>
                      <span className="text-[#0058bc] font-bold ml-2 shrink-0">{item.quantity} {item.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Order Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1b1d]/40 backdrop-blur-xs"
            onClick={() => setIsCreateModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e4e2e4]"
            >
              <h3 className="text-lg font-bold text-[#1b1b1d] mb-1">Nueva Requisición Hospitalaria</h3>
              <p className="text-xs text-[#717786] mb-4">Emisión de pedido urgente con asignación de lote GxP</p>

              <form onSubmit={handleCreateOrderSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-[#414755] mb-1">Centro Hospitalario</label>
                  <input
                    type="text"
                    required
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#414755] mb-1">Servicio / Quirófano</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#414755] mb-1">Médico Responsable</label>
                  <input
                    type="text"
                    required
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#414755] mb-1">Prioridad</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg"
                    >
                      <option value="Urgencia_Vital">Urgencia Vital</option>
                      <option value="Alta_Prioridad">Alta Prioridad</option>
                      <option value="Normal">Programada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#414755] mb-1">Cantidad</label>
                    <input
                      type="number"
                      value={itemQty}
                      onChange={(e) => setItemQty(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#414755] mb-1">Medicamento / Insumo</label>
                  <input
                    type="text"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#e4e2e4]">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#414755] hover:bg-[#eae7ea] rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold bg-[#0058bc] hover:bg-[#00489c] text-white rounded-lg shadow-xs"
                  >
                    Emitir Requisición
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
