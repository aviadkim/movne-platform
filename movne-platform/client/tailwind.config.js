module.exports = {
  content: ["/workspaces/movne-platform/movne-platform/client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        finance: {
          50: '#f5f9ff',
          100: '#e8f1ff',
          200: '#b9d4f2',
          300: '#003366',
          400: '#001f4d',
          500: '#1a365d',
          600: '#0a2647',
          700: '#051937'
        },
        stone: {
          100: '#f7f7f7',
          200: '#ededed',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#454545'
        },
        trust: {
          400: '#2c5282',
          500: '#036666'
        }
      }
    }
  },
  plugins: [require('tailwindcss-rtl')]
}
