// import { dark } from "@mui/material/styles/createPalette";
import createTheme from "@mui/material/styles/createTheme";
import { PaletteContract } from "../../types";
import {
  accentOrange,
  accentYellow,
  black,
  darkGrey,
  darkestGrey,
  indicatorGreen,
  indicatorOrange,
  indicatorRed,
  indicatorYellowDark,
  lightGrey,
  transparentBlack,
  white,
} from "./commonColors";

// Color definitions for LIGHT

// color definitions and namings only above, below only using them!
// # character should not appear below this line

export const lightPalette: PaletteContract = {
  name: "light", // Changed name to "light"
  common: {
    black,
    white,
  },
  primary: {
    main: accentYellow,
    contrastText: darkGrey,
  },
  secondary: {
    main: darkGrey,
    contrastText: lightGrey,
  },
  error: {
    main: indicatorRed,
    contrastText: black,
  },
  warning: {
    main: indicatorRed,
    contrastText: black,
  },
  info: {
    main: indicatorOrange,
    contrastText: darkGrey,
  },
  success: {
    main: indicatorGreen,
    contrastText: white,
  },
  grey: {},
  contrastThreshold: 3,
  tonalOffset: 0.2,
  text: {
    primary: black,
    secondary: darkGrey,
    disabled: "#ffffff",
  },
  divider: black,
  background: {
    paper: lightGrey, // Changed paper background to lightGrey
    default: lightGrey,
  },
  action: {
    active: transparentBlack,
    hover: transparentBlack,
    hoverOpacity: 0.25,
    selected: transparentBlack,
    selectedOpacity: 0.15,
    disabled: transparentBlack,
    disabledBackground: transparentBlack,
    disabledOpacity: 0.38,
    focus: transparentBlack,
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },

  // own colors - LIGHT
  activeLinkBackgroundColor: {
    main: accentOrange,
  },
  /*
  AllocRoom: {
    studio: {
      color: indicatorRed,
    },
    luentoluokka: {
      color: indicatorYellowLight,
    },
    esitystila: {
      color: indicatorGreen,
    },
    musiikkiluokka: {
      color: indicatorYellowLight,
    },
  },
  */
  backgroundDarker: { default: white }, // Changed to use darkGrey
  borderColor: {
    main: lightGrey,
    cardBorder: black,
  },
  borderColorDark: {
    main: black,
  },
  buttonThemeToggle: {
    main: accentYellow,
  },
  edit: {
    main: indicatorOrange,
    contrastText: black,
  },
  fontColorDefault: { default: black },
  helperText: {
    main: indicatorRed,
  },
  infoIcon: {
    main: accentYellow,
  },

  progressBarBackground: {
    main: darkestGrey,
  },
  progressBarGreen: { main: indicatorGreen },
  progressBarYellow: { main: indicatorYellowDark },
  progressBarRed: { main: indicatorRed },
  progressBarTextNonZero: {
    main: black,
  },
  progressBarTextZero: {
    main: white,
  },

  red: {
    main: indicatorRed,
    contrastText: white,
  },
  snackbarBackground: {
    default: accentYellow,
  },
};

const theme = createTheme({
  palette: lightPalette,
});

export default theme;
