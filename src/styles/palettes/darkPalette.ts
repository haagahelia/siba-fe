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
  indicatorYellowLight,
  lightGrey,
  mediumGrey,
  transparentBlack,
  white,
} from "./commonColors";

// Color definitions for DARK

// color definitions and namings only above, below only using them!
// # character should not appear below this line

export const darkPalette: PaletteContract = {
  name: "dark",
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
    primary: white,
    secondary: darkGrey,
    disabled: white,
  },
  divider: lightGrey,
  background: {
    paper: mediumGrey,
    default: darkGrey,
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

  // own colors - DARK
  activeLinkBackgroundColor: {
    main: accentOrange,
  },
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
  backgroundDarker: {
    default: mediumGrey,
  },
  borderColor: {
    main: lightGrey,
    cardBorder: white,
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
  fontColorDefault: {
    default: white,
  },
  helperText: {
    main: indicatorRed,
  },
  infoIcon: {
    main: accentYellow,
  },

  progressBarBackground: {
    main: darkestGrey,
  },
  progressBarGreen: {
    main: indicatorGreen,
  },
  progressBarYellow: {
    main: indicatorYellowLight,
  },
  progressBarRed: {
    main: indicatorRed,
  },
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
  palette: darkPalette,
});

export default theme;
