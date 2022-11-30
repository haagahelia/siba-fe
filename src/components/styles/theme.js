import { createTheme } from "@mui/material";

const darkBrown = "#272121";
const lightGray = "#363333";
const light = "#F6E9E9";
const orange = "#E16428";
const lightgreen = "#ABFFDD";
const lightblue = "#73FDFF";
const lightyellow = "#FFF5AB";
const lightred = "#FF8585";
const buttonOrange = "#E16428";
const buttonGreen = "#54B435";
const buttonRed = "#FF1E00";


const theme = createTheme({
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
          color: light
        }
      }
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
      MuiList:{
        styleOverrides: {
          root: {
            backgroundColor: darkBrown,
          }
        }
      },
      MuiListItem:{
        styleOverrides: {
          root: {
            backgroundColor: darkBrown,
            color: light,
            border: "1px solid #F6E9E9"
          },
        }
      },
      MuiDialog:{
        styleOverrides: {
          paper:{
            backgroundColor: darkBrown,
            color: light,
          }
        }
      },
      MuiDialogContentText: {
        styleOverrides: {
          root: {
            color: light
          }
        }
      },
      AllocRoom: {
        studio: {
          color: lightred
        },
        luentoluokka: {
          color: lightblue
        },
        esitystila: {
          color: lightgreen
        },
        musiikkiluokka: {
          color: lightyellow
        }
      },
      MuiButton: {
        styleOverrides:{
          text: {
            backgroundColor: "pink",
            color: light
          }
        }
      }
    },
},
);

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: buttonGreen
    },
    secondary: {
      main: buttonOrange
    },
    red: {
      main: buttonRed
    }
  }
});

export default theme;
