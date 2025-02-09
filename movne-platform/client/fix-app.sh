#!/bin/bash

# Clean existing setup
rm -rf node_modules package-lock.json

# Install core dependencies first
npm install --save \
  react@18.2.0 \
  react-dom@18.2.0 \
  react-router-dom@5.3.0 \
  react-scripts@5.0.1 \
  tailwindcss@3.3.3 \
  @tailwindcss/forms@0.5.3 \
  tailwindcss-rtl@0.9.0 \
  --legacy-peer-deps

# Update tailwind.config.js
cat > tailwind.config.js << 'CONFIG'
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
CONFIG

# Install remaining dependencies
npm install --legacy-peer-deps

# Start the application
npm start
