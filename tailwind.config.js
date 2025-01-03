/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        brown: "#60382b",
        yellow: "#BE8A4D",
        white: "#fdfdfd",
        green: "#3D8C30",
        greenDark: "#2e6d25",
        brown_bg: "#BE8A4D17",
        brown_bg_light: "#be894d04",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif",
        poppins: "Poppins, sans-serif",
        montserrat: "Montserrat, sans-serif",
        art: "Edu AU VIC WA NT Arrows, cursive",
      },
      screens: {
        'xs': '470px', 
        }
    },
  },
  plugins: [],
};
