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
  },
  MuiSelect: {
    root: {},
  },
});

export default theme;
