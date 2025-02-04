// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',    // ירוק יוקרתי
        secondary: '#ff5722',  // כתום
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
