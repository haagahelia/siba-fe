// The Navigation Bar Component
import {
  faArrowRightFromBracket,
  faGear,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import { useContext, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { AppContext } from "../AppContext";
import dao from "../ajax/dao";
import AddAllocRound from "../components/allocRound/AddAllocRound";
import { useActiveAllocRound } from "../hooks/useActiveAllocRound";
import Logger from "../logger/logger";
import logo from "../styles/SibeliusLogo.svg";
// The different pages/views
import AllocRoundView from "../views/AllocRoundView";
import AllocationSubjectFailureView from "../views/AllocationSubjectFailureView";
import BuildingView from "../views/BuildingView";
import DepartmentView from "../views/DepartmentView";
import EquipmentView from "../views/EquipmentView";
import ForgetPasswordView from "../views/ForgetPasswordView";
import LoginView from "../views/LoginView";
import NotFoundView from "../views/NotFoundView";
import ProgramResultView from "../views/ProgramResultView";
import RegisterView from "../views/RegisterView";
import ResetPasswordView from "../views/ResetPasswordView";
import RoomResultView from "../views/RoomResultView";
import SettingsView from "../views/SettingsView";
import SpaceView from "../views/SpaceView";
import SubjectView from "../views/SubjectView";
import UserView from "../views/UserView";

export default function NavBar() {
  Logger.debug("NavBar initiated");
  // The routes (pages) and the roles which can see them
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
      href: "/subject",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Allocation",
      href: "/allocation",
      forRoles: ["admin"],
      showForCurrentUser: false,
    },
    {
      name: "Buildings",
      href: "/building",
      forRoles: ["admin", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Departments",
      href: "/department",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Equipment",
      href: "/equipment",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Spaces",
      href: "/space",
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
      name: "Add User",
      href: "/addUser",
      forRoles: ["admin"],
      showForCurrentUser: false,
    },
    {
      name: "User List",
      href: "/users",
      forRoles: ["admin"],
      showForCurrentUser: false,
    },
    {
      name: "Account",
      href: "javascript:;",
      forRoles: ["admin", "planner", "statist"],
      showForCurrentUser: false,
    },
    {
      name: "Reset Data",
      forRoles: ["admin"],
      showForCurrentUser: false,
      action() {
        const mode = import.meta.env.VITE_MODE;
        if (mode === "development") {
          const confirmation = confirm(
            "Are you sure that you want to reset database to test data?",
          );
          confirmation &&
            dao.resetDatabase() &&
            alert("Database reset success!");
        } else {
          alert("Not in development mode!");
        }
      },
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

  const appContext = useContext(AppContext);
  const allocRound = useActiveAllocRound();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("email") ? localStorage.getItem("email") : "Not yet",
  );

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Called to produce the drop-down menu items
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
          {page.name === "Reset Data" && (
            <span className="navIconSpacing">
              {" "}
              <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
            </span>
          )}
          {page.name === "Settings" && (
            <span className="navIconSpacing">
              {" "}
              <FontAwesomeIcon icon={faGear} />{" "}
            </span>
          )}
          {page.name === "Log Out" && (
            <span className="navIconSpacing">
              {" "}
              <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
            </span>
          )}
          {page.name}
        </NavLink>
      </ListItem>
    );
  };

  const updateAppContextUser = () => {
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

    for (const element of sibaPages) {
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
    }
  };

  // Determines the correct nav image link
  const navImageRoute = () => {
    const loggedInUser = localStorage.getItem("email"); // Wont work if global variable
    // If a user is signed in
    if (loggedInUser) {
      return "/subject";
      // If a user is not signed in
    } else {
      return "/";
    }
  };

  // Hides the scroll bar for the "Log in" page
  const showOrHideScrollBar = () => {
    const loggedInUser = localStorage.getItem("email"); // Wont work if global variable
    // If a user is signed in, show the scroll bar
    if (loggedInUser) {
      return "";
      // If a user is not signed in, hide the scroll bar
    } else {
      return "no-scrollbar";
    }
  };

  const handleLoginChange = () => {
    setLoggedIn(
      localStorage.getItem("email") ? localStorage.getItem("email") : "No more",
    );
  };

  const renderNavLinks = () => {
    updateAppContextUser();
    setSibaPages();
    // Logger.debug("pages status 000:", sibaPages);

    return sibaPages
      .filter(
        (page) =>
          page.showForCurrentUser &&
          page.name !== "Reset Data" &&
          page.name !== "Settings" &&
          page.name !== "Log Out",
      )
      .map((page) => {
        const variantValue =
          page.name === "Account" ? "navBarAccountButton" : "navBar";
        if (page.name === "Account") {
          return (
            <div
              key={page.name}
              className="dropDownHoverArea"
              onMouseEnter={() => setIsDropdownVisible(true)}
              onMouseLeave={() => setIsDropdownVisible(false)}
            >
              <ListItem variant="navBarAccountButton">
                <NavLink>
                  {loggedIn}{" "}
                  {/* The username which apperas in the account button */}
                </NavLink>

                {isDropdownVisible && (
                  <div className="dropDown">
                    {sibaPages
                      .filter((page) =>
                        ["Reset Data", "Settings", "Log Out"].includes(
                          page.name,
                        ),
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
          <ListItem variant={variantValue} key={page.name}>
            <NavLink
              to={page.href}
              end
              activeclassname="active"
              className="nav-links"
              onClick={() => {
                handleClick();
                // Execute the logout action if present
                if (page.action) page.action();
              }}
            >
              {page.name}
            </NavLink>
          </ListItem>
        );
      });
  };

  return (
    <div className={`navbar-spacing ${showOrHideScrollBar()}`}>
      <BrowserRouter>
        <AppBar variant="verticalNavigationBar" alt="Vertical navigation bar.">
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ flexDirection: "column" }}>
              <Box sx={{ flexGrow: 1 }}>
                <List variant="navBar">
                  <NavLink to={navImageRoute()} className="navLogo">
                    {/* <NavLink to="/" className="navLogo"> */}
                    <img src={logo} alt="Sibelius-Akatemia stylized logo." />
                  </NavLink>
                  {renderNavLinks()}
                  <Typography variant="navAllocInfo">
                    {`${allocRound.id} : ${allocRound.name.substring(0, 12)}`}
                  </Typography>
                </List>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Routes>
          <Route
            path="/login"
            element={<LoginView handleLoginChange={handleLoginChange} />}
          />
          <Route path="/addUser" element={<RegisterView />} />
          <Route
            path="/"
            element={<LoginView handleLoginChange={handleLoginChange} />}
          />
          <Route path="/subject" element={<SubjectView />} />
          <Route path="/allocation" element={<AllocRoundView />} />
          <Route path="/roomresult" element={<RoomResultView />} />
          <Route path="/programresult" element={<ProgramResultView />} />
          <Route path="/equipment" element={<EquipmentView />} />
          <Route path="/building" element={<BuildingView />} />
          <Route path="/department" element={<DepartmentView />} />
          <Route path="/space" element={<SpaceView />} />
          <Route path="/allocation/addAllocRound" element={<AddAllocRound />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/users" element={<UserView />} />
          <Route
            path="/alloc-fail/:allocId"
            element={<AllocationSubjectFailureView />}
          />
          <Route path="*" element={<NotFoundView />} />
          <Route path="/forget-password" element={<ForgetPasswordView />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPasswordView />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
