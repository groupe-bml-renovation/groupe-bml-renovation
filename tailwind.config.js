const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
      },
      keyframes: {
        'burst-right': {
          '0%': {
            transform: 'translateX(0) translateY(-50%) scaleX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(150px) translateY(-50%) scaleX(1)',
            opacity: '0'
          }
        },
        'burst-left': {
          '0%': {
            transform: 'translateX(0) translateY(-50%) scaleX(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(-150px) translateY(-50%) scaleX(1)',
            opacity: '0'
          }
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
        }
      },
      animation: {
        'scroll': 'scroll 60s linear infinite',
        'scroll-reverse': 'scroll-reverse 60s linear infinite',
        'scroll-slow': 'scroll 120s linear infinite',
        'scroll-reverse-slow': 'scroll-reverse 120s linear infinite'
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
