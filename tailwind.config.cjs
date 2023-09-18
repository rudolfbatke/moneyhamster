/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#2B788B',
        gray: '#757575',
        'gray-light': '#F6F5F4',
        warning: 'red'
      },
      fontFamily: {
        header: ['Dela Gothic One', 'cursive'],
        body: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
};
