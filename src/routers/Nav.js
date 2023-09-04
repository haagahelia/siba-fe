import React, { useState, useContext } from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import logo from "../styles/SIBA_LOGO_WHITE.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Settings from "../views/Settings";
import RoomResultView from "../views/RoomResultView";
import ProgramResultView from "../views/ProgramResultView";
import SubjectView from "../views/SubjectView";
import AllocRoundView from "../views/AllocRoundListView";
import AddAllocRound from "../components/AllocRound/AddAllocRound";
import AllocationSubjectFailureView from "../views/AllocationSubjectFailureView";
import NotFoundView from "../views/NotFoundView";
import EquipmentView from "../views/EquipmentView";
import BuildingView from "../views/BuildingView";
import DepartmentView from "../views/DepartmentView";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import { AppContext } from "../AppContext";
import Logger from "../logger/logger";

const sibaPages = [
  {
    name: "Register",
    href: "/register",
    forRoles: ["admin"],
    showForCurrentUser: false,
  },
  {
    name: "Login",
    href: "/login",
    forRoles: ["guest"],
    showForCurrentUser: true,
  },
  {
    name: "Front page",
    href: "/",
    forRoles: ["admin", "planner", "statist"],
    showForCurrentUser: false,
  },
  {
    name: "Lessons",
    href: "/subject",
    forRoles: ["admin", "planner", "statist"],
    showForCurrentUser: false,
  },
  {
    name: "Room results",
    href: "/roomresult",
    forRoles: ["admin", "planner", "statist"],
    showForCurrentUser: false,
  },
  {
    name: "Program results",
    href: "/programresult",
    forRoles: ["admin", "planner", "statist"],
    showForCurrentUser: false,
  },
  {
    name: "Settings",
    href: "/settings",
    forRoles: ["admin"],
    showForCurrentUser: false,
  },
  {
    name: "Alloc rounds",
    href: "allocation",
    forRoles: ["admin"],
    showForCurrentUser: false,
  },
  {
    name: "Equipment",
    href: "equipment",
    forRoles: ["admin", "planner", "statist"],
    showForCurrentUser: false,
  },
  {
    name: "Buildings",
    href: "building",
    forRoles: ["admin", "statist"],
    showForCurrentUser: false,
  },
  {
    name: "Department",
    href: "department",
    forRoles: ["admin", "planner", "statist"],
    showForCurrentUser: false,
  },
];

function NavBar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const appContext = useContext(AppContext);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("email") ? localStorage.getItem("email") : "Not yet",
  );

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const setSibaPages = () => {
    Logger.debug("App context roles: setSibaPages", appContext.roles);
    sibaPages.forEach((element) => {
      element.showForCurrentUser = false;
      if (
        (element.forRoles.includes("admin") && appContext.roles.admin === 1) ||
        (element.forRoles.includes("planner") &&
          appContext.roles.planner === 1) ||
        (element.forRoles.includes("statist") && appContext.roles.statist === 1)
      ) {
        element.showForCurrentUser = true;
      } else if (
        element.forRoles.includes("guest") &&
        appContext.roles.admin !== 1 &&
        appContext.roles.planner !== 1 &&
        appContext.roles.statist !== 1
      ) {
        element.showForCurrentUser = true;
      }
    });
  };

  const handleLoginChange = () => {
    setLoggedIn(
      localStorage.getItem("email") ? localStorage.getItem("email") : "No more",
    );
    appContext.userEmail = loggedIn;

    Logger.debug("roles from appContext:", appContext.roles);

    setSibaPages();
  };

  const logOut = () => {
    localStorage.clear();
    appContext.userEmail = "No more";
    appContext.roles = { admin: 0, planner: 0, statist: 0 };
    handleLoginChange();
  };

  const renderNavLinks = () => {
    let pagesToShow = [...sibaPages];

    if (loggedIn !== "Not yet" && loggedIn !== "No more") {
      //localStorage.clear(); // !!! for reset !!!, if get stuck to wrong state

      Logger.debug("pagesToShow 000:", pagesToShow);
      pagesToShow = pagesToShow.filter((page) => page.showForCurrentUser); // Hiding Login link if logged in
      Logger.debug("pagesToShow 111:", pagesToShow);
      pagesToShow.push({ name: "Logout", href: "#", action: logOut }); // Showing log out button if logged in
      Logger.debug("pagesToShow 222:", pagesToShow);

      return pagesToShow.map((page, index) => (
        <ListItem variant="sibaAppBarHorizontal" key={index}>
          <NavLink
            to={page.href}
            end
            activeclassname="active"
            className="nav-links"
            onClick={() => {
              handleClick();
              if (page.action) page.action(); // Execute the logout action if present
            }}
          >
            {page.name}
          </NavLink>
        </ListItem>
      ));
    } else {
      pagesToShow = pagesToShow.filter((page) => page.showForCurrentUser);
      Logger.debug("pagesToShow 333:", pagesToShow);
      //pagesToShow.push({ name: "Login", href: "/login", forRoles: ["guest"], showForCurrentUser: true   });
      Logger.debug("pagesToShow 444:", pagesToShow);
      return pagesToShow.map((page, index) => (
        <ListItem variant="sibaAppBarHorizontal" key={index}>
          <NavLink
            to={page.href}
            end
            activeclassname="active"
            className="nav-links"
            onClick={handleClick}
          >
            <Typography variant="sibaNavLink">{page.name}</Typography>
          </NavLink>
        </ListItem>
      ));
    }
  };

  return (
    <Router>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="sibaTypography">
              Logged in as: {loggedIn}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", lg: "none" },
                }}
              >
                <List variant="sibaAppBarVertival">
                  <NavLink to="/" className="nav-logo">
                    {/* I didn't have logos, add them to the project and it works */}
                    {/* <img src={logo} alt="Logo" /> */}
                    <i className="fas fa-code" />
                  </NavLink>
                  {renderNavLinks()}
                </List>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
              <List variant="sibaAppBarHorizontal">{renderNavLinks()}</List>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route
          path="/login"
          element={<LoginView handleLoginChange={handleLoginChange} />}
        />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/" element={<SubjectView />} />
        <Route path="/subject" element={<SubjectView />} />
        <Route path="/allocation" element={<AllocRoundView />} />
        <Route path="/roomresult" element={<RoomResultView />} />
        <Route path="/programresult" element={<ProgramResultView />} />
        <Route path="/equipment" element={<EquipmentView />} />
        <Route path="/building" element={<BuildingView />} />
        <Route path="/department" element={<DepartmentView />} />
        <Route path="/allocation/addAllocRound" element={<AddAllocRound />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/alloc-fail/:allocId"
          element={<AllocationSubjectFailureView />}
        />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}

export default NavBar;
