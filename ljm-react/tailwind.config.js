/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- PALETA STITCH (Identidad) ---
        primary: '#2972B6',            // Azul principal de Stitch
        'stitch-blue': '#2972B6',
        'stitch-light': '#4EBCFF',     // Cyan brillante (Highlights)
        'stitch-dark': '#002790',      // Sombras profundas
        'stitch-purple': '#945CB4',    // Detalle de orejas
        'stitch-navy': '#001D4F',      // Navy de Stitch
        'navy': '#001D4F',             // Alias para compatibilidad con componentes

        // --- ACENTOS Y FONDOS ---
        'accent': '#F5F1E8',           // Beige perlado (necesario para text-accent)
        'pearl-beige': '#F5F1E8',
        'accent-red': '#ED192D',       // Rojo Lilo
        'stitch-black': '#0A0A0A',
        
        "background-light": "#FDFCF0", // Cielo hawaiano
        'background-dark': '#0A1224',  // Espacio profundo

        // --- COLORES PAYMENT / EXTRAS ---
        'night-blue': '#0D1B2A',
        'maroon-gold': '#8B6F47',
        'off-white': '#FEFDFB',
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
        // Efecto neón tipo ojos de Stitch o tecnología alienígena
        'stitch-glow': '0 0 15px rgba(78, 188, 255, 0.6)',
        'stitch-glow-strong': '0 0 25px rgba(41, 114, 182, 0.8)',
      },

      // Mantener bordes suaves pero definidos
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