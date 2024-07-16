/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins-light':['PoppinsLight','sans-serif'],
        'poppins-bold':['PoppinsBold','sans-serif'],

      },
    },
  },
  plugins: [],
}

