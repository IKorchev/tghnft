module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        bggradient1: "#2A313D",
        bggradient2: "#141517",
        "primary-yellow": "#FFDF40",
        "negative-red": "#D6507E",
        "positive-green": "#50D6A4",
        "card-gray": "#333B48",
        secondary: "#1B2331",
      },
      backgroundImage: {
        "background-full": "url('/assets/nfts/BG.png')",
      },
    },
  },
  variants: {},
}
