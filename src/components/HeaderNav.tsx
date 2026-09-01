import React from 'react';
import {
  Activity,
  Boxes,
  ThermometerSnowflake,
  Truck,
  ClipboardList,
  QrCode,
  LogOut,
  Bell,
  Radio,
  ShieldCheck,
  LayoutDashboard,
  LogIn
} from 'lucide-react';
import { User } from '../types';

export type ActiveTab = 'dashboard' | 'inventory' | 'coldchain' | 'shipments' | 'orders';

interface HeaderNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentUser: User | null;
  onLogout: () => void;
  onOpenScanner: () => void;
  onGoToLoginScreen: () => void;
  alertCount: number;
}

export default function HeaderNav({
  activeTab,
  onTabChange,
  currentUser,
  onLogout,
  onOpenScanner,
  onGoToLoginScreen,
  alertCount
}: HeaderNavProps) {
  const tabs = [
    { id: 'dashboard' as ActiveTab, label: 'Centro de Control', icon: LayoutDashboard },
    { id: 'inventory' as ActiveTab, label: 'Inventario & Lotes', icon: Boxes },
    { id: 'coldchain' as ActiveTab, label: 'Cadena de Frío IoT', icon: ThermometerSnowflake },
    { id: 'shipments' as ActiveTab, label: 'Envíos & GPS', icon: Truck },
    { id: 'orders' as ActiveTab, label: 'Órdenes Hospital', icon: ClipboardList }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#e4e2e4] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & System Status */}
          <div className="flex items-center gap-6">
            <button
              id="brand-home-btn"
              onClick={() => onTabChange('dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0058bc] text-white flex items-center justify-center font-black shadow-xs group-hover:bg-[#00489c] transition-colors">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[#1b1b1d] tracking-tight text-base group-hover:text-[#0058bc] transition-colors">
                    RiwiMediCare
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#0058bc]/10 text-[#0058bc] rounded-md">
                    PLUS
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#717786]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006b27] animate-ping"></span>
                  <span>Cadena de Frío Activa</span>
                </div>
              </div>
            </button>

            {/* Navigation Tabs (Desktop) */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    id={`nav-tab-${t.id}`}
                    onClick={() => onTabChange(t.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0058bc] text-white shadow-xs'
                        : 'text-[#414755] hover:text-[#1b1b1d] hover:bg-[#f6f3f5]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#717786]'}`} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Tools & User Profile */}
          <div className="flex items-center gap-3">
            {/* Quick RFID Scanner */}
            <button
              id="header-rfid-scanner-btn"
              onClick={onOpenScanner}
              title="Escanear Código o Lote RFID"
              className="flex items-center gap-1.5 px-3 py-2 bg-[#f0edef] hover:bg-[#e4e2e4] text-[#1b1b1d] rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#0058bc]" />
              <span className="hidden sm:inline">Escanear Lote</span>
            </button>

            {/* Back to Login Screen Preview Toggle */}
            <button
              id="view-login-screen-btn"
              onClick={onGoToLoginScreen}
              title="Ver Pantalla de Inicio / Iniciar Sesión"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 border border-[#0058bc]/30 text-[#0058bc] hover:bg-[#0058bc]/5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Ver Login</span>
            </button>

            {/* Alerts Indicator */}
            <button
              id="header-alerts-btn"
              onClick={() => onTabChange('coldchain')}
              className="relative p-2 text-[#414755] hover:text-[#1b1b1d] hover:bg-[#f6f3f5] rounded-lg transition-colors cursor-pointer"
              title="Alertas Activas del Sistema"
            >
              <Bell className="w-4 h-4" />
              {alertCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* User Profile & Logout */}
            {currentUser && (
              <div className="flex items-center gap-2.5 pl-2 border-l border-[#e4e2e4]">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#e4e2e4]"
                />
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-[#1b1b1d] leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-[#717786] truncate max-w-[140px]">
                    {currentUser.roleTitle}
                  </div>
                </div>
                <button
                  id="logout-btn"
                  onClick={onLogout}
                  title="Cerrar Sesión"
                  className="p-1.5 text-[#717786] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-[#f0edef] gap-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  isActive ? 'bg-[#0058bc] text-white' : 'text-[#414755] bg-[#f6f3f5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
