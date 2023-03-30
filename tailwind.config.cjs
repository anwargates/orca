/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#88ceef',
        // white: '#ffffff',
        // black: '#000000',
        grey: '#E0DADA',
        greySecondary: '#979797',
        greyDot: '#D9D9D9',
        greyCategory: '#525252',
        blue: '#149BFC',
        blueSecondary: '#68B0D1',
      },
      backgroundImage: {
        banner: 'url("/src/assets/home/banner.png")',
      },
    },
  },
  plugins: [],
}
