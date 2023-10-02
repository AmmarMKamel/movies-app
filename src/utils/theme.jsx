import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    type: "light",

    primary: {
      main: "#da0037",
    },
    secondary: {
      main: "#171717",
    },
    background: {
      default: "#fafafa",
      staticLight: "#fafafa",
      staticDark: "#171717",
    },
    text: {
      primary: "#444444",
      secondary: "#fffbfb",
    },
  },
  custom: {
    toggleButton: "#da0037",
    toggleButtonBackground: "#fafafa",
    searchBgColor: "#afafaf44",
    highRating: "#21cf79",
    medRating: "#d2d531",
    lowRating: "#da0037"
  },
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#da0037",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#171717",
      staticLight: "#fafafa",
      staticDark: "#171717",
    },
    text: {
      primary: "#fffbfb",
      secondary: "#fffbfb",
    },
  },
  custom: {
    toggleButton: "#BB1C44",
    toggleButtonBackground: "#da0037",
    searchBgColor: "#afafaf22",
    highRating: "#21cf79",
    medRating: "#d2d531",
    lowRating: "#da0037"
  },
});

export { lightTheme, darkTheme };
