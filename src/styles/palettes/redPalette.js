import { createTheme } from "@mui/material";

//redPalette
const tomatoRed = "#FF2400";
const softPink = "#F2AEB8";
const lightPink = "#FFD1CF";
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
const black = "#000000";

export const redPalette = {
  name: "redPalette",
  common: {
    black: "#1D1D1D",
    white: "#fff",
  },
  primary: {
    main: redOrange,
    light: bitterSweet,
    dark: "#0059B2",
    contrastText: "#ffffff",
  },

  secondary: {
    main: salmonPink,
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: "#ffffff",
  },
  error: {
    main: brightRed,
    light: "#FF99A2",
    dark: "#C70011",
    contrastText: "#ffffff",
  },
  warning: {
    main: pumpkinOrange,
    light: "#FFDC48",
    dark: "#AB6800",
    contrastText: "#000000",
  },
  info: {
    main: clayBrown,
    light: "#03a9f4",
    dark: "#01579b",
    contrastText: "#ffffff",
  },
  success: {
    main: darkOrange,
    light: "#6AE79C",
    dark: "#1AA251",
    contrastText: "#ffffff",
  },
  edit: {
    main: bitterSweet,
    contrastText: "#ffffff",
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
  text: {
    primary: "#1A2027",
    secondary: "#3E5060",
    disabled: "#ffffff",
  },
  infoIcon: {
    main: black,
  },
  divider: bitterSweet,
  background: {
    paper: "#ffffff",
    default: tomatoRed,
  },
  snackbarBackground: {
    default: brightRed,
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
  //own colors
  red: {
    main: cherryBlossom,
    contrastText: black,
  },
  backgroundDarker: { default: softPink },
  fontColorDefault: { default: lightPink },
  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },
  borderColor: {
    main: mediumBrown,
    cardBorder: lightBlue2,
  },
};

const theme = createTheme({
  palette: redPalette,
});

export default theme;
