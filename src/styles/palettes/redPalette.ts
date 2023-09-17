import { createTheme } from "@mui/material";
import { PaletteContract } from "../../types";
import {
  //accentYellow,
  accentOrange,
  white,
  black,
  buttonThemeToggleBackgroundColor,
  darkestGrey,
  //darkGrey,
  //mediumGrey,
  //lightGrey,
  //indicatorGreen,
  indicatorRed,
  //indicatorOrange,
  //indicatorYellowDark,
} from "./commonColors";

// Color definitions for YELLOW TEST PALETTE
const tomatoRed = "#FF2400";
const softPink = "#F2AEB8";
const lightPink = "#FAD6D1";
const redOrange = "#FF3333";
const bitterSweet = "#FF6666";
const salmonPink = "#FF8888";
const cherryBlossom = "#FF8888";
const brightRed = "#FF1111";
const pumpkinOrange = "#FF6600";
const clayBrown = "#B97446";
const darkOrange = "#EE9900";
const mediumBrown = "#8C4B2D"; // borderColor
const progressBarGreen = "#06FF00"; // Highlighter Green/Lime
const progressBarYellow = "#FFE400"; // Golden Yellow
const progressBarRed = "#FF1700"; // Scarlet red / almost the same as #FF1E00
const lightBlue2 = "#5DBCD2";
const blackRed = "#3D1D1D";
const blueRed = "#7759B2";
const someRed1 = "#ba68c8";

// color definitions and namings only above, below only using them!
// # character should not appear below this line

export const redPalette: PaletteContract = {
  name: "redPalette",
  common: {
    black: blackRed,
    white: lightPink,
  },
  primary: {
    main: redOrange,
    light: bitterSweet,
    dark: blueRed,
    contrastText: lightPink,
  },

  secondary: {
    main: salmonPink,
    light: someRed1,
    dark: blueRed,
    contrastText: lightPink,
  },
  error: {
    main: brightRed,
    light: "#FF99A2",
    dark: "#C70011",
    contrastText: lightPink,
  },
  warning: {
    main: pumpkinOrange,
    light: "#FFDC48",
    dark: "#AB6800",
    contrastText: lightPink,
  },
  info: {
    main: clayBrown,
    light: "#03a9f4",
    dark: "#01579b",
    contrastText: lightPink,
  },
  success: {
    main: darkOrange,
    light: "#6AE79C",
    dark: "#1AA251",
    contrastText: lightPink,
  },
  grey: {},

  contrastThreshold: 3,
  tonalOffset: 0.2,
  text: {
    primary: "#1A2027",
    secondary: "#3E5060",
    disabled: lightPink,
  },

  divider: bitterSweet,
  background: {
    paper: lightPink,
    default: tomatoRed,
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

  //own colors - RED
  activeLinkBackgroundColor: {
    main: accentOrange,
  },
  AllocRoom: {
    studio: {
      color: salmonPink,
    },
    luentoluokka: {
      color: darkOrange,
    },
    esitystila: {
      color: pumpkinOrange,
    },
    musiikkiluokka: {
      color: brightRed,
    },
  },
  backgroundDarker: { default: softPink },
  borderColor: {
    main: mediumBrown,
    cardBorder: lightBlue2,
  },
  borderColorDark: {
    main: black,
  },
  buttonThemeToggle: {
    main: buttonThemeToggleBackgroundColor,
  },
  edit: {
    main: bitterSweet,
    contrastText: lightPink,
  },
  fontColorDefault: { default: lightPink },
  helperText: {
    main: indicatorRed,
  },
  infoIcon: {
    main: blackRed,
  },

  progressBarBackground: {
    main: darkestGrey,
  },
  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },
  progressBarTextNonZero: {
    main: black,
  },
  progressBarTextZero: {
    main: white,
  },

  red: {
    main: cherryBlossom,
    contrastText: blackRed,
  },
  snackbarBackground: {
    default: brightRed,
  },
};

const theme = createTheme({
  palette: redPalette,
});

export default theme;
