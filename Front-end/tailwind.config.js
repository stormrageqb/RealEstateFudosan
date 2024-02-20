module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primaryColor: "#0070f3",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
  plugins: [require("@tailwindcss/line-clamp")],
};
