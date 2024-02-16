module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
