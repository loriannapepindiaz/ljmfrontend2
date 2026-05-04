import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import i18n from '../i18next';
import { ADMIN_SESSION_EVENT, getStoredAdminSession } from '../lib/api';
import {
  LANGUAGE_OPTIONS,
  TIMEZONE_OPTIONS,
  type Language,
  type TranslationKey,
  translate,
} from '../i18n';

interface AdminPreferencesContextType {
  language: Language;
  timezone: string;
  setLanguage: (lang: Language) => void;
  setTimezone: (tz: string) => void;
  savePreferences: (next: { language: Language; timezone: string }) => void;
  t: (key: TranslationKey) => string;
  getLanguageLabel: (lang: Language) => string;
  getTimezoneLabel: (tz: string) => string;
  locale: string;
}

const LEGACY_LANGUAGE_MAP: Record<string, Language> = {
  'Espanol (ES)': 'es',
  'Español (ES)': 'es',
  'Ingles (US)': 'en',
  'English (US)': 'en',
};

const LEGACY_TIMEZONE_MAP: Record<string, string> = {
  '(GMT-05:00) Bogota, Lima, Quito': 'America/Bogota',
  '(GMT-04:00) Atlantic Time (Canada)': 'America/Halifax',
  '(GMT+01:00) Madrid, Paris, Berlin': 'Europe/Madrid',
};

const DEFAULT_LANGUAGE: Language = 'es';
const DEFAULT_TIMEZONE = 'America/Bogota';

const PHRASE_ES_TO_EN: Record<string, string> = {
  'Panel de Control': 'Dashboard',
  Cruceros: 'Cruises',
  Reservas: 'Reservations',
  Pasajeros: 'Passengers',
  Cabinas: 'Cabins',
  Empleados: 'Employees',
  Pagos: 'Payments',
  Reportes: 'Reports',
  Configuracion: 'Settings',
  Seguridad: 'Security',
  Notificaciones: 'Notifications',
  'Perfil de Usuario': 'User Profile',
  'Preferencias del Sistema': 'System Preferences',
  Idioma: 'Language',
  'Zona Horaria': 'Time Zone',
  'Tema Visual': 'Visual Theme',
  Claro: 'Light',
  Oscuro: 'Dark',
  Cancelar: 'Cancel',
  Guardar: 'Save',
  Guardado: 'Saved',
  'Guardar Cambios': 'Save Changes',
  'Guardar preferencias': 'Save preferences',
  'Aplicar Todo': 'Apply All',
  'Aplicar filtro': 'Apply filter',
  'Gestión de Flota': 'Fleet Management',
  'Gestión de Cabinas': 'Cabin Management',
  'Gestión de Pagos': 'Payment Management',
  'Gestión de Empleados': 'Employee Management',
  'Gestión de Reservas': 'Reservation Management',
  'Informes y Análisis': 'Reports and Analytics',
  'Acciones Rápidas': 'Quick Actions',
  'Próximas Salidas': 'Upcoming Departures',
  'No hay salidas programadas': 'No departures scheduled',
  'No hay actividad reciente': 'No recent activity',
  'No hay cabinas registradas': 'No cabins registered',
  'No hay barcos registrados': 'No ships registered',
  'No hay transacciones registradas': 'No transactions registered',
  'No hay empleados registrados': 'No employees registered',
  'Sin cabinas registradas': 'No cabins registered',
  'Sin barcos registrados': 'No ships registered',
  'Sin barcos destacados': 'No featured ships',
  'Sin transacciones registradas': 'No transactions registered',
  'Sin datos disponibles': 'No data available',
  'Sin cruceros registrados': 'No cruises registered',
  'Añadir Crucero': 'Add Cruise',
  'Añadir Empleado': 'Add Employee',
  'Añadir Pasajero': 'Add Passenger',
  'Añadir Reserva': 'Add Reservation',
  'Añadir Barco': 'Add Ship',
  'Agregar Empleado': 'Add Employee',
  'Agregar Crucero': 'Add Cruise',
  'Lista de Cruceros': 'Cruise List',
  'Lista de Empleados': 'Employee List',
  'Cerrar Sesión': 'Log Out',
  'Panel Admin': 'Admin Panel',
  'Usuario Admin': 'Admin User',
  'Super Administrador': 'Super Administrator',
  'Total Reservas': 'Total Reservations',
  'Total Pasajeros': 'Total Passengers',
  'Total Empleados': 'Total Employees',
  'Total Cabinas': 'Total Cabins',
  'Pagos Pendientes': 'Pending Payments',
  'Directorio de Empleados': 'Employee Directory',
  'Estado de Flota': 'Fleet Status',
  'Activo para Reservas': 'Active for Reservations',
  'Cancelar Edición': 'Cancel Edit',
  'Guardar Borrador': 'Save Draft',
  'Publicar en Flota': 'Publish to Fleet',
  'Añadir Nuevo Empleado': 'Add New Employee',
  'Información Personal': 'Personal Information',
  'Perfil y Experiencia Profesional': 'Professional Profile and Experience',
  'Repositorio Documental': 'Document Repository',
  'Asignación y Contrato': 'Assignment and Contract',
  'Estado del Registro': 'Record Status',
  'Cargo / Puesto': 'Role / Position',
  Departamento: 'Department',
  Cubierta: 'Deck',
  Máquinas: 'Machinery',
  Servicio: 'Service',
  'Certificaciones y Títulos': 'Certifications and Qualifications',
  Certificado: 'Certificate',
  'Entidad Emisora': 'Issuing Authority',
  Vencimiento: 'Expiration',
  'Añadir Certificación': 'Add Certification',
  'Experiencia Previa / Notas': 'Previous Experience / Notes',
  'Detalles de Seguro Médico': 'Medical Insurance Details',
  'Nº Póliza / Cobertura': 'Policy No. / Coverage',
  'N° Póliza / Cobertura': 'Policy No. / Coverage',
  'Los datos aparecerán aquí al conectar la BD': 'Data will appear here once the DB is connected',
  'Search en el manifiesto...': 'Search manifest...',
};

const WORD_ES_TO_EN: Record<string, string> = {
  empleados: 'employees',
  empleado: 'employee',
  anadir: 'add',
  agregar: 'add',
  crucero: 'cruise',
  cruceros: 'cruises',
  nuevo: 'new',
  informacion: 'information',
  personal: 'personal',
  perfil: 'profile',
  experiencia: 'experience',
  profesional: 'professional',
  cargo: 'role',
  puesto: 'position',
  departamento: 'department',
  cubierta: 'deck',
  maquinas: 'machinery',
  servicio: 'service',
  certificaciones: 'certifications',
  certificacion: 'certification',
  documentos: 'documents',
  documentacion: 'documentation',
  repositorio: 'repository',
  asignacion: 'assignment',
  contrato: 'contract',
  estado: 'status',
  registro: 'record',
  guardado: 'saved',
  guardar: 'save',
  cancelar: 'cancel',
  aplicar: 'apply',
  reservas: 'reservations',
  pasajeros: 'passengers',
  cabinas: 'cabins',
  pagos: 'payments',
  reportes: 'reports',
  seguridad: 'security',
  notificaciones: 'notifications',
  idioma: 'language',
  zona: 'zone',
  horaria: 'time',
};

const PHRASE_EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(PHRASE_ES_TO_EN).map(([es, en]) => [en, es]),
);

const WORD_EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(WORD_ES_TO_EN).map(([es, en]) => [en, es]),
);

const textOriginals = new WeakMap<Node, string>();
const attrOriginals = new WeakMap<Element, Record<string, string>>();

const normalizeKey = (value: string) =>
  value
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
    .replace(/Ã¡/g, 'á')
    .replace(/Ã©/g, 'é')
    .replace(/Ã­/g, 'í')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã±/g, 'ñ')
    .replace(/Â/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const replaceByMap = (value: string, map: Record<string, string>) => {
  const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
  let output = value;
  for (const [source, target] of entries) {
    output = output.replace(new RegExp(escapeRegExp(source), 'g'), target);
  }
  return output;
};

const replaceWords = (value: string, map: Record<string, string>) =>
  value.replace(/[A-Za-zÀ-ÖØ-öø-ÿ]+/g, (token) => {
    const normalized = token
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const replacement = map[normalized];
    if (!replacement) return token;
    const isAllCaps = token === token.toUpperCase();
    const isCapitalized = token[0] === token[0].toUpperCase() && token.slice(1) === token.slice(1).toLowerCase();
    if (isAllCaps) return replacement.toUpperCase();
    if (isCapitalized) return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    return replacement;
  });

const translatePlainText = (value: string, language: Language) => {
  const clean = normalizeKey(value);
  if (!clean) return value;

  if (language === 'en') {
    const direct = PHRASE_ES_TO_EN[clean];
    if (direct) return direct;
    return replaceWords(replaceByMap(clean, PHRASE_ES_TO_EN), WORD_ES_TO_EN);
  }

  const direct = PHRASE_EN_TO_ES[clean];
  if (direct) return direct;
  return replaceWords(replaceByMap(clean, PHRASE_EN_TO_ES), WORD_EN_TO_ES);
};

const shouldIgnoreNode = (node: Node) => {
  const element = node.parentElement;
  if (!element) return true;
  if (element.closest('script, style, code, pre, .material-symbols-outlined, .material-icons, [translate="no"]')) return true;
  const raw = node.nodeValue?.trim() ?? '';
  if (!raw) return true;
  if (/^[a-z0-9_]+$/i.test(raw)) return true;
  return false;
};

const translateTextNode = (node: Node, language: Language) => {
  if (shouldIgnoreNode(node)) return;
  const current = node.nodeValue ?? '';
  const base = textOriginals.get(node) ?? current;
  if (!textOriginals.has(node)) textOriginals.set(node, current);
  const translated = translatePlainText(base, language);
  if (translated !== current) node.nodeValue = translated;
};

const translateElementAttributes = (element: Element, language: Language) => {
  if (element.closest('.material-symbols-outlined, .material-icons')) return;
  const attrs = ['placeholder', 'title', 'aria-label', 'alt'] as const;

  if (!attrOriginals.has(element)) {
    const snapshot: Record<string, string> = {};
    for (const attr of attrs) {
      const value = element.getAttribute(attr);
      if (value) snapshot[attr] = value;
    }
    attrOriginals.set(element, snapshot);
  }

  const snapshot = attrOriginals.get(element) ?? {};
  for (const attr of attrs) {
    const original = snapshot[attr];
    if (!original) continue;
    const current = element.getAttribute(attr) ?? '';
    const translated = translatePlainText(original, language);
    if (translated !== current) element.setAttribute(attr, translated);
  }
};

const translateDom = (root: Node, language: Language) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    translateTextNode(current, language);
    current = walker.nextNode();
  }

  const scope = root instanceof Element ? root : document.body;
  if (!scope) return;
  scope
    .querySelectorAll('[placeholder], [title], [aria-label], [alt]')
    .forEach((el) => translateElementAttributes(el, language));
};

const normalizeLanguage = (rawValue: string | null): Language => {
  if (!rawValue) return DEFAULT_LANGUAGE;
  if (rawValue === 'es' || rawValue === 'en') return rawValue;
  return LEGACY_LANGUAGE_MAP[rawValue] ?? DEFAULT_LANGUAGE;
};

const normalizeTimezone = (rawValue: string | null): string => {
  if (!rawValue) return DEFAULT_TIMEZONE;
  if (TIMEZONE_OPTIONS.some((option) => option.value === rawValue)) return rawValue;
  return LEGACY_TIMEZONE_MAP[rawValue] ?? DEFAULT_TIMEZONE;
};

const getPreferenceStorageKey = (baseKey: 'idioma' | 'zona') => {
  const session = getStoredAdminSession();
  const identity = session?.user.id ?? session?.user.email ?? 'guest';
  return `${baseKey}:${identity}`;
};

const readStoredLanguage = () =>
  normalizeLanguage(localStorage.getItem(getPreferenceStorageKey('idioma')) ?? localStorage.getItem('idioma'));

const readStoredTimezone = () =>
  normalizeTimezone(localStorage.getItem(getPreferenceStorageKey('zona')) ?? localStorage.getItem('zona'));

const AdminPreferencesContext = createContext<AdminPreferencesContextType>({
  language: DEFAULT_LANGUAGE,
  timezone: DEFAULT_TIMEZONE,
  setLanguage: () => {},
  setTimezone: () => {},
  savePreferences: () => {},
  t: (key) => key,
  getLanguageLabel: () => '',
  getTimezoneLabel: () => '',
  locale: 'es-ES',
});

export const AdminPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => readStoredLanguage());
  const [timezone, setTimezoneState] = useState<string>(() => readStoredTimezone());

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
  };

  const setTimezone = (tz: string) => {
    const normalized = normalizeTimezone(tz);
    setTimezoneState(normalized);
  };

  const savePreferences = ({ language: nextLanguage, timezone: nextTimezone }: { language: Language; timezone: string }) => {
    const normalizedLanguage = normalizeLanguage(nextLanguage);
    const normalizedTimezone = normalizeTimezone(nextTimezone);
    localStorage.setItem(getPreferenceStorageKey('idioma'), normalizedLanguage);
    localStorage.setItem(getPreferenceStorageKey('zona'), normalizedTimezone);
    localStorage.setItem('idioma', normalizedLanguage);
    localStorage.setItem('zona', normalizedTimezone);
    i18n.changeLanguage(normalizedLanguage);
    setLanguageState(normalizedLanguage);
    setTimezoneState(normalizedTimezone);
  };

  useEffect(() => {
    const syncPreferencesFromSession = () => {
      const nextLanguage = readStoredLanguage();
      const nextTimezone = readStoredTimezone();
      i18n.changeLanguage(nextLanguage);
      setLanguageState(nextLanguage);
      setTimezoneState(nextTimezone);
    };

    window.addEventListener(ADMIN_SESSION_EVENT, syncPreferencesFromSession);
    return () => window.removeEventListener(ADMIN_SESSION_EVENT, syncPreferencesFromSession);
  }, []);

  const value = useMemo<AdminPreferencesContextType>(
    () => ({
      language,
      timezone,
      setLanguage,
      setTimezone,
      savePreferences,
      t: (key) => translate(language, key),
      getLanguageLabel: (lang) => LANGUAGE_OPTIONS.find((option) => option.code === lang)?.label[language] ?? '',
      getTimezoneLabel: (tz) =>
        TIMEZONE_OPTIONS.find((option) => option.value === tz)?.label[language] ??
        TIMEZONE_OPTIONS[0].label[language],
      locale: language === 'es' ? 'es-ES' : 'en-US',
    }),
    [language, timezone],
  );

  useEffect(() => {
    document.documentElement.lang = language === 'es' ? 'es' : 'en';
    translateDom(document.body, language);

    const raf = requestAnimationFrame(() => translateDom(document.body, language));
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') {
          translateTextNode(mutation.target, language);
          continue;
        }
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => translateDom(node, language));
        }
      }
    });

    observer.observe(document.body, { childList: true, characterData: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [language]);

  return <AdminPreferencesContext.Provider value={value}>{children}</AdminPreferencesContext.Provider>;
};

export const useAdminPreferences = () => useContext(AdminPreferencesContext);
