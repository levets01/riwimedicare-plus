import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  CheckCircle2,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import MedicalNetworkCanvas from './MedicalNetworkCanvas';
import TermsAndPrivacyModal from './TermsAndPrivacyModal';
import { DEMO_USERS } from '../data/mockData';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('ejemplo@riwimedicare.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Forgot password flow
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Register flow state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState<'farmaceutico_jefe' | 'coordinador_logistica' | 'auditor_calidad' | 'enfermero_quirofano'>('farmaceutico_jefe');
  const [regHospital, setRegHospital] = useState('Hospital Universitario San Rafael');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      // Find matching user or fallback to first demo user
      const matched = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      ) || DEMO_USERS[0];

      setIsLoading(false);
      onLogin(matched);
    }, 600);
  };

  const handleQuickSelectUser = (user: User) => {
    setEmail(user.email);
    setPassword('medicPass2026!');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(user);
    }, 450);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) {
      setErrorMessage('Por favor complete todos los campos.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: regName,
        email: regEmail,
        role: regRole,
        roleTitle:
          regRole === 'farmaceutico_jefe'
            ? 'Farmacéutico Jefe'
            : regRole === 'coordinador_logistica'
            ? 'Coordinador de Logística Fría'
            : regRole === 'auditor_calidad'
            ? 'Auditor de Calidad GxP'
            : 'Jefe de Quirófano',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
        hospital: regHospital,
        department: 'Área de Suministros Clínicos'
      };
      setIsLoading(false);
      onLogin(newUser);
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col lg:flex-row bg-[#ffffff] overflow-hidden font-sans">
      {/* LEFT PANEL: High-Tech Medical Supply Visual & Branding */}
      <div className="relative flex-1 min-h-[420px] lg:min-h-screen bg-[#f3f7fd] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden select-none border-b lg:border-b-0 lg:border-r border-[#e4e2e4]">
        {/* Dynamic canvas simulating molecular lattice & cold-chain nodes */}
        <MedicalNetworkCanvas />

        {/* Blurred background mockup card for realistic spatial depth (matches screenshot aesthetic) */}
        <div className="absolute w-[360px] md:w-[420px] h-[460px] bg-white/40 rounded-3xl border border-white/60 shadow-xl backdrop-blur-md opacity-35 pointer-events-none transform -translate-y-4 scale-95 flex flex-col p-8 space-y-4">
          <div className="h-6 w-32 bg-[#0058bc]/20 rounded-md"></div>
          <div className="h-4 w-48 bg-slate-300/40 rounded-md"></div>
          <div className="space-y-3 pt-6">
            <div className="h-10 w-full bg-white/60 rounded-xl"></div>
            <div className="h-10 w-full bg-white/60 rounded-xl"></div>
            <div className="h-11 w-full bg-[#0058bc]/30 rounded-xl mt-4"></div>
          </div>
        </div>

        {/* Foreground Title and Subtitle - EXACT visual match with screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-lg px-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#c1c6d7]/60 shadow-xs text-xs font-semibold text-[#0058bc] mb-6 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0058bc]" />
            <span>Sistema Homologado GxP / FDA 21 CFR Part 11</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#1b1b1d] tracking-tight leading-tight">
            RiwiMediCare Plus
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#414755] font-normal leading-relaxed">
            Precisión en la cadena de suministro médico.
          </p>

          {/* Feature Highlights Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <div className="px-3 py-1.5 bg-white/85 backdrop-blur-xs rounded-lg border border-[#e4e2e4] text-xs font-medium text-[#414755] shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006b27] animate-pulse"></span>
              Cadena de Frío IoT 2°C - 8°C
            </div>
            <div className="px-3 py-1.5 bg-white/85 backdrop-blur-xs rounded-lg border border-[#e4e2e4] text-xs font-medium text-[#414755] shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0058bc]"></span>
              Trazabilidad RFID de Lotes
            </div>
            <div className="px-3 py-1.5 bg-white/85 backdrop-blur-xs rounded-lg border border-[#e4e2e4] text-xs font-medium text-[#414755] shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0070eb]"></span>
              Despachos Quirúrgicos Urgentes
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL: Authentication Form (1:1 screenshot precision) */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 bg-[#ffffff] z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold text-[#1b1b1d] tracking-tight">
                {isRegisterMode ? 'Crear Cuenta Médica' : 'Iniciar Sesión'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setErrorMessage('');
                }}
                className="text-xs font-semibold text-[#0058bc] hover:underline cursor-pointer"
              >
                {isRegisterMode ? '¿Ya tiene cuenta? Iniciar' : 'Crear nueva cuenta'}
              </button>
            </div>
            <p className="text-sm text-[#414755]">
              {isRegisterMode
                ? 'Complete los datos para solicitar credenciales de acceso institucional.'
                : 'Ingrese sus credenciales para acceder al sistema.'}
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 bg-[#ba1a1a]/10 border border-[#ba1a1a]/20 rounded-xl flex items-center gap-2.5 text-xs text-[#ba1a1a]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!isRegisterMode ? (
            /* LOGIN FORM - EXACT SCREENSHOT STRUCTURE */
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Correo Electrónico */}
              <div>
                <label className="block text-xs font-medium text-[#414755] mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#717786]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@riwimedicare.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#ffffff] border border-[#e4e2e4] rounded-lg text-sm text-[#1b1b1d] placeholder-[#717786] focus:outline-none focus:border-[#0058bc] focus:ring-2 focus:ring-[#0058bc]/10 transition-all"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-[#414755]">
                    Contraseña
                  </label>
                  <button
                    id="forgot-password-link"
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setIsForgotModalOpen(true);
                    }}
                    className="text-xs font-medium text-[#0058bc] hover:underline cursor-pointer"
                  >
                    ¿Olvidó su contraseña?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#717786]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-[#ffffff] border border-[#e4e2e4] rounded-lg text-sm text-[#1b1b1d] placeholder-[#717786] focus:outline-none focus:border-[#0058bc] focus:ring-2 focus:ring-[#0058bc]/10 transition-all"
                  />
                  <button
                    id="toggle-password-visibility"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#717786] hover:text-[#1b1b1d] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="submit-login-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-[#0058bc] hover:bg-[#00489c] active:scale-[0.99] text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Autenticando...</span>
                  </div>
                ) : (
                  <>
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#414755] mb-1.5">
                  Nombre Completo y Título
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ej: Dra. Mariana Solís"
                  className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#e4e2e4] rounded-lg text-sm text-[#1b1b1d] focus:outline-none focus:border-[#0058bc]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#414755] mb-1.5">
                  Correo Institucional
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="marianasolis@hospital.org"
                  className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#e4e2e4] rounded-lg text-sm text-[#1b1b1d] focus:outline-none focus:border-[#0058bc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#414755] mb-1.5">
                    Rol Operativo
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-[#ffffff] border border-[#e4e2e4] rounded-lg text-xs text-[#1b1b1d] focus:outline-none focus:border-[#0058bc]"
                  >
                    <option value="farmaceutico_jefe">Farmacia Hospitalaria</option>
                    <option value="coordinador_logistica">Logística Cadena Frío</option>
                    <option value="auditor_calidad">Auditoría Calidad GxP</option>
                    <option value="enfermero_quirofano">Quirófano y Urgencias</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#414755] mb-1.5">
                    Centro Hospitalario
                  </label>
                  <input
                    type="text"
                    required
                    value={regHospital}
                    onChange={(e) => setRegHospital(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#ffffff] border border-[#e4e2e4] rounded-lg text-xs text-[#1b1b1d] focus:outline-none focus:border-[#0058bc]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-6 bg-[#0058bc] hover:bg-[#00489c] text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {isLoading ? 'Registrando...' : 'Registrar y Acceder'}
              </button>
            </form>
          )}

          {/* Quick Access Demo Profiles (Easy Testing) */}
          <div className="mt-8 pt-6 border-t border-[#f0edef]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#717786] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0058bc]" /> Acceso Rápido por Rol
              </span>
              <span className="text-[11px] text-[#717786]">1-Clic Demo</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map((user) => (
                <button
                  key={user.id}
                  id={`demo-user-btn-${user.id}`}
                  type="button"
                  onClick={() => handleQuickSelectUser(user)}
                  className="p-2 text-left rounded-lg border border-[#e4e2e4] hover:border-[#0058bc] hover:bg-[#0058bc]/5 transition-all text-xs group cursor-pointer"
                >
                  <div className="font-semibold text-[#1b1b1d] group-hover:text-[#0058bc] truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-[#717786] truncate">
                    {user.role === 'farmaceutico_jefe'
                      ? 'Farmacia Hospital'
                      : user.role === 'coordinador_logistica'
                      ? 'Logística Frío'
                      : user.role === 'auditor_calidad'
                      ? 'Auditor GxP'
                      : 'Jefe Quirófano'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Terms and Privacy Note - Exact text from screenshot */}
          <p className="mt-8 text-center text-xs text-[#717786] leading-relaxed">
            Al continuar, acepta nuestros{' '}
            <button
              id="terms-link-btn"
              type="button"
              onClick={() => setModalType('terms')}
              className="text-[#0058bc] hover:underline font-normal cursor-pointer"
            >
              Términos de Servicio
            </button>{' '}
            y{' '}
            <button
              id="privacy-link-btn"
              type="button"
              onClick={() => setModalType('privacy')}
              className="text-[#0058bc] hover:underline font-normal cursor-pointer"
            >
              Política de Privacidad
            </button>
            .
          </p>
        </div>
      </div>

      {/* Modals for Terms & Privacy */}
      <TermsAndPrivacyModal
        isOpen={modalType !== null}
        type={modalType}
        onClose={() => setModalType(null)}
      />

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotModalOpen && (
          <div
            id="forgot-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1b1d]/40 backdrop-blur-xs"
            onClick={() => {
              setIsForgotModalOpen(false);
              setForgotSent(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e4e2e4]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0058bc]/10 text-[#0058bc] flex items-center justify-center mb-4">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1b1b1d] mb-1">
                Recuperación de Contraseña
              </h3>
              <p className="text-xs text-[#414755] mb-5">
                Enviaremos un enlace de verificación cifrado a su dirección de correo institucional.
              </p>

              {forgotSent ? (
                <div className="p-4 bg-[#006b27]/10 border border-[#006b27]/20 rounded-xl space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#006b27]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Enlace enviado exitosamente</span>
                  </div>
                  <p className="text-xs text-[#414755]">
                    Revise la bandeja de entrada de <strong>{forgotEmail}</strong> para restablecer su clave de acceso.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-[#414755] mb-1.5">
                      Correo Electrónico Institucional
                    </label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="usuario@riwimedicare.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#e4e2e4] rounded-lg text-sm text-[#1b1b1d] focus:outline-none focus:border-[#0058bc]"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setForgotSent(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-[#414755] hover:bg-[#f0edef] rounded-lg cursor-pointer"
                >
                  Cerrar
                </button>
                {!forgotSent && (
                  <button
                    type="button"
                    onClick={() => {
                      if (forgotEmail) setForgotSent(true);
                    }}
                    className="px-4 py-2 text-xs font-medium bg-[#0058bc] hover:bg-[#00489c] text-white rounded-lg cursor-pointer"
                  >
                    Enviar Enlace Seguro
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
