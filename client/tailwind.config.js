/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
import animated from '@midudev/tailwind-animations';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      scale: {
        200: '2',
        250: '2.5',
        300: '3',
        // Agrega más escalas según sea necesario
      },
    },
    fontFamily: {
      sans: ['Inter var', 'system-ui', 'sans-serif'],
      robot: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [flowbitePlugin, animated],
};
