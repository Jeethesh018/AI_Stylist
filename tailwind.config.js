/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0f0f0f',
        accent: '#f97316'
      },
      boxShadow: {
        glow: '0 10px 35px rgba(249, 115, 22, 0.25)',
        panel: '0 20px 40px rgba(0, 0, 0, 0.45)'
      },
      backdropBlur: {
        xl: '20px'
      }
    }
  },
  plugins: []
};
