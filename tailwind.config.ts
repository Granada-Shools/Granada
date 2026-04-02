import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Euclid Circular A", "sans-serif"],
        sans: ["Euclid Circular A", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        primary: "#213558",
        secondary: "#aac20c",
        dark: "#0d0c0d",
        gray: "#afaeaf",
        "accent-warm": "#936c51",
        "accent-green": "#436b0d",
        "accent-light": "#ecfb94",
        "accent-pink": "#d52978",
        "accent-blue": "#0d88e4",
      },
    },
  },
  plugins: [],
};
export default config;
