import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#272121",
          borderColor: "#E16428",
          width: "75%",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#363333",
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
          "& label": {
            color: "#F6E9E9",
          },
          "& label.Mui-focused": {
            color: "#E16428",
          },
          "& .MuiOutlinedInput-root": {
            color: "#F6E9E9",
            "& fieldset": {
              borderColor: "#E16428",
            },
            "&:hover fieldset": {
              borderColor: "#F6E9E9",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#F6E9E9",
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#F6E9E9"
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
              color: "#E16428",
            },
            "& .MuiFormHelperText-root": {
              color: "red",
            },
            "& .MuiOutlinedInput-root": {
              color: "#F6E9E9",
              "& fieldset": {
                borderColor: "#E16428",
              },
              "&:hover fieldset": {
                borderColor: "#F6E9E9",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#F6E9E9",
              },
            },
          },
        }, 
      },
      MuiList:{
        styleOverrides: {
          root: {
            backgroundColor: "#272121",
          }
        }
      },
      MuiListItem:{
        styleOverrides: {
          root: {
            backgroundColor: "#272121",
            color: "#F6E9E9",
            border: "1px solid #E16428"
          },
        }
      },
      MuiDialog:{
        styleOverrides: {
          paper:{
            backgroundColor: "#272121",
            color: "#F6E9E9",
          }
        }
      },
      MuiDialogContentText: {
        styleOverrides: {
          root: {
            color: "#F6E9E9"
          }
        }
      }
    },
},
);

export default theme;
