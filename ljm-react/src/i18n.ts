export type Language = 'es' | 'en';

export type TranslationKey =
  | 'config.title'
  | 'config.subtitle'
  | 'config.cancel'
  | 'config.applyAll'
  | 'config.preferences.title'
  | 'config.preferences.language'
  | 'config.preferences.timezone'
  | 'config.preferences.theme'
  | 'config.preferences.light'
  | 'config.preferences.dark'
  | 'config.preferences.save'
  | 'config.preferences.saved'
  | 'config.preferences.currentTime'
  | 'sidebar.dashboard'
  | 'sidebar.cruises'
  | 'sidebar.cruises.list'
  | 'sidebar.cruises.add'
  | 'sidebar.reservations'
  | 'sidebar.passengers'
  | 'sidebar.cabins'
  | 'sidebar.employees'
  | 'sidebar.employees.list'
  | 'sidebar.employees.add'
  | 'sidebar.payments'
  | 'sidebar.reports'
  | 'sidebar.settings'
  | 'sidebar.panel'
  | 'sidebar.superAdmin'
  | 'sidebar.currentTime'
  | 'sidebar.logout'
  | 'adminHeader.addReservation'
  | 'adminHeader.userAdmin'
  | 'adminHeader.superAdmin';

const translations: Record<Language, Record<TranslationKey, string>> = {
  es: {
    'config.title': 'Configuracion',
    'config.subtitle': 'Gestione su perfil, seguridad y preferencias del sistema para una experiencia personalizada.',
    'config.cancel': 'Cancelar',
    'config.applyAll': 'Aplicar Todo',
    'config.preferences.title': 'Preferencias del Sistema',
    'config.preferences.language': 'Idioma',
    'config.preferences.timezone': 'Zona Horaria',
    'config.preferences.theme': 'Tema Visual',
    'config.preferences.light': 'Claro',
    'config.preferences.dark': 'Oscuro',
    'config.preferences.save': 'Guardar preferencias',
    'config.preferences.saved': 'Guardado',
    'config.preferences.currentTime': 'Hora actual',
    'sidebar.dashboard': 'Panel de Control',
    'sidebar.cruises': 'Cruceros',
    'sidebar.cruises.list': 'Lista de Cruceros',
    'sidebar.cruises.add': 'Agregar Crucero',
    'sidebar.reservations': 'Reservas',
    'sidebar.passengers': 'Pasajeros',
    'sidebar.cabins': 'Cabinas',
    'sidebar.employees': 'Empleados',
    'sidebar.employees.list': 'Lista de Empleados',
    'sidebar.employees.add': 'Agregar Empleado',
    'sidebar.payments': 'Pagos',
    'sidebar.reports': 'Reportes',
    'sidebar.settings': 'Configuracion',
    'sidebar.panel': 'Panel Admin',
    'sidebar.superAdmin': 'Super Administrador',
    'sidebar.currentTime': 'Hora',
    'sidebar.logout': 'Cerrar Sesion',
    'adminHeader.addReservation': 'Anadir Reserva',
    'adminHeader.userAdmin': 'Usuario Admin',
    'adminHeader.superAdmin': 'Super Administrador',
  },
  en: {
    'config.title': 'Settings',
    'config.subtitle': 'Manage your profile, security and system preferences for a personalized experience.',
    'config.cancel': 'Cancel',
    'config.applyAll': 'Apply All',
    'config.preferences.title': 'System Preferences',
    'config.preferences.language': 'Language',
    'config.preferences.timezone': 'Time Zone',
    'config.preferences.theme': 'Visual Theme',
    'config.preferences.light': 'Light',
    'config.preferences.dark': 'Dark',
    'config.preferences.save': 'Save preferences',
    'config.preferences.saved': 'Saved',
    'config.preferences.currentTime': 'Current time',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.cruises': 'Cruises',
    'sidebar.cruises.list': 'Cruise List',
    'sidebar.cruises.add': 'Add Cruise',
    'sidebar.reservations': 'Reservations',
    'sidebar.passengers': 'Passengers',
    'sidebar.cabins': 'Cabins',
    'sidebar.employees': 'Employees',
    'sidebar.employees.list': 'Employee List',
    'sidebar.employees.add': 'Add Employee',
    'sidebar.payments': 'Payments',
    'sidebar.reports': 'Reports',
    'sidebar.settings': 'Settings',
    'sidebar.panel': 'Admin Panel',
    'sidebar.superAdmin': 'Super Administrator',
    'sidebar.currentTime': 'Time',
    'sidebar.logout': 'Log Out',
    'adminHeader.addReservation': 'Add Reservation',
    'adminHeader.userAdmin': 'Admin User',
    'adminHeader.superAdmin': 'Super Administrator',
  },
};

export const LANGUAGE_OPTIONS: Array<{ code: Language; label: Record<Language, string> }> = [
  { code: 'es', label: { es: 'Espanol (ES)', en: 'Spanish (ES)' } },
  { code: 'en', label: { es: 'Ingles (US)', en: 'English (US)' } },
];

export const TIMEZONE_OPTIONS = [
  {
    value: 'America/Bogota',
    label: {
      es: '(GMT-05:00) Bogota, Lima, Quito',
      en: '(GMT-05:00) Bogota, Lima, Quito',
    },
  },
  {
    value: 'America/Halifax',
    label: {
      es: '(GMT-04:00) Atlantic Time (Canada)',
      en: '(GMT-04:00) Atlantic Time (Canada)',
    },
  },
  {
    value: 'America/Santo_Domingo',
    label: {
      es: '(GMT-04:00) Santo Domingo',
      en: '(GMT-04:00) Santo Domingo',
    },
  },
  {
    value: 'Europe/Madrid',
    label: {
      es: '(GMT+01:00) Madrid, Paris, Berlin',
      en: '(GMT+01:00) Madrid, Paris, Berlin',
    },
  },
] as const;

export const translate = (language: Language, key: TranslationKey) =>
  translations[language][key] ?? translations.es[key];
