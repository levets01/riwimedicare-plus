import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Plus,
  Boxes,
  Thermometer,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Building2,
  Layers,
  ArrowUpDown,
  Tag,
  Sparkles
} from 'lucide-react';
import { MedicalItem, StorageCondition } from '../types';

interface InventoryScreenProps {
  items: MedicalItem[];
  onSelectItemForTraceability: (item: MedicalItem) => void;
  onAddItem: (newItem: MedicalItem) => void;
  onOpenScanner: () => void;
}

export default function InventoryScreen({
  items,
  onSelectItemForTraceability,
  onAddItem,
  onOpenScanner
}: InventoryScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedStorage, setSelectedStorage] = useState<string>('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Item form state
  const [formName, setFormName] = useState('');
  const [formGeneric, setFormGeneric] = useState('');
  const [formAtc, setFormAtc] = useState('');
  const [formCategory, setFormCategory] = useState<MedicalItem['category']>('Oncología');
  const [formStock, setFormStock] = useState(100);
  const [formMinStock, setFormMinStock] = useState(30);
  const [formUnit, setFormUnit] = useState('Viales 10ml');
  const [formStorage, setFormStorage] = useState<StorageCondition>('2_8_C');
  const [formManufacturer, setFormManufacturer] = useState('Pfizer BioPharma');
  const [formExpiry, setFormExpiry] = useState('2027-12-31');
  const [formLocation, setFormLocation] = useState('Cámara Fría A-02, Rack 4');
  const [formPrice, setFormPrice] = useState(120.0);

  const categories = ['Todos', 'Oncología', 'Vacunas', 'Anestesia y UCI', 'Hemoderivados', 'Antibióticos', 'Material Quirúrgico'];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.atcCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rfidTag.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    const matchesStorage = selectedStorage === 'Todos' || item.storageCondition === selectedStorage;

    return matchesSearch && matchesCategory && matchesStorage;
  });

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = formCategory === 'Oncología' ? 'ONC' : formCategory === 'Vacunas' ? 'VAC' : 'MED';
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBatch: MedicalItem = {
      id: `med-${Date.now()}`,
      name: formName,
      genericName: formGeneric,
      atcCode: formAtc || 'ATC-TEMP-01',
      category: formCategory,
      batchNumber: `LOT-${prefix}-2026-${randomCode}`,
      rfidTag: `RFID-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      stock: Number(formStock),
      minStock: Number(formMinStock),
      unit: formUnit,
      storageCondition: formStorage,
      targetTemp:
        formStorage === '2_8_C'
          ? '2°C a 8°C (Monitoreo Continuo)'
          : formStorage === 'minus_20_C'
          ? '-25°C a -15°C'
          : '15°C a 25°C',
      currentTemp: formStorage === '2_8_C' ? 4.1 : formStorage === 'minus_20_C' ? -19.5 : 21.0,
      expiryDate: formExpiry,
      manufacturer: formManufacturer,
      location: formLocation,
      status: 'optimo',
      price: Number(formPrice)
    };

    onAddItem(newBatch);
    setIsAddModalOpen(false);
    // Reset
    setFormName('');
    setFormGeneric('');
    setFormAtc('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1b1b1d] tracking-tight">
            Gestión de Inventario & Lotes Farmacéuticos
          </h2>
          <p className="text-xs sm:text-sm text-[#717786]">
            Control de existencias clínicas, caducidad, clasificación ATC y transpondedores RFID
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenScanner}
            className="px-3.5 py-2.5 bg-white border border-[#e4e2e4] hover:bg-[#f6f3f5] text-[#1b1b1d] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <QrCode className="w-4 h-4 text-[#0058bc]" />
            <span>Escanear Lote</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-[#0058bc] hover:bg-[#00489c] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Nuevo Lote</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 bg-white rounded-2xl border border-[#e4e2e4] space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#717786] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, principio activo, lote (LOT-...), RFID o código ATC..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#fcf8fb] border border-[#e4e2e4] rounded-xl text-xs text-[#1b1b1d] placeholder-[#717786] focus:outline-none focus:border-[#0058bc]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <select
              value={selectedStorage}
              onChange={(e) => setSelectedStorage(e.target.value)}
              className="px-3 py-2 bg-[#fcf8fb] border border-[#e4e2e4] rounded-xl text-xs text-[#414755] focus:outline-none focus:border-[#0058bc] cursor-pointer"
            >
              <option value="Todos">Todas las Temperaturas</option>
              <option value="2_8_C">Refrigerado (2°C a 8°C)</option>
              <option value="minus_20_C">Criogénico (-20°C)</option>
              <option value="15_25_C">Ambiente Controlado (15-25°C)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0058bc] text-white shadow-2xs'
                  : 'bg-[#f6f3f5] text-[#414755] hover:bg-[#eae7ea]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Table / Cards Grid */}
      <div className="bg-white rounded-2xl border border-[#e4e2e4] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcf8fb] text-[#717786] uppercase font-bold text-[10px] tracking-wider border-b border-[#e4e2e4]">
              <tr>
                <th className="px-5 py-3.5">Medicamento & Principio Activo</th>
                <th className="px-4 py-3.5">Lote / RFID</th>
                <th className="px-4 py-3.5">Categoría ATC</th>
                <th className="px-4 py-3.5">Condición Térmica</th>
                <th className="px-4 py-3.5">Stock Disponible</th>
                <th className="px-4 py-3.5">Caducidad</th>
                <th className="px-4 py-3.5">Estado</th>
                <th className="px-4 py-3.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0edef]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#fcf8fb] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="font-bold text-[#1b1b1d] group-hover:text-[#0058bc] transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#717786]">{item.genericName}</div>
                    <div className="text-[10px] text-[#717786] mt-0.5">{item.location}</div>
                  </td>

                  <td className="px-4 py-4 font-mono">
                    <div className="font-bold text-[#0058bc]">{item.batchNumber}</div>
                    <div className="text-[10px] text-[#717786]">{item.rfidTag}</div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-2 py-0.5 bg-[#f0edef] text-[#414755] font-semibold rounded-md text-[10px]">
                      {item.category}
                    </span>
                    <div className="text-[10px] font-mono text-[#717786] mt-1">
                      {item.atcCode}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 font-semibold text-[#1b1b1d]">
                      <Thermometer className="w-3.5 h-3.5 text-[#0058bc]" />
                      <span>{item.targetTemp.split(' ')[0]}</span>
                    </div>
                    <div className="text-[10px] text-[#006b27]">Sensor OK</div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-bold text-[#1b1b1d]">
                      {item.stock} <span className="text-[10px] font-normal text-[#717786]">{item.unit}</span>
                    </div>
                    <div className="text-[10px] text-[#717786]">Mín: {item.minStock}</div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-[#414755]">
                      <Calendar className="w-3.5 h-3.5 text-[#717786]" />
                      <span>{item.expiryDate}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'optimo'
                          ? 'bg-[#006b27]/10 text-[#006b27]'
                          : item.status === 'stock_bajo'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : 'bg-[#ffe8b3] text-[#7a4f00]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => onSelectItemForTraceability(item)}
                      className="px-3 py-1.5 bg-[#0058bc]/10 hover:bg-[#0058bc] text-[#0058bc] hover:text-white rounded-lg font-semibold text-[11px] transition-all cursor-pointer"
                    >
                      Trazabilidad
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Batch Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1b1d]/40 backdrop-blur-xs"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-2xl border border-[#e4e2e4] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e4e2e4]">
                <div>
                  <h3 className="text-lg font-bold text-[#1b1b1d]">
                    Registrar Nuevo Lote Farmacéutico
                  </h3>
                  <p className="text-xs text-[#717786]">
                    Generación automática de transpondedor RFID y protocolo de almacenamiento GxP
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-[#717786] hover:text-[#1b1b1d] rounded-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateBatch} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-[#414755] mb-1">
                    Nombre Comercial del Medicamento / Suministro
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej: Trastuzumab 440mg Polvo Liofilizado"
                    className="w-full px-3.5 py-2 bg-white border border-[#e4e2e4] rounded-lg text-xs text-[#1b1b1d] focus:border-[#0058bc]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#414755] mb-1">
                      Principio Activo (Genérico)
                    </label>
                    <input
                      type="text"
                      required
                      value={formGeneric}
                      onChange={(e) => setFormGeneric(e.target.value)}
                      placeholder="Ej: Anticuerpo Monoclonal Anti-HER2"
                      className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg text-xs text-[#1b1b1d] focus:border-[#0058bc]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#414755] mb-1">
                      Código ATC (Clasificación OMS)
                    </label>
                    <input
                      type="text"
                      value={formAtc}
                      onChange={(e) => setFormAtc(e.target.value)}
                      placeholder="Ej: L01FD01"
                      className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg text-xs text-[#1b1b1d] focus:border-[#0058bc]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#414755] mb-1">
                      Categoría Clínica
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg text-xs text-[#1b1b1d] focus:border-[#0058bc]"
                    >
                      <option value="Oncología">Oncología</option>
                      <option value="Vacunas">Vacunas</option>
                      <option value="Anestesia y UCI">Anestesia y UCI</option>
                      <option value="Hemoderivados">Hemoderivados</option>
                      <option value="Antibióticos">Antibióticos</option>
                      <option value="Material Quirúrgico">Material Quirúrgico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#414755] mb-1">
                      Protocolo de Cadena de Frío
                    </label>
                    <select
                      value={formStorage}
                      onChange={(e) => setFormStorage(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg text-xs text-[#1b1b1d] focus:border-[#0058bc]"
                    >
                      <option value="2_8_C">Refrigerado Estricto (2°C a 8°C)</option>
                      <option value="minus_20_C">Congelador Criogénico (-20°C)</option>
                      <option value="15_25_C">Ambiente Controlado (15°C - 25°C)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-medium text-[#414755] mb-1">
                      Cantidad Inicial
                    </label>
                    <input
                      type="number"
                      required
                      value={formStock}
                      onChange={(e) => setFormStock(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg text-xs text-[#1b1b1d]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#414755] mb-1">
                      Stock Mínimo Alerta
                    </label>
                    <input
                      type="number"
                      required
                      value={formMinStock}
                      onChange={(e) => setFormMinStock(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg text-xs text-[#1b1b1d]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#414755] mb-1">
                      Fecha Caducidad
                    </label>
                    <input
                      type="date"
                      required
                      value={formExpiry}
                      onChange={(e) => setFormExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#e4e2e4] rounded-lg text-xs text-[#1b1b1d]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-[#e4e2e4]">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#414755] hover:bg-[#eae7ea] rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold bg-[#0058bc] hover:bg-[#00489c] text-white rounded-lg shadow-xs"
                  >
                    Guardar & Emitir RFID
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
