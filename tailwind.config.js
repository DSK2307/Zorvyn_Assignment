/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eef9f8',
          100: '#d4f0ee',
          200: '#ace2dd',
          300: '#76cdc7',
          400: '#43b4ae',
          500: '#269994',
          600: '#1d7a76',
          700: '#1b6360',
          800: '#1b4f4d',
          900: '#1a4240',
          950: '#0a2726',
        },
        navy: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          700: '#1e3a5f',
          800: '#162d4a',
          900: '#0e1f35',
          950: '#080f1c',
        }
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px -4px rgba(0,0,0,0.12)',
        'card-lg': '0 4px 16px -2px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
