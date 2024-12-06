/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        cormorant: ['Cormorant', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'background': '#F8F5EE',
        'foreground': '#F6EEDB',
        'primary-green': '#A3B28B',
        'secondary-green': '#53582F',
        'primary-beige': '#D5C7AA',
      },
    },
  },
  plugins: [],
}
