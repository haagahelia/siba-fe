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

const lightBlue = "#73FDFF";
//const lightBlue2 = "#5DBCD2";   // removed
const canary = "#FFFF8F";
const paleCanary = "#FFFFAA";
const sahara = "#AAAA11";
const buddhaGold = "#CC9900";
const paleLime = "#CCFF66";
const saffronMango = "#FFBB66";
const tangerineYellow = "#FFCC00";
const eggWhite = "#F2F2BF";
const greenYellow = "#CCFF33";
const butteryWhite = "#FFFFE6";
//const softPink = "#F2AEB8";
const mediumBrown = "#8C4B2D"; // borderColor
const progressBarGreen = "#06FF00"; // Highlighter Green/Lime
const progressBarYellow = "#FFE400"; // Golden Yellow
const progressBarRed = "#FF1700"; // Scarlet red / almost the same as #FF1E00

// color definitions and namings only above, below only using them!
// # character should not appear below this line

export const yellowPalette: PaletteContract = {
  name: "yellowPallette",
  common: {
    black: "#1D1D1D",
    white: butteryWhite,
  },
  primary: {
    main: buddhaGold,
    light: paleLime,
    dark: "#0059B2",
    contrastText: butteryWhite,
  },
  secondary: {
    main: paleCanary,
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: butteryWhite,
  },
  error: {
    main: tangerineYellow,
    light: "#FF99A2",
    dark: "#C70011",
    contrastText: butteryWhite,
  },
  warning: {
    main: eggWhite,
    light: "#FFDC48",
    dark: "#AB6800",
    contrastText: mediumBrown,
  },
  info: {
    main: greenYellow,
    light: "#03a9f4",
    dark: "#01579b",
    contrastText: butteryWhite,
  },
  success: {
    main: sahara,
    light: "#6AE79C",
    dark: "#1AA251",
    contrastText: butteryWhite,
  },
  grey: {},
  contrastThreshold: 3,
  tonalOffset: 0.2,
  text: {
    primary: "#1A2027",
    secondary: "#3E5060",
    disabled: butteryWhite,
  },
  divider: "#E7EBF0",
  background: {
    paper: sahara,
    default: canary,
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

  // own colors - YELLOW
  activeLinkBackgroundColor: {
    main: accentOrange,
  },
  AllocRoom: {
    studio: {
      color: paleLime,
    },
    luentoluokka: {
      color: saffronMango,
    },
    esitystila: {
      color: tangerineYellow,
    },
    musiikkiluokka: {
      color: buddhaGold,
    },
  },
  backgroundDarker: { default: eggWhite },
  borderColor: {
    main: mediumBrown,
    cardBorder: lightBlue,
  },
  borderColorDark: {
    main: black,
  },
  buttonThemeToggle: {
    main: buttonThemeToggleBackgroundColor,
  },
  edit: {
    main: saffronMango,
    contrastText: butteryWhite,
  },
  fontColorDefault: { default: sahara },
  helperText: {
    main: indicatorRed,
  },
  infoIcon: {
    main: paleLime,
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
    main: saffronMango,
  },
  snackbarBackground: {
    default: paleCanary,
  },
};
/* More yellow tint values used from here: 
  "#FFFF11" Sunny Yellow,  "#BB7700" Mustard Brown
*/

const theme = createTheme({
  palette: yellowPalette,
});

export default theme;
