/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Colores inspirados en Stitch (prioridad en azules icónicos)
        primary: '#2972B6',          // Azul principal de Stitch (usa como accent principal)
        'stitch-blue': '#2972B6',    // Alias claro
        'stitch-light': '#4EBCFF',   // Highlights / cyan brillante
        'stitch-dark': '#002790',    // Sombras profundas
        'stitch-purple': '#945CB4',  // Morado de orejas / detalles traviesos
        'stitch-navy': '#001D4F',    // Fondo oscuro navy

        // Mantén o ajusta tus fondos para que combinen
        "background-light": "#FDFCF0",     // Light mode suave (como cielo hawaiano claro)
        'background-dark': '#0A1224',      // Dark mode (tu actual, perfecto para vibe Stitch nocturno)

        // Opcionales extras para acentos (rojo de Lilo o negro)
        'accent-red': '#ED192D',           // Rojo de Lilo o detalles
        'stitch-black': '#0A0A0A',
      },

      fontFamily: {
        // Lo que ya tenías ✅
        display: ['"Comic Sans MS"', '"Montserrat"', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],

        // 👉 NUEVA FUENTE AÑADIDA (Playfair Display con Swashes)
        playfair: ["'Playfair Display'", "serif"],
      },

      // Opcional: sombras con glow cyan como los ojos de Stitch
      boxShadow: {
        'stitch-glow': '0 0 15px rgba(78, 188, 255, 0.6)',
      },
    },
  },
  plugins: [],
}
