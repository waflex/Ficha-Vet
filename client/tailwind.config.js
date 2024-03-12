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
    extend: {},
    fontFamily: {
      sans: ['Inter var', 'system-ui', 'sans-serif'],
    },
  },
  plugins: [flowbitePlugin, animated],
};
