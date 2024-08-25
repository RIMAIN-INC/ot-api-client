/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customSalmon: '#E88D67',
        customHover: '#FF8225',
        tableButton: '#6C5F5B',
        buttonHover: '#D25380',

      }
    },
  },
  plugins: [],
}

