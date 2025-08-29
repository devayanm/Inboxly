/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        ink: '#000000',
        navyDeep: '#14213D',
        accent: '#FCA311',
        grayLight: '#E5E5E5',
        paper: '#FFFFFF'
      }
    },
  },
  plugins: [],
}

