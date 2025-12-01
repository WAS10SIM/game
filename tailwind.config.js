/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'love-pink': '#FFB6C1',
        'love-red': '#FF69B4',
        'love-purple': '#DDA0DD',
      },
    },
  },
  plugins: [],
}

