/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- PALETA STITCH (Identidad) --- (todo intacto, no toqué nada)
        primary: '#2972B6',            // Azul principal de Stitch
        'stitch-blue': '#2972B6',
        'stitch-light': '#4EBCFF',     // Cyan brillante (Highlights)
        'stitch-dark': '#002790',      // Sombras profundas
        'stitch-purple': '#945CB4',    // Detalle de orejas
        'stitch-navy': '#001D4F',      // Navy de Stitch
        'navy': '#001D4F',             // Alias para compatibilidad con componentes

        // --- ACENTOS Y FONDOS --- (todo intacto)
        'accent': '#F5F1E8',           // Beige perlado (necesario para text-accent)
        'pearl-beige': '#F5F1E8',
        'accent-red': '#ED192D',       // Rojo Lilo
        'stitch-black': '#0A0A0A',
        
        "background-light": "#FDFCF0", // Cielo hawaiano
        'background-dark': '#0A1224',  // Espacio profundo

        // --- COLORES PAYMENT / LJM SEALINE --- (agregados para que coincida con la segunda captura)
        'night-blue': '#0e1a34',       // Azul profundo del sidebar y textos principales
        'maroon-gold': '#785d32',      // Dorado oscuro para acentos premium
        'off-white': '#f8f9fa',        // Fondo principal claro y elegante
        'card-white': '#ffffff',       // Tarjetas y fondos blancos limpios

        // Colores extras útiles para el estilo luxury (opcionales pero recomendados)
        'text-secondary': '#4b5563',   // Gris para textos secundarios
        'border-light': '#e5e7eb',     // Bordes suaves grises claros
      },

      fontFamily: {
        // 'display' para títulos (Comic Sans le da el toque divertido de Stitch)
        display: ['"Comic Sans MS"', '"Montserrat"', 'sans-serif'],
        // 'body' y 'sans' para lectura limpia
        sans: ['Montserrat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        playfair: ["'Playfair Display'", "serif"],
      },

      boxShadow: {
        // Efecto neón tipo ojos de Stitch o tecnología alienígena (intacto)
        'stitch-glow': '0 0 15px rgba(78, 188, 255, 0.6)',
        'stitch-glow-strong': '0 0 25px rgba(41, 114, 182, 0.8)',
        // Sombra premium suave para tarjetas y elementos LJM Sealine
        'premium': '0 10px 40px -15px rgba(14, 26, 52, 0.08)',
      },

      // Mantener bordes suaves pero definidos (intacto)
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