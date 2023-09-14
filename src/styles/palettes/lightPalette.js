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
const darkYellow = "#f6b751"; // changed to darker yellow so it's more readable
//const lightYellow = "#F6D251";   // removed, use the darkYellow
const green = "#48B058";
const orange = "#FDA826";

// color definitions and namings only above, below only using them!
// # character should not appear below this line

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
    primary: black,
    secondary: darkGrey,
    disabled: "#ffffff",
  },
  AllocRoom: {
    studio: {
      color: red,
    },
    luentoluokka: {
      color: darkYellow,
    },
    esitystila: {
      color: green,
    },
    musiikkiluokka: {
      color: darkYellow,
    },
  },
  divider: black,
  background: {
    paper: lightGrey, // Changed paper background to lightGrey
    default: lightGrey,
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
  backgroundDarker: { default: white }, // Changed to use darkGrey
  fontColorDefault: { default: black },
  progressBarGreen: { main: green },
  progressBarYellow: { main: darkYellow },
  progressBarRed: { main: red },
  borderColor: {
    main: lightGrey,
    cardBorder: black,
  },
  infoIcon: {
    main: yellow,
  },
};

const theme = createTheme({
  palette: lightPalette,
});

export default theme;
