import { createTheme } from "@mui/material";

// Common
const black = "#000000";
const white = "#ffffff";

// Primary
const darkGrey = "#353535";
const mediumGrey = "#555555";
const lightGrey = "#D9D9D9";

// Accent
const yellow = "#F4BF00";

// Status indicators
const red = "#D62E3D";
const lightYellow = "#F6D251";
const green = "#48B058";
const orange = "#FDA826";

// color definitions and namings only above, below only using them!
// # character should not appear below this line

export const darkPalette = {
  name: "dark",
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
    disabled: white,
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
    paper: mediumGrey,
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
  backgroundDarker: {
    default: mediumGrey,
  },
  fontColorDefault: {
    default: white,
  },
  progressBarGreen: {
    main: green,
  },
  progressBarYellow: {
    main: lightYellow,
  },
  progressBarRed: {
    main: red,
  },
  borderColor: {
    main: lightGrey,
    cardBorder: white,
  },
  infoIcon: {
    main: yellow,
  },
};

const theme = createTheme({
  palette: darkPalette,
});

export default theme;
