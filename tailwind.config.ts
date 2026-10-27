import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: '#071B49',
        royal: '#123D8D',
        sapphire: '#2456A4',
        ivory: '#FFFAF0',
        gold: '#E7C779',
        silver: '#D7DCE5'
      },
      boxShadow: {
        glow: '0 0 30px rgba(231, 199, 121, 0.35)',
        soft: '0 18px 45px rgba(7, 27, 73, 0.18)'
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'Segoe UI', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
