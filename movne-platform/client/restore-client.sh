#!/bin/bash

# Clean existing setup
rm -rf node_modules package-lock.json

# Create package.json with correct dependencies
cat > package.json << 'JSON'
{
  "name": "movne-client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^5.3.0",
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.3.3",
    "@tailwindcss/forms": "^0.5.3",
    "tailwindcss-rtl": "^0.9.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
JSON

# Install dependencies
npm install --legacy-peer-deps

# Start the application
npm start
