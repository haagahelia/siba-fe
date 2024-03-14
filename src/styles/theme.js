// Platform styling
import createTheme from "@mui/material/styles/createTheme";
import logo from "../styles/SibeliusLogoSmall.svg";

// Palettes are: darkPalette, lightPalette,
// redPalette (for testing), yellowPalette (for testing),
const theme = createTheme();
export const lessPadding = "4px";
export const morePadding = "16px";
export const navbarWidth = "171px";
export const commonFont = "Roboto, Helvetica, Aria, sans-serif";
export const margins = {
  auto: "auto",
  none: "0px",
  small: "5px",
  medium: "16px",
  large: "30px",
};

export const indexRoomCommon = {
  width: 15,
  height: 15,
  border: "3px solid",
  marginTop: margins.large,
  marginBottom: margins.large,
};

export const createAppTheme = (currentPalette) =>
  createTheme({
    palette: currentPalette,
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            "&.redIcon": {
              color: currentPalette.warning.main,
            },
            "&.greenIcon": {
              color: currentPalette.success.main,
            },
            "&.infoIcon": {
              color: currentPalette.infoIcon.main,
            },
            "&.arrowUpDownIcon": {
              fontSize: 25,
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: currentPalette.fontColorDefault.default,

            "& .MuiSvgIcon-root": {
              fontSize: 30, // Button size
            },

            "&.Mui-checked": {
              color: "#FDA826", // Active button colour
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            // Affects Page components
            backgroundColor: currentPalette.backgroundDarker.default,
            borderColor: currentPalette.borderColor.cardBoder,
            width: "85%",
            margin: margins.auto,
            marginTop: margins.large,
            padding: lessPadding,
          },
        },
        variants: [
          {
            props: { variant: "formContent" },
            style: {
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100vh",
              margin: "auto",
              width: "100%",
            },
          },
        ],
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            "& .MuiTypography-body1": {
              margin: margins.none,
            },
            "& .MuiCheckbox-root": {
              alignItems: "center",
            },
          },
        },
      },
      MuiCardContent: {
        variants: [
          {
            props: { variant: "logInPageTransparencyFix" },
            style: {
              zIndex: 1,
            },
          },
        ],
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            backgroundColor: currentPalette.background.default,
            fontSize: 25,
            color: currentPalette.fontColorDefault.default,
            marginBottom: margins.medium,
            padding: lessPadding,
          },
        },
        variants: [
          {
            props: { variant: "pageHeader" },
            style: {
              backgroundColor: "transparent",
              borderBottom: `4px solid ${currentPalette.primary.main}`,

              "& .MuiCardHeader-title": {
                fontSize: "30px",
                fontWeight: "bold",
                margin: margins.none,
              },
            },
          },
        ],
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
                borderWidth: "2px",
              },
              "&.Mui-focused fieldset": {
                borderColor: currentPalette.borderColor.main,
              },
              input: {
                "&::placeholder": {
                  opacity: 1,
                },
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
                borderColor: currentPalette.borderColor.main,
                borderWidth: "2px",
              },
              "&.Mui-focused fieldset": {
                borderColor: currentPalette.borderColor.main,
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
            props: { variant: "navBar" },
            style: {
              alignItems: "center",
              backgroundColor: currentPalette.primary.main,
              borderRight: `1px solid ${currentPalette.primary.main}`,
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              fontSize: "17.5px",
              height: "100vh",
              justifyContent: "space-evenly",
              padding: "20px 0 20px 0",
              position: "sticky",
              textAlign: "center",
              top: 0,
              zIndex: 20,
            },
          },
          {
            props: { variant: "dropDown" },
            style: {
              alignItems: "center",
              backgroundColor: currentPalette.backgroundDarker.default,
            },
          },
        ],
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            backgroundColor: currentPalette.backgroundDarker.default,
            border: `1px solid ${currentPalette.borderColor.cardBoder}`,
            color: currentPalette.fontColorDefault.default,
          },
        },
        variants: [
          {
            props: { variant: "navBar" },
            style: {
              backgroundColor: currentPalette.primary.main,
              borderColor: currentPalette.backgroundDarker.default,
              padding: 0,
              "& a": {
                borderBottom: "3px solid transparent",
                color: currentPalette.primary.contrastText,
                fontFamily: commonFont,
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                padding: lessPadding,
                width: navbarWidth,
              },
              "&:hover a": {
                // borderBottom: "3px solid",
                backgroundColor: currentPalette.backgroundDarker.default,
                color: currentPalette.fontColorDefault.default,
                fontWeight: 800,
              },
              "& a.nav-links.active": {
                backgroundColor: currentPalette.background.default,
                color: currentPalette.fontColorDefault.default,
                fontWeight: 800,
                //padding: lessPadding,
                textDecorationThickness: "3px",
                width: navbarWidth,
              },
            },
          },
          {
            // The "Account" button styling
            props: { variant: "navBarAccountButton" },
            style: {
              backgroundColor: currentPalette.background.default,
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              left: "20px",
              margin: "auto",
              padding: "5px",
              position: "absolute",
              textAlign: "center",
              width: "130px",

              "& a": {
                backgroundColor: "transparent",
                color: currentPalette.primary.main,
                fontSize: "17.5px",
                fontWeight: 700,
                textDecoration: "none",
              },

              "&:hover a": {
                backgroundcolor: currentPalette.background.default,
                color: currentPalette.fontColorDefault.default,
              },
            },
          },
          {
            // The drop down menu styling
            props: { variant: "navBarDropDownLinks" },
            style: {
              backgroundColor: "transparent",
              display: "flex",
              borderRadius: "10px",
              padding: "2px",
              margin: "auto",
              flexDirection: "column",
              justifyContent: "center",

              textAlign: "center",
              width: "130px",
              color: currentPalette.backgroundDarker.default,

              "& a": {
                fontSize: "17.5px",
                fontWeight: 600,
                textDecoration: "none",
              },

              "&:hover a": {
                color: currentPalette.primary.main,
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
          {
            props: { variant: "sibaDialogContent2" },
            style: {
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: lessPadding,
              "&:nth-of-type(odd)": {
                backgroundColor: currentPalette.background.default,
                borderBottom: "none",
              },
            },
          },
          {
            props: { variant: "sibaDialogContent3" },
            style: {
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: lessPadding,
              "&:nth-of-type(odd)": {
                backgroundColor: currentPalette.background.default,
                borderBottom: "none",
              },
            },
          },
          {
            props: { variant: "sibaDialogContentSubjectEquipment" },
            style: {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: lessPadding,
              "&:nth-of-type(odd)": {
                backgroundColor: currentPalette.background.default,
                borderBottom: "none",
              },
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
            padding: morePadding,
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
      RoomResultsContainer: {
        margin: margins.auto,
        width: "80%",
      },
      IndexRooms: {
        studioindex: {
          ...indexRoomCommon,
          backgroundColor: currentPalette.AllocRoom.studio.color,
          borderColor: currentPalette.borderColorDark.main,
        },
        luentoluokkaindex: {
          ...indexRoomCommon,
          backgroundColor: currentPalette.AllocRoom.luentoluokka.color,
          borderColor: currentPalette.borderColorDark.main,
        },
        esitystilaindex: {
          ...indexRoomCommon,
          backgroundColor: currentPalette.AllocRoom.esitystila.color,
          borderColor: currentPalette.borderColorDark.main,
        },
        musiikkiluokkaindex: {
          ...indexRoomCommon,
          backgroundColor: currentPalette.AllocRoom.musiikkiluokka.color,
          borderColor: currentPalette.borderColorDark.main,
        },
      },
      Links: {
        textDecoration: "none",
        color: currentPalette.fontColorDefault.default,
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            color: currentPalette.fontColorDefault.default,
            "&.redButton": {
              backgroundColor: currentPalette.warning.main,
              color: currentPalette.warning.contrastText,
            },
            "&.editButton": {
              backgroundColor: currentPalette.edit.main,
              color: currentPalette.edit.contrastText,
            },
            "&.greenButton": {
              backgroundColor: currentPalette.success.main,
              color: currentPalette.success.contrastText,
            },
            "&.disabledButton": {
              opacity: 0.5,
            },
          },
          outlined: {
            "&.redButton": {
              borderColor: currentPalette.warning.main,
              color: currentPalette.warning.main,
            },
            "&.secondaryButton": {
              borderColor: currentPalette.secondary.main,
              color: currentPalette.secondary.main,
              "&:hover": {
                backgroundColor: currentPalette.backgroundDarker.default,
                opacity: 0.8,
              },
            },
          },
          text: {
            backgroundColor: currentPalette.primary.main,
            color: currentPalette.primary.contrastText,
          },
        },
        variants: [
          {
            props: { variant: "componentAddButton" },
            style: {
              backgroundColor: currentPalette.primary.main,
              border: `1px solid ${currentPalette.primary.main}`,
              borderRadius: "7.5px",
              color: currentPalette.primary.contrastText,
              fontSize: "1.25rem",
              fontWeight: "bold",
              height: "40px",
              marginTop: margins.small,
              width: "125px",

              "&:hover": {
                backgroundColor: currentPalette.background.default,
                color: currentPalette.primary.main,
              },
            },
          },
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
          {
            props: { variant: "formButton" },
            style: {
              background: `linear-gradient(to right, ${currentPalette.background.default} 50%, ${currentPalette.primary.main} 50%)`,
              backgroundPosition: "right bottom",
              backgroundSize: "200% 100%",
              border: `1px solid ${currentPalette.primary.main}`,
              borderRadius: "7.5px",
              color: currentPalette.primary.contrastText,
              fontSize: "1.25rem",
              fontWeight: "bold",
              height: "40px",
              margin: margins.small,
              transition: "all .5s ease-out",
              width: "150px",

              "&:hover": {
                backgroundColor: currentPalette.primary.main,
                backgroundPosition: "left bottom",
                color: currentPalette.primary.main,
              },
            },
          },
          {
            props: { variant: "addComponentFormButton" },
            style: {
              backgroundColor: currentPalette.primary.main,
              border: `1px solid ${currentPalette.primary.main}`,
              borderRadius: "7.5px",
              fontSize: "15 rem",
              fontWeight: "bold",
              width: "210px",

              "&.redButton": {
                backgroundColor: currentPalette.warning.main,
                border: `1px solid ${currentPalette.warning.main}`,
              },
              "&:hover": {
                backgroundColor: currentPalette.background.default,
                color: currentPalette.primary.main,
              },
            },
          },
        ],
      },
      MuiPagination: {
        styleOverrides: {
          root: {
            marginTop: margins.medium,
            display: "flex",
            justifyContent: "center",
            button: {
              color: currentPalette.fontColorDefault.default,
              borderColor: currentPalette.borderColor.main,
              "&:hover": {
                backgroundColor: `${currentPalette.backgroundDarker.default}175`,
              },
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: `${currentPalette.primary.main}25`,
              color: currentPalette.primary.main,
              borderColor: currentPalette.primary.main,
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            marginBottom: margins.small,
            color: currentPalette.fontColorDefault.default,
          },
        },
        variants: [
          {
            props: { variant: "roomIndex" },
            style: {
              marginRight: margins.large,
              marginTop: margins.large,
              marginBottom: margins.large,
            },
          },
          {
            props: { variant: "navAllocInfo" },
            style: {
              color: currentPalette.primary.contrastText,
              fontFamily: commonFont,
              fontWeight: 700,
              fontSize: "12.5px",
            },
          },
          {
            props: { variant: "singleDialogSubtitle" },
            style: {
              color: currentPalette.fontColorDefault.default,
            },
          },
          {
            props: { variant: "singleDialogSubtitle2" },
            style: {
              color: currentPalette.fontColorDefault.default,
            },
          },
          {
            props: { variant: "boldTitle" },
            style: {
              color: currentPalette.fontColorDefault.default,
              fontFamily: commonFont,
              fontWeight: 700,
              fontSize: "1rem",
              lineHeight: 1.5,
              letterSpacing: "0.00938em",
            },
          },
          {
            props: { variant: "boldTitle2" },
            style: {
              color: currentPalette.fontColorDefault.default,
              fontFamily: commonFont,
              fontWeight: 700,
              fontSize: "1.1rem",
              lineHeight: 1.5,
              letterSpacing: "0.00938em",
            },
          },
          {
            props: { variant: "logInPageTitle" },
            style: {
              color: currentPalette.primary.main,
              fontSize: "2.5rem",
              fontWeight: 900,
            },
          },
          {
            props: { variant: "pageHeader" },
            style: {
              backgroundColor: "transparent",
              borderBottom: `4px solid ${currentPalette.primary.main}`,
              display: "block",
              fontSize: "30px",
              fontWeight: "bold",
              margin: margins.auto,
              paddingBottom: "5px",
              width: "90%",
            },
          },
          {
            props: { variant: "addComponentSubHeader" },
            style: {
              fontSize: "17.5px",
              fontWeight: "bold",
              paddingBottom: "15px",
            },
          },
          {
            props: { variant: "sibaNavLink" },
            style: {
              color: currentPalette.fontColorDefault.default,
              textDecoration: "none",
              fontFamily: commonFont,
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
              fontFamily: commonFont,
              fontWeight: 400,
              height: "100%",
              borderBottom: "3px solid transparent",
            },
          },
          {
            props: { variant: "allocRoundControlPanel" },
            style: {
              marginTop: margins.small,
            },
          },
          {
            props: { variant: "errorTypography" },
            style: {
              padding: margins.none,
              margin: margins.auto,
              color: currentPalette.error.main,
            },
          },
        ],
      },
      MuiGrid2: {
        styleOverrides: {
          root: {},
        },
        variants: [
          {
            props: { variant: "resultContainer" },
            style: {
              margin: margins.auto,
              width: "80%",
              marginTop: margins.medium,
              padding: 10,
              borderRadius: 20,
            },
          },
          {
            props: { variant: "resultsDropdown" },
            style: {
              textAlign: "center",
              marginTop: margins.small,
              color: theme.baseBgColor,
            },
          },
        ],
      },

      MuiGrid: {
        styleOverrides: {
          root: {
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            padding: lessPadding,
          },
        },
        variants: [
          {
            props: { variant: "sibaGridAddForm" },
            style: {
              // columnGap: 8,
              // rowGap: 8,
              padding: lessPadding,
              alignItems: "center",
              justifyContent: "space-evenly",
            },
          },
          {
            props: { variant: "AddComponentFormButtonSection" },
            style: {
              borderTop: `1px solid ${currentPalette.borderColor.main}`,
              padding: lessPadding,
              alignItems: "center",
              justifyContent: "space-evenly",
            },
          },
          {
            props: { variant: "sibaGridAddFormInDialog" },
            style: {
              columnGap: 8,
              rowGap: 8,
              padding: morePadding,
              justifyContent: "flex-start",
              alignItems: "flex-center",
            },
          },
          {
            props: { variant: "sibaGridSingleItemDisplay" },
            style: {
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: morePadding,
            },
          },
          {
            props: { variant: "sibaGridEdit" },
            style: {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: morePadding,
            },
          },

          // Placeholder variant for EditSpaceForm only,
          // will apply this to other edit-components too later
          {
            props: { variant: "sibaGridEditSpace" },
            style: {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: morePadding,
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
        variants: [
          {
            props: { variant: "verticalNavigationBar" },
            style: {
              width: navbarWidth,
              height: "100vh",
              top: 0,
              left: 0,
            },
          },
        ],
      },
      MuiInput: {
        variants: [
          {
            props: { variant: "sibaInputFileName" },
            style: {
              color: currentPalette.fontColorDefault.default,
              background: currentPalette.primary.backgroundDarker,
              width: "210px",
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
      MuiTable: {
        styleOverrides: {
          root: {
            [theme.breakpoints.down("lg")]: {
              overflowX: "auto",
              display: "block",
              width: "100%",
            },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            [theme.breakpoints.down("lg")]: {
              overflowX: "auto",
              display: "block",
              width: "100%",
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:nth-of-type(even)": {
              backgroundColor: currentPalette.background.default,
              borderBottom: "none",
            },
          },
        },
      },
      MuiTableSortLabel: {
        styleOverrides: {
          root: {
            color: currentPalette.common.white,
            transition: "0.3s ease",

            "&:hover": {
              color: currentPalette.primary.main,
              transition: "0.3s ease",
            },

            "& .MuiTableSortLabel-icon": {
              // Change to your desired icon color
              color: currentPalette.primary.main,
              // Add a color transition
              transition: "color 0.5s ease",
            },

            "&:not(:hover):not(:focus) .MuiTableSortLabel-icon": {
              color: currentPalette.primary.main,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: currentPalette.infoIcon.main,
            "&:hover": {
              backgroundColor: `${currentPalette.primary.main}25`,
            },
          },
        },
        variants: [
          {
            props: { variant: "clearFilterButton" },
            style: {
              color: currentPalette.text.primary,
            },
          },
        ],
      },

      // Enables CSS styling
      MuiCssBaseline: {
        styleOverrides: {
          ".allocRoundHeader": {
            fontWeight: "normal",
          },
          ".dropDown": {
            backgroundColor: currentPalette.backgroundDarker.default,
            border: "2px solid black",
            borderRadius: "10px",
            bottom: "0px",
            left: `calc(${navbarWidth} - 110px)`,
            position: "absolute",
          },
          ".dropDownHoverArea": {
            height: "36px",
            marginTop: margins.large,
            width: navbarWidth,

            "&:hover a": {
              color: currentPalette.fontColorDefault.default,
            },
          },
          ".logInPageBackgroundLogo": {
            height: "95%",
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: `calc(95% - ${navbarWidth})`,
          },
          ".formTextInput": {
            width: "300px",

            "&:hover fieldset": {
              borderWidth: "2px",
            },
          },
          ".errorMessage": {
            color: currentPalette.error.main,
          },
          ".navbar-spacing": {
            height: "100vh",
            left: 0,
            overflowY: "scroll",
            paddingLeft: navbarWidth,
            top: 0,
          },
          ".formCheckBoxButtons": {
            justifyContent: "space-between",
            display: "flex",
          },
          ".navIconSpacing": {
            marginRight: margins.small,
          },
          ".navLogo": {
            "& img": {
              width: 60,
              height: 60,
            },
          },
          ".sibeliusCursor": {
            cursor: `url(${logo}) 12 12, auto`,
          },
          // Hide the page scrollbar. Currently only used on the "Log in" page
          ".no-scrollbar": {
            overflow: "hidden",
          },
        },
      },
    },
  });

export default createAppTheme;

/* In other components, how to get access to the Theme and its settings?

    import useTheme from "@mui/material/styles/useTheme";
    ...
    const theme = useTheme();
*/
