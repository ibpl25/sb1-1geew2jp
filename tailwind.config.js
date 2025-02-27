/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#28663f',
          hover: '#1d4d2f',
          50: '#f0f9f2',
          100: '#dcf0e0',
          200: '#b8e0c1',
          300: '#8cc89a',
          400: '#5ba96d',
          500: '#28663f',
          600: '#235936',
          700: '#1d4d2f',
          800: '#183f26',
          900: '#132f1d',
        },
        accent: {
          DEFAULT: '#D36135',
          light: '#F9EFEA',
        },
        gold: '#C4A769',
        cream: {
          50: '#fdfbf7',
          100: '#faf5e9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        '2.5xl': '1.75rem',
        '3.5xl': '2rem',
        '4.5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};