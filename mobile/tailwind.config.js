/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        giest: [
          "Giest-Regular",
          "Giest-Bold",
          "Giest-Medium",
          "Giest-SemiBold",
          "Giest-ExtraBold",
          "Giest-ExtraLight",
          "Giest-Light",
          "Giest-Thin",
        ],
      },
    },
  },
  plugins: [],
};
