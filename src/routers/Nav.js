import React, { useContext, useState, useEffect } from "react";
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
//import { AppContext } from "../AppContext";
import { RoleLoggedIn } from "../customhooks/RoleLoggedIn";

const sibaPages = [
  { name: "Register", href: "/register" },
  { name: "Login", href: "/login" },
  { name: "Front page", href: "/" },
  { name: "Lessons", href: "/subject" },
  { name: "Room results", href: "/roomresult" },
  { name: "Program results", href: "/programresult" },
  { name: "Settings", href: "/settings" },
  { name: "Alloc rounds", href: "allocation" },
  { name: "Equipment", href: "equipment" },
  { name: "Buildings", href: "building" },
  { name: "Department", href: "department" },
];

function NavBar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  //const appContext = useContext(AppContext);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("email") ? localStorage.getItem("email") : "Not yet",
  );
  const { roles, setRoles } = RoleLoggedIn();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLoginChange = () => {
    setLoggedIn(
      localStorage.getItem("email") ? localStorage.getItem("email") : "No more",
    );

    setRoles({
      admin: localStorage.getItem("isAdmin"),
      planner: localStorage.getItem("isPlanner"),
      statist: localStorage.getItem("isStatist"),
    });
  };

  const logOut = () => {
    localStorage.clear();
    handleLoginChange();
  };

  const renderNavLinks = () => {
    let pagesToShow = [...sibaPages];

    if (loggedIn !== "Not yet" && loggedIn !== "No more") {
      pagesToShow = pagesToShow.filter((page) => page.href !== "/login"); // Hiding Login link if logged in
      pagesToShow.push({ name: "Logout", href: "#", action: logOut }); // Showing log out button if logged in
    }
    if (roles.admin === "1") {
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
      return pagesToShow.slice(1).map((page, index) => (
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
