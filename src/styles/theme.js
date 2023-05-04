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
const paleCanary = "#FFFFAA";
const sahara = "#AAAA11";
const buddhaGold = "#CC9900";
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
  // mode: "light",
  common: {
    black: "#1D1D1D",
    white: "#fff",
  },
  primary: {
    main: buttonGreen,
    light: lightBlue2,
    dark: "#0059B2",
    contrastText: "#ffffff",
  },
  secondary: {
    main: buttonOrange,
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: "#ffffff",
  },
  error: {
    main: snackbarErrorRed,
    light: "#FF99A2",
    dark: "#C70011",
    contrastText: "#ffffff",
  },
  warning: {
    main: snackbarWarningOrange,
    light: "#FFDC48",
    dark: "#AB6800",
    contrastText: "#000000",
  },
  info: {
    main: snackbarInformationBlue,
    light: "#03a9f4",
    dark: "#01579b",
    contrastText: "#ffffff",
  },
  success: {
    main: snackbarSuccessGreen,
    light: "#6AE79C",
    dark: "#1AA251",
    contrastText: "#ffffff",
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
  text: {
    primary: "#1A2027",
    secondary: "#3E5060",
    disabled: "#ffffff",
  },
  divider: "#E7EBF0",
  background: {
    paper: "#ffffff",
    default: lightGray,
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  //own colors
  red: {
    main: buttonRed,
  },
  backgroundDarker: { default: darkBrown },
  fontColorDefault: { default: fontWhite },
  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },
  borderColor: {
    main: mediumBrown,
    cardBoder: light,
  },
};

export const yellowPalette = {
  // mode: "light",
  common: {
    black: "#1D1D1D",
    white: "#fff",
  },
  primary: {
    main: buddhaGold,
    light: paleLime,
    dark: "#0059B2",
    contrastText: "#ffffff",
  },
  secondary: {
    main: paleCanary,
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: "#ffffff",
  },
  error: {
    main: tangerineYellow,
    light: "#FF99A2",
    dark: "#C70011",
    contrastText: "#ffffff",
  },
  warning: {
    main: eggWhite,
    light: "#FFDC48",
    dark: "#AB6800",
    contrastText: "#000000",
  },
  info: {
    main: greenYellow,
    light: "#03a9f4",
    dark: "#01579b",
    contrastText: "#ffffff",
  },
  success: {
    main: butteryWhite,
    light: "#6AE79C",
    dark: "#1AA251",
    contrastText: "#ffffff",
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
  text: {
    primary: "#1A2027",
    secondary: "#3E5060",
    disabled: "#ffffff",
  },
  divider: "#E7EBF0",
  background: {
    paper: "#ffffff",
    default: canary,
  },
  // own colors
  red: {
    main: saffronMango,
  },
  backgroundDarker: { default: paleCanary },
  fontColorDefault: { default: sahara },
  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },
  borderColor: {
    main: mediumBrown,
    cardBoder: lightBlue,
  },
};
/* More yellow tint values used from here: 
  "#FFFF11" Sunny Yellow,  "#BB7700" Mustard Brown
*/

export const redPalette = {
  // mode: "light",
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
  contrastThreshold: 3,
  tonalOffset: 0.2,
  text: {
    primary: "#1A2027",
    secondary: "#3E5060",
    disabled: "#ffffff",
  },
  background: {
    paper: "#ffffff",
    default: tomatoRed,
  },
  //own colors
  red: {
    main: cherryBlossom,
  },
  backgroundDarker: { default: softPink },
  fontColorDefault: { default: lightPink },
  progressBarGreen: { main: progressBarGreen },
  progressBarYellow: { main: progressBarYellow },
  progressBarRed: { main: progressBarRed },
  borderColor: {
    main: mediumBrown,
    cardBoder: lightBlue2,
  },
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
          borderColor: currentPalette.borderColor.cardBoder,
          width: "75%",
          margin: "auto",
          marginTop: "100px",
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
            color: currentPalette.fontColorDefault.default,
          },
          "& label.Mui-focused": {
            color: orange,
          },
          "& .MuiOutlinedInput-root": {
            color: light,
            "& fieldset": {
              borderColor: currentPalette.borderColor.main,
            },
            "&:hover fieldset": {
              borderColor: currentPalette.borderColor.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: currentPalette.borderColor.main,
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
      variants: [
        {
          props: { variant: "sibaAppBarHorizontal" },
          style: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "flex-start",
            height: "80px",
            fontSize: "1.2rem",
            position: "sticky",
            top: 0,
            zIndex: 20,
            marginRight: "2rem",
          },
        },
        {
          props: { variant: "sibaAppBarVertival" },
          style: {
            display: "flex",
            flexDirection: "column",
            opacity: 1,
            transition: "all 0.5s ease",
          },
        },
      ],
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: currentPalette.backgroundDarker.default,
          color: light,
          border: `1px solid ${currentPalette.borderColor.cardBoder}`,
        },
      },
      variants: [
        {
          props: { variant: "sibaAppBarHorizontal" },
          style: {
            borderColor: currentPalette.backgroundDarker.default,
            fontSize: "1.2rem",
            display: "contents",
            "& a": {
              padding: "0.5rem 1rem",
              borderBottom: "3px solid transparent",
              marginRight: "0.2rem",
              color: currentPalette.fontColorDefault.default,
              textDecoration: "none",
              fontFamily: "Roboto, Helvetica, Aria, sans-serif",
              fontWeight: 700,
              height: "100%",
            },
            "&:after": {
              content: '""',
              display: "block",
              height: "3px",
              width: 0,
              background: "transparent",
              transition: "width 0.7s ease",
              backgroundColor: "0.5s ease",
            },
            "&:hover a": {
              borderBottom: "2px solid #E16428",
            },
            "& a.nav-links.active": {
              color: "#E16428",
            },
          },
        },
      ],
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
          justifyContent: "space-evenly",
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
          color: currentPalette.fontColorDefault.default,
        },
        text: {
          backgroundColor: "pink",
          color: currentPalette.fontColorDefault.default,
        },
      },
      redbutton: {
        backgroundColor: buttonRed,
        color: currentPalette.fontColorDefault.default,
      },
      editbutton: {
        backgroundColor: buttonOrange,
        color: currentPalette.fontColorDefault.default,
      },
      greenbutton: {
        backgroundColor: buttonGreen,
        color: currentPalette.fontColorDefault.default,
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          button: {
            color: currentPalette.fontColorDefault.default,
            borderColor: orange,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: 16,
          color: currentPalette.fontColorDefault.default,
        },
      },
      variants: [
        {
          props: { variant: "boldTitle" },
          style: {
            color: currentPalette.fontColorDefault.default,
            fontFamily: "Roboto, Helvetica, Aria, sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.5,
            letterSpacing: "0.00938em",
          },
        },
        {
          props: { variant: "sibaNavLink" },
          style: {
            color: "#FFFFFF",
            textDecoration: "none",
            fontFamily: "Roboto, Helvetica, Aria, sans-serif",
            fontWeight: 700,
            height: "100%",
            borderBottom: "3px solid transparent",
          },
        },
        {
          props: { variant: "sibaTypography" },
          style: {
            color: currentPalette.fontColorDefault.default,
            textDecoration: "none",
            fontFamily: "Roboto, Helvetica, Aria, sans-serif",
            fontWeight: 400,
            height: "100%",
            borderBottom: "3px solid transparent",
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
          padding: 24,
        },
      },
      variants: [
        {
          props: { variant: "sibaGridAddForm" },
          style: {
            // columnGap: 8,
            // rowGap: 8,
            padding: 8,
            alignItems: "center",
            justifyContent: "space-evenly",
          },
        },
        {
          props: { variant: "sibaGridAddFormInDialog" },
          style: {
            columnGap: 8,
            rowGap: 8,
            padding: 16,
            justifyContent: "flex-start",
            alignItems: "flex-center",
          },
        },
        {
          props: { variant: "sibaGridSingleItemDisplay" },
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "80px",
          background: currentPalette.backgroundDarker.default,
          fontSize: "1.2rem",
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
