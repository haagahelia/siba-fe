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
//yellowPalette
const canary = "#FFFF8F";
const paleCanary = "FFFFAA";
const sahara = "#AAAA11";
const buddhaGold = "CC9900";
const paleLime = "#CCFF66";
const saffronMango = "#FFBB66";
const tangerineYellow = "#FFCC00";
const eggWhite = "#F2F2BF";
const greenYellow = "#CCFF33";
const butteryWhite = "#FFFFE6";
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

const buttonOrange = "#E16428"; // Halloween Orange
const buttonGreen = "#54B435"; // Apple green
const buttonRed = "#FF1E00"; // Reset button Ruby red

const progressBarGreen = "#06FF00"; // Highlighter Green/Lime
const progressBarYellow = "#FFE400"; // Golden Yellow
const progressBarRed = "#FF1700"; // Scarlet red / almost the same as #FF1E00

const snackbarErrorRed = buttonRed;
const snackbarWarningOrange = "#FFA000"; // Orange Peel
const snackbarInformationBlue = "#1976D2"; // Navy Blue
const snackbarSuccessGreen = "#43A047"; // Medium Green

// Then defining three palettes so that in the normal palette
// no new colors are defined. Red and yellow palettes though are
// used with ad-hoc "#AABBCC" kind of RGB hexadecimal color definitions

export const normalPalette = {
  background: { default: lightGray },
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
  info: { main: snackbarInformationBlue },
  success: { main: snackbarSuccessGreen },

  backgroundDarker: { default: darkBrown },
  fontColorDefault: { default: fontWhite },
  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },

  borderColor: { main: mediumBrown },
};

export const yellowPalette = {
  background: { default: canary },
  primary: {
    main: buddhaGold,
    light: paleLime,
  },
  secondary: {
    main: paleCanary,
  },
  red: {
    main: saffronMango,
  },
  error: { main: tangerineYellow },
  warning: { main: eggWhite },
  info: { main: greenYellow },
  success: { main: butteryWhite },

  backgroundDarker: { default: paleCanary },
  fontColorDefault: { default: sahara },
  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },

  borderColor: { main: mediumBrown },
};
/* More yellow tint values used from here: 
  "#FFFF11" Sunny Yellow,  "#BB7700" Mustard Brown
*/

export const redPalette = {
  background: { default: tomatoRed },
  primary: {
    main: redOrange,
    light: bitterSweet,
  },
  secondary: {
    main: salmonPink,
  },
  red: {
    main: cherryBlossom,
  },
  error: { main: brightRed },
  warning: { main: pumpkinOrange },
  info: { main: clayBrown },
  success: { main: darkOrange },

  backgroundDarker: { default: softPink },
  fontColorDefault: { default: lightPink },
  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },

  borderColor: { main: mediumBrown },
};
/* More red tint values used from here: 
 "#FF2222" Torch Red, "#FF9AD5" Lavender Rose, "#AC3939" Dull Red
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
          margin: "auto",
          marginTop: "20px",
          padding: "8px",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: currentPalette.background.default,
          fontSize: 25,
          color: currentPalette.fontColorDefault.default,
          marginBottom: "30px",
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
    MuiDialogContent: {
      variants: [
        {
          props: { variant: "sibaDialogContent" },
          style: {
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
          },
        },
      ],
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
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: "center",
          padding: "16px",
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
        contained: {
          color: "#ffffff",
        },
        text: {
          backgroundColor: "pink",
          color: light,
        },
      },
      redbutton: {
        backgroundColor: buttonRed,
        color: light,
      },
      editbutton: {
        backgroundColor: buttonOrange,
        color: light,
      },
      greenbutton: {
        backgroundColor: buttonGreen,
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
    MuiTypography: {
      variants: [
        {
          props: { variant: "boldTitle" },
          style: {
            fontFamily: "Roboto, Helvetica, Aria, sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.5,
            letterSpacing: "0.00938em",
          },
        },
      ],
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          marginTop: 20,
          padding: 16,
        },
      },
      variants: [
        {
          props: { variant: "addBuildingForm" },
          style: {
            columnGap: 8,
            rowGap: 8,
            padding: 8,
            alignItems: "center",
            justifyContent: "space-evenly",
          },
        },
        {
          props: { variant: "buildingDisplay" },
          style: {
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: 16,
          },
        },
        {
          props: { variant: "sibaGridEdit" },
          style: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          },
        },
      ],
    },
  },
});

export default theme;

/* In other components, how to get access to the Theme and its settings?
  
     import { useTheme } from "@mui/material/styles";
     ...
       const theme = useTheme(); 

*/
