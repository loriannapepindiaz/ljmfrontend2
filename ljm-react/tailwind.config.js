/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- PALETA STITCH (Identidad) ---
        primary: '#2972B6',
        'stitch-blue': '#2972B6',
        'stitch-light': '#4EBCFF',
        'stitch-dark': '#002790',
        'stitch-purple': '#945CB4',
        'stitch-navy': '#001D4F',
        'navy': '#001D4F',

        // --- ACENTOS Y FONDOS ---
        'accent': '#F5F1E8',
        'pearl-beige': '#F5F1E8',
        'accent-red': '#ED192D',
        'stitch-black': '#0A0A0A',
        'background-light': '#FDFCF0',
        'background-dark': '#0A1224',

        // --- LJM SEALINE ---
        'night-blue': '#0e1a34',
        'maroon-gold': '#785d32',
        'off-white': '#f8f9fa',
        'card-white': '#ffffff',
        'text-secondary': '#4b5563',
        'border-light': '#e5e7eb',

        // ✅ NUEVOS: para que funcionen las clases del diseño de reservas
        'ljm-primary': '#0e1a34',      // bg-ljm-primary, text-ljm-primary
        'ljm-accent': '#eacea9',       // bg-ljm-accent (gold claro)
        'ljm-accent-dark': '#d4af37',  // text-ljm-accent-dark (gold oscuro)
        'ljm-bg': '#f8fafc',           // bg-ljm-bg (fondo gris claro)
      },

      fontFamily: {
        display: ['Literata', '"Comic Sans MS"', 'Montserrat', 'sans-serif'], // ✅ Literata primero para LJM
        sans: ['Public Sans', 'Montserrat', 'sans-serif'],                    // ✅ Public Sans primero para LJM
        body: ['Montserrat', 'sans-serif'],
        playfair: ["'Playfair Display'", 'serif'],
      },

      boxShadow: {
        'stitch-glow': '0 0 15px rgba(78, 188, 255, 0.6)',
        'stitch-glow-strong': '0 0 25px rgba(41, 114, 182, 0.8)',
        'premium': '0 10px 40px -15px rgba(14, 26, 52, 0.08)',
      },

      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}