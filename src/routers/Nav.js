import React, { useState, useContext } from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
import SpaceView from "../views/SpaceView";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import UserView from "../views/UserView";
import { AppContext } from "../AppContext";
import Logger from "../logger/logger";
import logo from "../styles/SibeliusLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  Logger.debug("NavBar initiated");
  const sibaPages = [
    {
      name: "Log In",
      href: "/login",
      forRoles: ["guest"],
      showForCurrentUser: false,
      isLogin: false,
    },
    {
      name: "Lessons",
      href: "/",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Allocation",
      href: "allocation",
      forRoles: ["admin"],
      showForCurrentUser: false,
    },
    {
      name: "Buildings",
      href: "building",
      forRoles: ["admin", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Departments",
      href: "department",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Equipment",
      href: "equipment",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Spaces",
      href: "space",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Program Results",
      href: "/programresult",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Room Results",
      href: "/roomresult",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Register",
      href: "/register",
      forRoles: ["admin"],
      showForCurrentUser: false,
    },
    {
      name: "Userlist",
      href: "/users",
      forRoles: ["admin"],
      showForCurrentUser: false,
    },
    {
      name: "Account",
      href: "javascript:void(0);",
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
      name: "Log Out",
      href: "/login",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
      action() {
        localStorage.clear();
        handleLoginChange();
        setIsDropdownVisible(false);
      },
    },
  ];

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const appContext = useContext(AppContext);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("email") ? localStorage.getItem("email") : "Not yet",
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Called to produce the down drop menu items
  const renderDropdownMenu = (page, variant) => {
    return (
      <ListItem key={page.name} variant={variant}>
        <NavLink
          to={page.href}
          activeclassname="active"
          className="nav-links"
          onClick={() => {
            if (page.action) page.action();
          }}
        >
          {page.name === "Settings" && (
            <span style={{ marginRight: "5px" }}>
              <FontAwesomeIcon icon={faGear} />
            </span>
          )}
          {page.name === "Log Out" && (
            <span style={{ marginRight: "5px" }}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </span>
          )}
          {page.name}
        </NavLink>
      </ListItem>
    );
  };

  const updateAppContext = () => {
    appContext.userEmail = localStorage.getItem("email");
    appContext.sessionToken = localStorage.getItem("sessionToken");
    appContext.roles.admin = Number(localStorage.getItem("isAdmin"));
    appContext.roles.planner = Number(localStorage.getItem("isPlanner"));
    appContext.roles.statist = Number(localStorage.getItem("isStatist"));
  };

  const setSibaPages = () => {
    // Logger.debug("App context roles: setSibaPages", appContext.roles);
    if (appContext.userEmail) {
      sibaPages[1].isLogin = true;
      sibaPages[sibaPages.length - 1].showForCurrentUser = true;
    } else {
      sibaPages[1].isLogin = false;
      sibaPages[sibaPages.length - 1].showForCurrentUser = false;
    }

    sibaPages.forEach((element) => {
      element.showForCurrentUser = false;
      if (
        (element.forRoles.includes("admin") && appContext.roles.admin === 1) ||
        (element.forRoles.includes("planner") &&
          appContext.roles.planner === 1) ||
        (element.forRoles.includes("statist") && appContext.roles.statist === 1)
      ) {
        element.showForCurrentUser = true;
      } else if (element.forRoles.includes("guest") && !appContext.userEmail) {
        element.showForCurrentUser = true;
      }
    });
  };

  const handleLoginChange = () => {
    setLoggedIn(
      localStorage.getItem("email") ? localStorage.getItem("email") : "No more",
    );
  };

  const renderNavLinks = () => {
    updateAppContext();
    setSibaPages();
    //Logger.debug("pages status 000:", sibaPages);

    return sibaPages
      .filter((page) => page.showForCurrentUser)
      .filter((page) => page.name !== "Settings" && page.name !== "Log Out")
      .map((page, index) => {
        const variantValue =
          page.name === "Account" ? "navBarAccountButton" : "navBar";
        if (page.name === "Account") {
          return (
            <div
              onMouseEnter={() => setIsDropdownVisible(true)}
              onMouseLeave={() => setIsDropdownVisible(false)}
              style={{ width: "170px" }} // The hover area between the Account links and the drop down
            >
              <ListItem variant="navBarAccountButton" key={index}>
                <NavLink
                  to={page.href}
                  end
                  activeclassname="active"
                  className="nav-links"
                >
                  {page.name}
                </NavLink>

                {isDropdownVisible && (
                  <div
                    className="dropdown"
                    style={{
                      backgroundColor: "rgb(85, 85, 85)",
                      border: "2px solid black",
                      borderRadius: "10px",
                      bottom: "0px",
                      left: "150px",
                      position: "absolute",
                    }}
                  >
                    {sibaPages
                      .filter((page) =>
                        ["Settings", "Log Out"].includes(page.name),
                      )
                      .map((page) =>
                        renderDropdownMenu(page, "navBarDropDownLinks"),
                      )}
                  </div>
                )}
              </ListItem>
            </div>
          );
        }

        return (
          <ListItem variant={variantValue} key={index}>
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
        );
      });
  };

  return (
    <div className="navbar-spacing"
      style={{
        height: "100vh",
        left: 0,
        paddingLeft: '170px', // Nav bar width
        top: 0,  
      }}>
      <Router>
        <AppBar
          position="fixed"
          sx={{
            flexDirection: "column",
            height: "100vh",
            left: 0,
            top: 0,
            width: "170px", // Nav bar width
          }}
        >
          <NavLink to="/" className="nav-logo">
            <img src={logo} alt="" width="60" height="60" />
            <i className="fas fa-code" />
          </NavLink>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ flexDirection: "column" }}>
              <Typography variant="sibaTypography">
                Logged in as: {loggedIn}
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <List variant="navBar">{renderNavLinks()}</List>
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
          <Route path="/space" element={<SpaceView />} />
          <Route path="/allocation/addAllocRound" element={<AddAllocRound />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<UserView />} />
          <Route
            path="/alloc-fail/:allocId"
            element={<AllocationSubjectFailureView />}
          />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default NavBar;
