module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'finance': {
          300: '#2563eb',
          400: '#1d4ed8',
        },
        'trust': {
          400: '#059669',
          500: '#047857',
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-rtl')
  ]
};
