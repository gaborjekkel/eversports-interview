import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      grey700: '#434343',
      grey500: '#727272',
      grey400: '#A1A1A1',
      grey200: '#E0E0E0',
      green700: '#14645A',
      green500: '#21A696',
      blue100: '#F9FBFB',
      red700: '#C53030'
    },
    boxShadow: {
      m: '0px 8px 16px 0px rgba(20, 20, 20, 0.16)',
      primaryButton: '0px 1px 1px 0px rgba(33, 166, 150, 0.24)',
    }
  },
  plugins: [],
};
export default config;
