import { createTheme } from "@mui/material";

// Palettes are: darkPalette, lightPalette, redPalette (for testing), yellowPalette (for testing),

export const createAppTheme = (currentPalette) => {
  const navbarWidth = "170px";

  return createTheme({
    palette: currentPalette,

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: currentPalette.backgroundDarker.default,
            borderColor: currentPalette.borderColor.cardBoder,
            width: "85%",
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
            marginBottom: "10px",
            padding: "10px",
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
              color: currentPalette.primary.main,
            },
            "& .MuiOutlinedInput-root": {
              color: currentPalette.fontColorDefault.default,
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
            color: currentPalette.fontColorDefault.default,
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              background: currentPalette.background.default,
            },
            "& label": {
              color: currentPalette.fontColorDefault.default,
            },
            "& label.Mui-focused": {
              color: currentPalette.primary.main,
            },
            "& .MuiFormHelperText-root": {
              color: currentPalette.helperText,
            },
            "& .MuiOutlinedInput-root": {
              color: currentPalette.fontColorDefault.default,
              "& fieldset": {
                borderColor: currentPalette.borderColor.main,
              },
              "&:hover fieldset": {
                borderColor: currentPalette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: currentPalette.primary.main,
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
            props: { variant: "sibaAppBarVertical" },
            style: {
              display: "flex",
              flexDirection: "column",
              opacity: 1,
              transition: "all 0.5s ease",
            },
          },
          {
            props: { variant: "sibaAppBarVerticalNew" },
            style: {
              backgroundColor: currentPalette.primary.main,
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              alignItems: "flex-start",
              textAlign: "center",
              fontSize: "17.5px",
              position: "sticky",
              justifyContent: "center",
              top: 0,
              zIndex: 20,
            },
          },
        ],
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            backgroundColor: currentPalette.backgroundDarker.default,
            color: currentPalette.fontColorDefault.default,
            border: `1px solid ${currentPalette.borderColor.cardBoder}`,
          },
        },
        variants: [
          {
            props: { variant: "sibaAppBarVerticalNew" },
            style: {
              borderColor: currentPalette.backgroundDarker.default,
              display: "contents",
              // color: currentPalette.fontColorDefault.main,
              "& a": {
                padding: "3px",
                borderBottom: "3px solid transparent",
                //color: currentPalette.fontColorDefault.default,
                color: currentPalette.primary.contrastText,
                textDecoration: "none",
                fontFamily: "Roboto, Helvetica, Aria, sans-serif",
                fontWeight: 600,
                height: "100%",
                textAlign: "center",
                width: navbarWidth,
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
                borderBottom: "3px solid",
                color: currentPalette.primary.contrastText,
              },
              "& a.nav-links.active": {
                color: currentPalette.primary.contrastText,
                fontWeight: 800,
                backgroundColor: currentPalette.background.default,
                color: currentPalette.text.primary,
                textDecorationThickness: "3px",
                width: navbarWidth,
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
            color: currentPalette.fontColorDefault.default,
          },
        },
      },
      MuiDialogContentText: {
        styleOverrides: {
          root: {
            color: currentPalette.fontColorDefault.default,
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
          color: currentPalette.AllocRoom.studio.color,
        },
        luentoluokka: {
          color: currentPalette.AllocRoom.luentoluokka.color,
        },
        esitystila: {
          color: currentPalette.AllocRoom.esitystila.color,
        },
        musiikkiluokka: {
          color: currentPalette.AllocRoom.musiikkiluokka.color,
        },
      },
      IndexRooms: {
        studioindex: {
          width: 15,
          height: 15,
          backgroundColor: currentPalette.AllocRoom.studio.color,
          border: "3px solid",
          borderColor: currentPalette.borderColorDark.main,
          marginLeft: 60,
        },
        luentoluokkaindex: {
          width: 15,
          height: 15,
          backgroundColor: currentPalette.AllocRoom.luentoluokka.color,
          border: "3px solid",
          borderColor: currentPalette.borderColorDark.main,
          marginLeft: 60,
        },
        esitystilaindex: {
          width: 15,
          height: 15,
          backgroundColor: currentPalette.AllocRoom.esitystila.color,
          border: "3px solid",
          borderColor: currentPalette.borderColorDark.main,
          marginLeft: 60,
        },
        musiikkiluokkaindex: {
          width: 15,
          height: 15,
          backgroundColor: currentPalette.AllocRoom.musiikkiluokka.color,
          border: "3px solid",
          borderColor: currentPalette.borderColorDark.main,
          marginLeft: 60,
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "themeToggle" },
            style: {
              position: "fixed",
              bottom: 50,
              right: 10,
              zIndex: 1000,
              backgroundColor: currentPalette.primary.main,
              color: currentPalette.fontColorDefault.default,
            },
          },
        ],
        styleOverrides: {
          contained: {
            color: currentPalette.fontColorDefault.default,
          },
          text: {
            backgroundColor: currentPalette.primary.main,
            color: currentPalette.primary.contrastText,
          },
        },
        redbutton: {
          backgroundColor: currentPalette.warning.main,
          color: currentPalette.warning.contrastText,
        },
        editbutton: {
          backgroundColor: currentPalette.edit.main,
          color: currentPalette.edit.contrastText,
        },
        greenbutton: {
          backgroundColor: currentPalette.success.main,
          color: currentPalette.success.contrastText,
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
              borderColor: currentPalette.borderColor.main, // was "yellow"
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
              color: currentPalette.fontColorDefault.default,
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
            marginTop: 0,
            padding: 5,
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
            background: currentPalette.primary.main,
            fontSize: "1.2rem",
          },
        },
      },
      MuiInput: {
        variants: [
          {
            props: { variant: "sibaInputFileName" },
            style: {
              color: currentPalette.fontColorDefault.default,
              background: currentPalette.primary.backgroundDarker,
            },
          },
        ],
        styleOverrides: {
          root: {
            color: currentPalette.fontColorDefault.default,
            background: currentPalette.backgroundDarker.default,
          },
        },
      },
      MuiAlertTitle: {
        styleOverrides: {
          root: {
            color: currentPalette.warning.contrastText,
            fontWeight: 700,
          },
        },
      },
    },
  });
};

export default createAppTheme;

/* In other components, how to get access to the Theme and its settings?
  
     import { useTheme } from "@mui/material/styles";
     ...
       const theme = useTheme(); 
*/
