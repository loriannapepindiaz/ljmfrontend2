import React, { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../context/ThemeContext';
import { getStoredAdminSession } from '../../../../lib/api';

const TWO_FACTOR_ENABLED_KEY = 'ljm_admin_two_factor_enabled';
const TWO_FACTOR_SECRET_KEY = 'ljm_admin_two_factor_secret';
const TWO_FACTOR_DRAFT_SECRET_KEY = 'ljm_admin_two_factor_draft_secret';
const TOTP_PERIOD_SECONDS = 30;

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

const generateBase32Secret = (length = 32) => {
  const random = new Uint8Array(length);
  crypto.getRandomValues(random);
  return Array.from(random, (value) => BASE32_ALPHABET[value % BASE32_ALPHABET.length]).join('');
};

const base32ToBytes = (input: string) => {
  let bits = '';
  const cleaned = input.replace(/=+$/g, '').toUpperCase();

  for (const char of cleaned) {
    const value = BASE32_ALPHABET.indexOf(char);
    if (value === -1) continue;
    bits += value.toString(2).padStart(5, '0');
  }

  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  }

  return bytes;
};

const hotp = async (secret: string, counter: number) => {
  const key = await crypto.subtle.importKey(
    'raw',
    base32ToBytes(secret),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign'],
  );

  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setUint32(4, counter, false);

  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, buffer));
  const offset = signature[signature.length - 1] & 0x0f;
  const binary =
    ((signature[offset] & 0x7f) << 24) |
    ((signature[offset + 1] & 0xff) << 16) |
    ((signature[offset + 2] & 0xff) << 8) |
    (signature[offset + 3] & 0xff);

  return String(binary % 1_000_000).padStart(6, '0');
};

const verifyTotpCode = async (secret: string, code: string) => {
  const normalized = code.replace(/\D/g, '');
  if (!/^\d{6}$/.test(normalized)) return false;

  const currentCounter = Math.floor(Date.now() / 1000 / TOTP_PERIOD_SECONDS);
  const checks = [currentCounter - 2, currentCounter - 1, currentCounter, currentCounter + 1, currentCounter + 2];

  for (const counter of checks) {
    const expected = await hotp(secret, counter);
    if (expected === normalized) return true;
  }

  return false;
};

type ConfigSeguridadProps = {
  twoFactorEnabled: boolean;
  onTwoFactorChange: (enabled: boolean) => void;
};

const ConfigSeguridad: React.FC<ConfigSeguridadProps> = ({ twoFactorEnabled, onTwoFactorChange }) => {
  const { t } = useTranslation();
  const { tema } = useTheme();
  const adminUser = getStoredAdminSession()?.user;
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [pendingSecret, setPendingSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [twoFactorError, setTwoFactorError] = useState<string | null>(null);
  const [twoFactorMessage, setTwoFactorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  useEffect(() => {
    onTwoFactorChange(localStorage.getItem(TWO_FACTOR_ENABLED_KEY) === 'true');
  }, [onTwoFactorChange]);

  useEffect(() => {
    if (twoFactorEnabled) {
      localStorage.removeItem(TWO_FACTOR_DRAFT_SECRET_KEY);
    }
  }, [twoFactorEnabled]);

  const passwordMismatch = Boolean(confirmPass) && newPass !== confirmPass;
  const isConfirmDisabled = !currentPass || !newPass || !confirmPass || passwordMismatch;

  const secretForQr = pendingSecret || localStorage.getItem(TWO_FACTOR_SECRET_KEY) || '';
  const issuer = 'LJM SEALINE';
  const accountName = adminUser?.email || adminUser?.username || 'admin@ljmsealine.com';
  const otpauthUrl = secretForQr
    ? `otpauth://totp/${encodeURIComponent(`${issuer}:${accountName}`)}?secret=${secretForQr}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=${TOTP_PERIOD_SECONDS}`
    : '';

  const twoFactorStatus = useMemo(
    () =>
      twoFactorEnabled
        ? {
            badge: 'Activa',
            desc: 'Tu cuenta ya quedo enlazada con tu app autenticadora.',
          }
        : {
            badge: 'Inactiva',
            desc: 'Activa un codigo de acceso con QR o con clave manual en cualquier app compatible.',
          },
    [twoFactorEnabled],
  );

  const handleClose = () => {
    setShowModal(false);
    setShowNewPass(false);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setError(null);
  };

  const closeTwoFactorSetup = () => {
    setShowTwoFactorModal(false);
    setVerificationCode('');
    setTwoFactorError(null);
    setCopyMessage(null);
    setIsVerifying(false);
    setPendingSecret(localStorage.getItem(TWO_FACTOR_DRAFT_SECRET_KEY) ?? '');
  };

  const handleConfirm = () => {
    if (!currentPass || !newPass || !confirmPass) {
      setError('Completa todos los campos de contrasena.');
      return;
    }

    if (newPass !== confirmPass) {
      setError('Las contrasenas no coinciden.');
      return;
    }

    handleClose();
  };

  const handleToggleTwoFactor = () => {
    setTwoFactorMessage(null);
    if (twoFactorEnabled) {
      setShowDisableModal(true);
      return;
    }

    const draftSecret = localStorage.getItem(TWO_FACTOR_DRAFT_SECRET_KEY) ?? generateBase32Secret();
    localStorage.setItem(TWO_FACTOR_DRAFT_SECRET_KEY, draftSecret);
    setPendingSecret(draftSecret);
    setVerificationCode('');
    setTwoFactorError(null);
    setCopyMessage(null);
    setShowTwoFactorModal(true);
  };

  const handleCopySecret = async () => {
    if (!secretForQr) return;

    try {
      await navigator.clipboard.writeText(secretForQr);
      setCopyMessage('Clave copiada. Pegala en tu app autenticadora.');
    } catch {
      setCopyMessage('No se pudo copiar automaticamente. Puedes copiarla manualmente.');
    }
  };

  const enableTwoFactor = async () => {
    if (!pendingSecret) {
      setTwoFactorError('No pudimos generar el secreto de autenticacion. Intenta otra vez.');
      return;
    }

    setIsVerifying(true);
    setTwoFactorError(null);

    const isValid = await verifyTotpCode(pendingSecret, verificationCode);

    if (!isValid) {
      setIsVerifying(false);
      setTwoFactorError('El codigo no coincide con la clave actual. Revisa la app y prueba otra vez.');
      return;
    }

    localStorage.setItem(TWO_FACTOR_SECRET_KEY, pendingSecret);
    localStorage.setItem(TWO_FACTOR_ENABLED_KEY, 'true');
    localStorage.removeItem(TWO_FACTOR_DRAFT_SECRET_KEY);
    onTwoFactorChange(true);
    setTwoFactorMessage('Autenticacion de dos factores activada correctamente.');
    setIsVerifying(false);
    closeTwoFactorSetup();
  };

  const disableTwoFactor = () => {
    localStorage.removeItem(TWO_FACTOR_SECRET_KEY);
    localStorage.setItem(TWO_FACTOR_ENABLED_KEY, 'false');
    localStorage.removeItem(TWO_FACTOR_DRAFT_SECRET_KEY);
    onTwoFactorChange(false);
    setTwoFactorMessage('Autenticacion de dos factores desactivada.');
    setShowDisableModal(false);
  };

  return (
    <section className={`rounded-xl border shadow-sm ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
      <div className={`flex items-center gap-2 border-b px-6 py-4 ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/50'}`}>
        <span className="material-symbols-outlined text-[#0e1a34]">shield_person</span>
        <h2 className={`text-xl font-bold ${tema === 'oscuro' ? 'text-white' : 'text-[#0e1a34]'}`}>{t('config.security.title')}</h2>
      </div>
      <div className="space-y-6 p-6">
        <div>
          <h3 className={`mb-3 text-sm font-bold ${tema === 'oscuro' ? 'text-slate-100' : 'text-slate-800'}`}>{t('config.security.password')}</h3>
          <button
            onClick={() => setShowModal(true)}
            className="w-full rounded-lg border border-[#0e1a34] px-4 py-2.5 text-sm font-bold text-[#0e1a34] transition-all hover:bg-[#0e1a34] hover:text-white"
          >
            {t('config.security.changePassword')}
          </button>
          <p className="mt-2 text-xs italic text-slate-400">{t('config.security.lastChanged')}</p>
        </div>

        <div className={`rounded-xl border p-4 ${tema === 'oscuro' ? 'border-slate-700 bg-slate-900/70' : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-bold ${tema === 'oscuro' ? 'text-slate-100' : 'text-slate-800'}`}>{t('config.security.twoFactor')}</p>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${twoFactorEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  {twoFactorStatus.badge}
                </span>
              </div>
              <p className={`text-xs ${tema === 'oscuro' ? 'text-slate-400' : 'text-slate-500'}`}>{twoFactorStatus.desc}</p>
              {twoFactorEnabled && (
                <>
                  <p className={`text-[11px] ${tema === 'oscuro' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Proveedor: Google Authenticator, Authy o cualquier app compatible con TOTP.
                  </p>
                  <p className={`text-[11px] ${tema === 'oscuro' ? 'text-slate-500' : 'text-slate-400'}`}>
                    El codigo seguira cambiando cada 30 segundos y eso es normal. No necesitas borrar la cuenta del autenticador.
                  </p>
                </>
              )}
              {twoFactorMessage && (
                <p className="pt-1 text-[11px] font-medium text-emerald-600">{twoFactorMessage}</p>
              )}
            </div>
            <button
              aria-label="Alternar autenticacion de dos factores"
              onClick={handleToggleTwoFactor}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFactorEnabled ? 'bg-[#0e1a34]' : 'bg-slate-300'
              }`}
              type="button"
            >
              <span
                className={`inline-block size-5 rounded-full bg-white shadow transition-transform ${
                  twoFactorEnabled ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm" onClick={handleClose} />
          <div
            className={`fixed z-50 w-96 rounded-2xl border p-6 shadow-2xl ${
              tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-[#0e1a34]/10 bg-white'
            }`}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#eacea9]/30">
                  <span className="material-symbols-outlined text-[20px] text-[#0e1a34]">lock</span>
                </div>
                <div>
                  <h4 className={`text-base font-bold ${tema === 'oscuro' ? 'text-white' : 'text-[#0e1a34]'}`}>{t('config.security.modalTitle')}</h4>
                  <p className={`text-[11px] ${tema === 'oscuro' ? 'text-slate-400' : 'text-[#0e1a34]/40'}`}>{t('config.security.modalSubtitle')}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className={`flex size-8 items-center justify-center rounded-lg transition-colors ${
                  tema === 'oscuro' ? 'text-slate-400 hover:bg-slate-700' : 'text-[#0e1a34]/40 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <input type="text" style={{ display: 'none' }} readOnly />
            <input type="password" style={{ display: 'none' }} readOnly />

            <div className="flex flex-col gap-4">
              <div>
                <label className={`mb-1.5 block text-[11px] font-bold uppercase tracking-wider ${tema === 'oscuro' ? 'text-slate-400' : 'text-[#0e1a34]/50'}`}>
                  {t('config.security.currentPassword')}
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder={t('config.security.currentPasswordPlaceholder')}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-[#eacea9] focus:ring-2 focus:ring-[#eacea9]/50 ${
                    tema === 'oscuro'
                      ? 'border-slate-600 bg-slate-900 text-white placeholder:text-slate-400'
                      : 'border-slate-200 bg-white text-slate-900'
                  }`}
                  style={{ WebkitTextSecurity: 'disc' } as React.CSSProperties}
                />
              </div>

              <div>
                <label className={`mb-1.5 block text-[11px] font-bold uppercase tracking-wider ${tema === 'oscuro' ? 'text-slate-400' : 'text-[#0e1a34]/50'}`}>
                  {t('config.security.newPassword')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="new-password"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    data-form-type="other"
                    value={newPass}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewPass(value);
                      if (confirmPass && value !== confirmPass) {
                        setError('Las contrasenas no coinciden.');
                      } else {
                        setError(null);
                      }
                    }}
                    placeholder={t('config.security.newPasswordPlaceholder')}
                    className={`w-full rounded-xl border px-4 py-2.5 pr-12 text-sm outline-none focus:border-[#eacea9] focus:ring-2 focus:ring-[#eacea9]/50 ${
                      tema === 'oscuro'
                        ? 'border-slate-600 bg-slate-900 text-white placeholder:text-slate-400'
                        : 'border-slate-200 bg-white text-slate-900'
                    }`}
                    style={{ WebkitTextSecurity: showNewPass ? 'none' : 'disc' } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition-colors hover:text-[#0e1a34]"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showNewPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className={`mb-1.5 block text-[11px] font-bold uppercase tracking-wider ${tema === 'oscuro' ? 'text-slate-400' : 'text-[#0e1a34]/50'}`}>
                  {t('config.security.confirmPassword')}
                </label>
                <input
                  type="text"
                  autoComplete="new-password"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  value={confirmPass}
                  onChange={(e) => {
                    const value = e.target.value;
                    setConfirmPass(value);
                    if (newPass && value !== newPass) {
                      setError('Las contrasenas no coinciden.');
                    } else {
                      setError(null);
                    }
                  }}
                  placeholder={t('config.security.confirmPasswordPlaceholder')}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 ${
                    error || passwordMismatch
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                      : tema === 'oscuro'
                        ? 'border-slate-600 bg-slate-900 text-white placeholder:text-slate-400 focus:border-[#eacea9] focus:ring-[#eacea9]/50'
                        : 'border-slate-200 bg-white text-slate-900 focus:border-[#eacea9] focus:ring-[#eacea9]/50'
                  }`}
                  style={{ WebkitTextSecurity: 'disc' } as React.CSSProperties}
                />
                {(error || passwordMismatch) && (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-red-500">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {error ?? 'Las contrasenas no coinciden.'}
                  </p>
                )}
              </div>
            </div>

            <div className={`mt-5 flex gap-3 border-t pt-4 ${tema === 'oscuro' ? 'border-slate-700' : 'border-slate-100'}`}>
              <button
                onClick={handleClose}
                className={`flex-1 rounded-xl border py-3 text-xs font-bold transition-all ${
                  tema === 'oscuro'
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {t('config.security.cancelBtn')}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isConfirmDisabled}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0e1a34] py-3 text-xs font-bold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                {t('config.security.confirmBtn')}
              </button>
            </div>
          </div>
        </>
      )}

      {showTwoFactorModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={closeTwoFactorSetup} />
          <div
            className={`fixed z-50 max-h-[90vh] w-[min(92vw,460px)] overflow-y-auto rounded-3xl border p-5 shadow-2xl md:p-6 ${
              tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-[#0e1a34]/10 bg-white'
            }`}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#b89258]">Seguridad avanzada</p>
                <h4 className={`mt-2 text-xl font-bold ${tema === 'oscuro' ? 'text-white' : 'text-[#0e1a34]'}`}>
                  Activar autenticacion de dos factores
                </h4>
                <p className={`mt-2 text-sm ${tema === 'oscuro' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Escanea el QR con tu autenticador o usa la clave manual si tu telefono abre otra app.
                </p>
              </div>
              <button
                type="button"
                onClick={closeTwoFactorSetup}
                className={`flex size-9 items-center justify-center rounded-xl transition-colors ${
                  tema === 'oscuro' ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className={`rounded-2xl border p-5 ${tema === 'oscuro' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
              <div className="space-y-4">
                <div>
                  <p className={`text-sm font-semibold ${tema === 'oscuro' ? 'text-slate-100' : 'text-slate-800'}`}>
                    Cuenta: {accountName}
                  </p>
                  <p className={`mt-1 text-xs leading-relaxed ${tema === 'oscuro' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Si al escanear el QR tu iPhone abre `Passwords`, puedes usar la clave manual de abajo en tu autenticador.
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    {otpauthUrl ? <QRCodeSVG size={168} value={otpauthUrl} /> : null}
                  </div>
                </div>

                <div className={`rounded-2xl border p-4 ${tema === 'oscuro' ? 'border-slate-600 bg-slate-800/70' : 'border-[#d8bc93] bg-white'}`}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#b89258]">
                    Clave manual
                  </p>
                  <p className="mt-3 break-all rounded-xl border border-dashed border-[#d8bc93] px-3 py-3 font-mono text-xs tracking-[0.2em] text-[#b89258]">
                    {secretForQr}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopySecret}
                    className="mt-3 w-full rounded-xl border border-[#0e1a34] px-4 py-2.5 text-sm font-semibold text-[#0e1a34] transition hover:bg-[#0e1a34] hover:text-white"
                  >
                    Copiar clave
                  </button>
                  {copyMessage && <p className="mt-2 text-xs text-emerald-600">{copyMessage}</p>}
                </div>

                <div className={`rounded-2xl border p-4 text-xs leading-relaxed ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800/50 text-slate-300' : 'border-slate-200 bg-white text-slate-600'}`}>
                  1. Abre tu app autenticadora.
                  <br />
                  2. Toca agregar cuenta o el signo `+`.
                  <br />
                  3. Elige `introducir clave manual`.
                  <br />
                  4. Pega esta clave y guarda.
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label className={`mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] ${tema === 'oscuro' ? 'text-slate-400' : 'text-[#0e1a34]/50'}`}>
                Codigo de verificacion
              </label>
              <input
                className={`w-full rounded-2xl border px-4 py-3 text-center text-lg tracking-[0.35em] outline-none focus:border-[#eacea9] focus:ring-2 focus:ring-[#eacea9]/40 ${
                  tema === 'oscuro'
                    ? 'border-slate-600 bg-slate-900 text-white placeholder:text-slate-500'
                    : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'
                }`}
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  const nextValue = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setVerificationCode(nextValue);
                  if (twoFactorError && /^\d{6}$/.test(nextValue)) {
                    setTwoFactorError(null);
                  }
                }}
              />
              <p className={`mt-2 text-xs ${tema === 'oscuro' ? 'text-slate-400' : 'text-slate-500'}`}>
                El codigo cambia cada 30 segundos. Usa el valor visible en tu app para validar este acceso.
              </p>
              {twoFactorError && <p className="mt-2 text-xs font-medium text-red-500">{twoFactorError}</p>}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                className={`flex-1 rounded-2xl border py-3 text-sm font-semibold transition ${
                  tema === 'oscuro'
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                type="button"
                onClick={closeTwoFactorSetup}
              >
                Cancelar
              </button>
              <button
                className="flex-1 rounded-2xl bg-[#0e1a34] py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={verificationCode.length !== 6 || isVerifying}
                type="button"
                onClick={enableTwoFactor}
              >
                {isVerifying ? 'Verificando...' : 'Activar 2FA'}
              </button>
            </div>
          </div>
        </>
      )}

      {showDisableModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm" onClick={() => setShowDisableModal(false)} />
          <div
            className={`fixed z-50 w-[380px] rounded-3xl border p-6 shadow-2xl ${
              tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-[#0e1a34]/10 bg-white'
            }`}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <h4 className={`text-lg font-bold ${tema === 'oscuro' ? 'text-white' : 'text-[#0e1a34]'}`}>
              Desactivar autenticacion de dos factores
            </h4>
            <p className={`mt-2 text-sm ${tema === 'oscuro' ? 'text-slate-400' : 'text-slate-500'}`}>
              La cuenta volvera a depender solo de la contrasena. Puedes activarla de nuevo cuando quieras.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                className={`flex-1 rounded-2xl border py-3 text-sm font-semibold transition ${
                  tema === 'oscuro'
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                type="button"
                onClick={() => setShowDisableModal(false)}
              >
                Cancelar
              </button>
              <button
                className="flex-1 rounded-2xl bg-[#0e1a34] py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                type="button"
                onClick={disableTwoFactor}
              >
                Desactivar
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ConfigSeguridad;
