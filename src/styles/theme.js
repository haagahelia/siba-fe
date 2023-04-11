import { createTheme } from "@mui/material";
// import { green, lightBlue } from "@mui/material/colors";

// First a place for defining different kinds of colors
const darkBrown = "#272121";
const lightGray = "#363333"; // E.g. background

const light = "#F6E9E9";
const orange = "#E16428";

const fontWhite = "#FFFFFF";

const lightGreen = "#90EE90";
const lightBlue = "#73FDFF";
const lightBlue2 = "#5DBCD2";
const lightYellow = "#FFF5AB";
const lightRed = "#FF8585";

const borderColor = "#8C4B2D";

const buttonOrange = "#E16428";
const buttonGreen = "#54B435";
const buttonRed = "#FF1E00"; // Reset button

const progressBarGreen = "#06FF00";
const progressBarYellow = "#FFE400";
const progressBarRed = "#FF1700";

const snackbarErrorRed = buttonRed;
const snackbarWarningOrange = "#FFA000";
const snackbarInformationBlue = "#1976D2";
const snackbarSuccessGreen = "#43A047";

// Then defining three palettes so that in the normal palette
// no new colors are defined. Red and yellow palettes though are
// used with ad-hoc "#AABBCC" kind of RGB hexadecimal color definitions

export const normalPalette = {
  background: { default: lightGray },
  backgroundDarker: { default: darkBrown },
  fontColorDefault: { default: fontWhite },
  primary: {
    main: buttonGreen,
    light: lightBlue2,
  },
  secondary: {
    main: buttonOrange,
  },
  red: {
    main: buttonRed,
  },
  error: { main: snackbarErrorRed },
  warning: { main: snackbarWarningOrange },
  information: { main: snackbarInformationBlue },
  success: { main: snackbarSuccessGreen },

  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },

  borderColor: { main: borderColor },
};

export const yellowPalette = {
  background: { default: "#FFFF8F" },
  backgroundDarker: { default: "#FFFFAA" },
  fontColorDefault: { default: "#AAAA11" },
  primary: {
    main: "#CC9900",
    light: "#CCFF66",
  },
  secondary: {
    main: "#FFFF99",
  },
  red: {
    main: "#FFBB66",
  },
  error: { main: "#FFCC00" },
  warning: { main: "#F2F2BF" },
  information: { main: "#CCFF33" },
  success: { main: "#FFFFE6" },

  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },

  borderColor: { main: borderColor },
};
/* More yellow tint values used from here: 
  "#FFFF11"  "#BB7700"
*/

export const redPalette = {
  background: { default: "#FF2400" },
  backgroundDarker: { default: "#F2AEB8" },
  fontColorDefault: { default: "#FFD1CF" },
  primary: {
    main: "#FF3333",
    light: "#FF6666",
  },
  secondary: {
    main: "#FF8888",
  },
  red: {
    main: "#FFBBBB",
  },
  error: { main: "#FF1111" },
  warning: { main: "#FF6600" },
  information: { main: "#B97446" },
  success: { main: "#EE9900" },

  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },

  borderColor: { main: borderColor },
};
/* More red tint values used from here: 
 "#FF2222" "#FF9AD5" "#AC3939"
*/

// The swapping fast what palette will be in use right now:
const currentPalette = normalPalette;
// Options are       = normalPalette, redPalette, yellowPalette

const theme = createTheme({
  palette: currentPalette,

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: currentPalette.backgroundDarker.default,
          borderColor: light,
          width: "75%",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: currentPalette.background.default,
          fontSize: 25,
          color: currentPalette.fontColorDefault.default,
          marginBottom: "15px",
          padding: "20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: currentPalette.backgroundDarker.default,
          "& label": {
            color: light,
          },
          "& label.Mui-focused": {
            color: orange,
          },
          "& .MuiOutlinedInput-root": {
            color: light,
            "& fieldset": {
              borderColor: orange,
            },
            "&:hover fieldset": {
              borderColor: light,
            },
            "&.Mui-focused fieldset": {
              borderColor: light,
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: light,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& label": {
            color: currentPalette.fontColorDefault.default,
          },
          "& label.Mui-focused": {
            color: orange,
          },
          "& .MuiFormHelperText-root": {
            color: "red",
          },
          "& .MuiOutlinedInput-root": {
            color: light,
            "& fieldset": {
              borderColor: orange,
            },
            "&:hover fieldset": {
              borderColor: light,
            },
            "&.Mui-focused fieldset": {
              borderColor: light,
            },
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: currentPalette.backgroundDarker.default,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: currentPalette.backgroundDarker.default,
          color: light,
          border: "1px solid #F6E9E9",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: currentPalette.backgroundDarker.default,
          color: light,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: light,
        },
      },
    },
    AllocRoom: {
      studio: {
        color: lightRed,
      },
      luentoluokka: {
        color: lightBlue,
      },
      esitystila: {
        color: lightGreen,
      },
      musiikkiluokka: {
        color: lightYellow,
      },
    },
    IndexRooms: {
      studioindex: {
        width: 15,
        height: 15,
        backgroundColor: lightRed,
        border: "3px solid",
        borderColor: "black",
        marginLeft: 60,
      },
      luentoluokkaindex: {
        width: 15,
        height: 15,
        backgroundColor: lightBlue,
        border: "3px solid",
        borderColor: "black",
        marginLeft: 60,
      },
      esitystilaindex: {
        width: 15,
        height: 15,
        backgroundColor: lightGreen,
        border: "3px solid",
        borderColor: "black",
        marginLeft: 60,
      },
      musiikkiluokkaindex: {
        width: 15,
        height: 15,
        backgroundColor: lightYellow,
        border: "3px solid",
        borderColor: "black",
        marginLeft: 60,
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          backgroundColor: "pink",
          color: light,
        },
      },
      redbutton: {
        backgroundColor: "red",
        color: light,
      },
      editbutton: {
        backgroundColor: buttonOrange,
        color: light,
      },
      greenbutton: {
        backgroundColor: "green",
        color: light,
      },
    },

    MuiPagination: {
      styleOverrides: {
        root: {
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          button: {
            color: light,
            borderColor: orange,
          },
        },
      },
    },
  },
});

export default theme;

/* In other components, how to get access to the Theme and its settings?
  
     import { useTheme } from "@mui/material/styles";
     ...
       const theme = useTheme(); 

*/
