const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'heading': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
      },
      keyframes: {
        'burst-right': {
          '0%': { transform: 'translate(0, 0)', opacity: '1' },
          '100%': { transform: 'translate(40px, 0)', opacity: '0' },
        },
        'burst-left': {
          '0%': { transform: 'translate(0, 0)', opacity: '1' },
          '100%': { transform: 'translate(-40px, 0)', opacity: '0' },
        },
        'scroll': {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-100%)'
          }
        },
        'scroll-reverse': {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      },
      animation: {
        'scroll': 'scroll 60s linear infinite',
        'scroll-reverse': 'scroll-reverse 60s linear infinite',
        'burst-right': 'burst-right 0.6s ease-out forwards',
        'burst-left': 'burst-left 0.6s ease-out forwards',
        'scroll-slow': 'scroll 120s linear infinite',
        'scroll-reverse-slow': 'scroll-reverse 120s linear infinite',
        'blob': 'blob 7s infinite',
      }
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
