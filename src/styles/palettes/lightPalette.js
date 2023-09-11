import { createTheme } from "@mui/material";

// Color definitions

// Common
const black = "#000000";
const white = "#ffffff";

// Primary
const darkGrey = "#353535";
const lightGrey = "#D9D9D9";

// Accent
const yellow = "#F4BF00";

// Status indicators
const red = "#D62E3D";
const lightYellow = "#F6D251";
const green = "#48B058";
const orange = "#FDA826";

export const lightPalette = {
  name: "light", // Changed name to "light"
  common: {
    black,
    white,
  },
  primary: {
    main: yellow,
    contrastText: darkGrey,
  },
  secondary: {
    main: lightGrey,
    contrastText: darkGrey,
  },
  error: {
    main: red,
    contrastText: white,
  },
  warning: {
    main: red,
    contrastText: white,
  },
  info: {
    main: orange,
    contrastText: darkGrey,
  },
  success: {
    main: green,
    contrastText: white,
  },
  edit: {
    main: orange,
    contrastText: white,
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
  text: {
    primary: white,
    secondary: darkGrey,
    disabled: "#ffffff",
  },
  AllocRoom: {
    studio: {
      color: red,
    },
    luentoluokka: {
      color: lightYellow,
    },
    esitystila: {
      color: green,
    },
    musiikkiluokka: {
      color: lightYellow,
    },
  },
  divider: lightGrey,
  background: {
    paper: lightGrey, // Changed paper background to lightGrey
    default: darkGrey,
  },
  snackbarBackground: {
    default: yellow,
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.25,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.15,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  red: {
    main: red,
    contrastText: white,
  },
  backgroundDarker: { default: darkGrey }, // Changed to use darkGrey
  fontColorDefault: { default: white },
  progressBarGreen: { main: green },
  progressBarYellow: { main: lightYellow },
  progressBarRed: { main: red },
  borderColor: {
    main: lightGrey,
    cardBorder: white,
  },
  infoIcon: {
    main: yellow,
  },
};

const theme = createTheme({
  palette: lightPalette,
});

export default theme;
