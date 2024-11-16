const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#242629',
        'card-background': '#16161a',
        headline: '#ffffff',
        'sub-headline': '#94a1b2',
        'card-heading': '#ffffff',
        'card-paragraph': '#94a1b2',
        stroke: '#010101',
        main: '#ffffff',
        secondary: '#72757e',
        tertiary: '#2cb67d',
        highlight: '#9b5de5',
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        heading: ['Montserrat', ...defaultTheme.fontFamily.sans],
        narrow: ['PT Sans Narrow', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      animation: {
        gradient: 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
