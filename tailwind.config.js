/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mona: ['"Mona Sans"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        script: ['"Redacted Script"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: {
          orange: '#ea580c',
          lime: '#84cc16',
          purple: '#8b5cf6',
          pink: '#ec4899',
          blue: '#0284c7'
        }
      }
    },
  },
  plugins: [],
}