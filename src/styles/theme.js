import { createTheme } from "@mui/material";
//import { green, lightBlue } from "@mui/material/colors";

const darkBrown = "#272121";
const lightGray = "#363333";
const light = "#F6E9E9";
const orange = "#E16428";
const lightgreen = "#90EE90";
const lightblue = "#73FDFF";
const lightyellow = "#FFF5AB";
const lightred = "#FF8585";
const buttonOrange = "#E16428";
const buttonGreen = "#54B435";
const buttonRed = "#FF1E00";

export const normalPalette = {
  background: { default: lightGray },
  primary: {
    main: buttonGreen,
    light: "#5DBCD2",
  },
  secondary: {
    main: buttonOrange,
  },
  red: {
    main: buttonRed,
  },
  error: { main: buttonRed },
  warning: { main: "#FFA000" },
  information: { main: "#1976D2" },
  success: { main: "#43A047" },
};

export const yellowPalette = {
  background: { default: "#FFFF8F" },
  primary: {
    main: "#CC9900",
    light: "#CCFF66",
  },
  secondary: {
    main: "#FFFF99",
  },
  red: {
    main: "#FF6600",
  },
  error: { main: "#FFCC00" },
  warning: { main: "#66FFFF" },
  information: { main: "#CCFF33" },
  success: { main: "#FFFFE6" },
};
/* More yellow tint values used from here: 
"#F2F2BF"  "#FFFFAA"  "#AAAA11"  "#FFFF11"  "#BB7700"
*/

export const redPalette = {
  background: { default: "#FF2400" },
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
  success: { main: "#CC9900" },
};
/* More red tint values used from here: 
 "#F2AEB8" "#F44336" "#FF2222" "#FF9AD5" "#AC3939"
*/
const currentPalette = normalPalette;

const theme = createTheme({
  palette: currentPalette,

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: darkBrown,
          borderColor: light,
          width: "75%",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: lightGray,
          fontSize: 25,
          color: "white",
          marginBottom: "15px",
          padding: "20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: darkBrown,
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
            color: "white",
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
          backgroundColor: darkBrown,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: darkBrown,
          color: light,
          border: "1px solid #F6E9E9",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: darkBrown,
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
        color: lightred,
      },
      luentoluokka: {
        color: lightblue,
      },
      esitystila: {
        color: lightgreen,
      },
      musiikkiluokka: {
        color: lightyellow,
      },
    },
    IndexRooms: {
      studioindex: {
        width: 15,
        height: 15,
        backgroundColor: lightred,
        border: "3px solid",
        borderColor: "black",
        marginLeft: 60,
      },
      luentoluokkaindex: {
        width: 15,
        height: 15,
        backgroundColor: lightblue,
        border: "3px solid",
        borderColor: "black",
        marginLeft: 60,
      },
      esitystilaindex: {
        width: 15,
        height: 15,
        backgroundColor: lightgreen,
        border: "3px solid",
        borderColor: "black",
        marginLeft: 60,
      },
      musiikkiluokkaindex: {
        width: 15,
        height: 15,
        backgroundColor: lightyellow,
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
