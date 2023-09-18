import { createTheme } from "@mui/material";
import { PaletteContract } from "../../types";
import {
  accentYellow,
  accentOrange,
  white,
  black,
  darkestGrey,
  darkGrey,
  lightGrey,
  indicatorGreen,
  indicatorRed,
  indicatorOrange,
  indicatorYellowDark,
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
    main: lightGrey,
    contrastText: darkGrey,
  },
  error: {
    main: indicatorRed,
    contrastText: white,
  },
  warning: {
    main: indicatorRed,
    contrastText: white,
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

  // own colors - LIGHT
  activeLinkBackgroundColor: {
    main: accentOrange,
  },
  AllocRoom: {
    studio: {
      color: indicatorRed,
    },
    luentoluokka: {
      color: indicatorYellowDark,
    },
    esitystila: {
      color: indicatorGreen,
    },
    musiikkiluokka: {
      color: indicatorYellowDark,
    },
  },
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
    contrastText: white,
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
