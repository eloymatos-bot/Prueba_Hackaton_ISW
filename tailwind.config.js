/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.{html,js}",
    "./static/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        secondary: '#10b981',
      },
    },
  },
  plugins: [],
}
