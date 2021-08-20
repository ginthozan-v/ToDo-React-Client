module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Anton: "'Anton', sans-serif",
      OpenSans: "'Open Sans', sans-serif",
    },
    extend: {
      height: {
        100: "32rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
