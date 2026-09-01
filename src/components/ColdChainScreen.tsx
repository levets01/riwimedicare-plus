import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ThermometerSnowflake,
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Zap,
  Radio,
  Sliders,
  ShieldAlert,
  Layers,
  Clock,
  BatteryCharging
} from 'lucide-react';
import { ColdChainSensor } from '../types';

interface ColdChainScreenProps {
  sensors: ColdChainSensor[];
  onSimulateExcursion: (sensorId: string) => void;
  onRestoreSensor: (sensorId: string) => void;
}

export default function ColdChainScreen({
  sensors,
  onSimulateExcursion,
  onRestoreSensor
}: ColdChainScreenProps) {
  const [selectedSensorId, setSelectedSensorId] = useState<string>(sensors[0]?.id || '');

  const activeSensor = sensors.find((s) => s.id === selectedSensorId) || sensors[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1b1b1d] tracking-tight">
            Monitoreo Continuo de Cadena de Frío IoT
          </h2>
          <p className="text-xs sm:text-sm text-[#717786]">
            Telemetría inalámbrica 915 MHz, cámaras frías, ultracongeladores y vehículos refrigerados
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-[#006b27]/10 border border-[#006b27]/20 rounded-xl text-xs font-semibold text-[#006b27] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006b27] animate-ping"></span>
            <span>Estabilidad 99.8%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sensor List and Active Sensor Telemetry Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor List Selector */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#717786] px-1 flex items-center justify-between">
            <span>Dispositivos & Cámaras ({sensors.length})</span>
            <span className="text-[10px]">Ping Activo</span>
          </div>

          {sensors.map((sensor) => {
            const isSelected = sensor.id === activeSensor?.id;
            const isAlert = sensor.status !== 'normal';

            return (
              <div
                key={sensor.id}
                onClick={() => setSelectedSensorId(sensor.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#0058bc] bg-[#0058bc]/5 shadow-xs ring-1 ring-[#0058bc]'
                    : isAlert
                    ? 'border-[#ba1a1a] bg-[#ffdad6]/20'
                    : 'border-[#e4e2e4] bg-white hover:border-[#0058bc]/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#1b1b1d]">{sensor.name}</div>
                    <div className="text-[11px] text-[#717786] mt-0.5">{sensor.location}</div>
                  </div>

                  <div className="text-right font-mono font-bold text-sm">
                    <span className={isAlert ? 'text-[#ba1a1a]' : 'text-[#0058bc]'}>
                      {sensor.currentTemp > 0 ? `+${sensor.currentTemp}` : sensor.currentTemp}°C
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#f0edef] flex items-center justify-between text-[10px] text-[#717786]">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3 h-3 text-[#0058bc]" /> {sensor.lastPing}
                  </span>
                  <span className="flex items-center gap-1">
                    <BatteryCharging className="w-3 h-3 text-[#006b27]" /> {sensor.battery}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Sensor Telemetry View */}
        {activeSensor && (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e4e2e4] p-6 space-y-6">
            {/* Header info for selected sensor */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e4e2e4]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#0058bc]/10 text-[#0058bc] rounded-md uppercase">
                    {activeSensor.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-[#717786] font-mono">ID: {activeSensor.id}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1b1b1d] mt-1">{activeSensor.name}</h3>
                <p className="text-xs text-[#717786]">{activeSensor.location}</p>
              </div>

              <div className="flex items-center gap-2">
                {activeSensor.status === 'normal' ? (
                  <button
                    onClick={() => onSimulateExcursion(activeSensor.id)}
                    className="px-3.5 py-2 bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#ba1a1a] text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Simular subida anómala de temperatura"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Simular Excursión Térmica</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onRestoreSensor(activeSensor.id)}
                    className="px-3.5 py-2 bg-[#006b27] hover:bg-[#00531c] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Restaurar Rango Óptimo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#fcf8fb] rounded-xl border border-[#e4e2e4]">
                <div className="text-[10px] text-[#717786]">Temperatura Actual</div>
                <div
                  className={`text-xl font-bold font-mono mt-0.5 ${
                    activeSensor.status !== 'normal' ? 'text-[#ba1a1a]' : 'text-[#0058bc]'
                  }`}
                >
                  {activeSensor.currentTemp}°C
                </div>
              </div>

              <div className="p-3 bg-[#fcf8fb] rounded-xl border border-[#e4e2e4]">
                <div className="text-[10px] text-[#717786]">Rango Aceptado</div>
                <div className="text-sm font-bold text-[#1b1b1d] font-mono mt-1">
                  {activeSensor.minAllowed}°C a {activeSensor.maxAllowed}°C
                </div>
              </div>

              <div className="p-3 bg-[#fcf8fb] rounded-xl border border-[#e4e2e4]">
                <div className="text-[10px] text-[#717786]">Humedad Relativa</div>
                <div className="text-sm font-bold text-[#1b1b1d] font-mono mt-1">
                  {activeSensor.humidity}% RH
                </div>
              </div>

              <div className="p-3 bg-[#fcf8fb] rounded-xl border border-[#e4e2e4]">
                <div className="text-[10px] text-[#717786]">Nivel Batería IoT</div>
                <div className="text-sm font-bold text-[#006b27] font-mono mt-1">
                  {activeSensor.battery}% (Li-Ion)
                </div>
              </div>
            </div>

            {/* Visual Temperature Wave Graph Representation */}
            <div className="p-5 bg-[#fcf8fb] rounded-xl border border-[#e4e2e4] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1b1b1d]">Curva Térmica en Tiempo Real (24 Horas)</span>
                <span className="text-[#717786]">Muestreo cada 15 min</span>
              </div>

              <div className="h-36 flex items-end justify-between gap-2 pt-6 px-2 border-b border-[#e4e2e4]">
                {activeSensor.history.map((h, i) => {
                  const normalizedHeight = Math.min(
                    100,
                    Math.max(20, ((h.temp - (activeSensor.minAllowed - 2)) / (activeSensor.maxAllowed - activeSensor.minAllowed + 4)) * 100)
                  );
                  const isOutOfRange = h.temp > activeSensor.maxAllowed || h.temp < activeSensor.minAllowed;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <div className="text-[10px] font-mono font-bold text-[#717786] opacity-0 group-hover:opacity-100 transition-opacity">
                        {h.temp}°C
                      </div>
                      <div
                        style={{ height: `${normalizedHeight}%` }}
                        className={`w-full max-w-[28px] rounded-t-md transition-all ${
                          isOutOfRange ? 'bg-[#ba1a1a]' : 'bg-[#0058bc]'
                        }`}
                      ></div>
                      <span className="text-[9px] font-mono text-[#717786]">{h.time}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#717786]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[#0058bc]"></span>
                  <span>Rango Seguro (2.0°C - 8.0°C)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-[#ba1a1a]"></span>
                  <span>Excursión / Desviación</span>
                </div>
              </div>
            </div>

            {/* Assigned Batches in this chamber */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#717786] mb-2.5">
                Lotes Asignados a Esta Cámara / Vehículo
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeSensor.assignedLots.map((lot) => (
                  <span
                    key={lot}
                    className="px-3 py-1.5 bg-[#f6f3f5] border border-[#e4e2e4] rounded-lg text-xs font-mono font-semibold text-[#1b1b1d]"
                  >
                    📦 {lot}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
