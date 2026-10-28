/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      colors: {
        tulip: {
          50: '#FDF8F9',
          100: '#FCEEF2',
          200: '#F9DCE5',
          300: '#F4BFD0',
          400: '#EC95B2',
          500: '#E06C93',
          600: '#C94B76',
          700: '#A8385E',
          800: '#8B2F4F',
          900: '#752A44',
        },
        cream: {
          50: '#FFFDFB',
          100: '#FDF9F5',
          200: '#F9F1E8',
          300: '#F2E4D5',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E4ECE5',
          200: '#CAD9CC',
          300: '#A3BEAA',
          400: '#769B80',
          500: '#557D60',
          600: '#41634B',
          700: '#35503D',
        }
      },
      animation: {
        'sway': 'sway 5s ease-in-out infinite',
        'sway-slow': 'sway 7s ease-in-out infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-2.5deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.7, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
};
