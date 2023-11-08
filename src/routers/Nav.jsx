// The Navigation Bar Component
import {
  faArrowRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import { useContext, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { AppContext } from "../AppContext";
import AddAllocRound from "../components/allocRound/AddAllocRound";
import Logger from "../logger/logger";
import logo from "../styles/SibeliusLogo.svg";
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
  const appContext = useContext(AppContext);

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
      href: "javascript:;",
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
      name: `${appContext.allocRoundId}`,
      href: "/subject",
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
    // Logger.debug("pages status 000:", sibaPages);

    return sibaPages
      .filter(
        (page) =>
          page.showForCurrentUser &&
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
                <NavLink
                  to={page.href}
                  end
                  activeclassname="active"
                  className="nav-links"
                >
                  {loggedIn} {/* The text which is returned to screen */}
                </NavLink>

                {isDropdownVisible && (
                  <div className="dropDown">
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
    <div className="navbar-spacing">
      <BrowserRouter>
        <AppBar variant="verticalNavigationBar" alt="Vertical navigation bar.">
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ flexDirection: "column" }}>
              <Box sx={{ flexGrow: 1 }}>
                <List variant="navBar">
                  <NavLink to="/" className="navLogo">
                    <img src={logo} alt="Sibelius-Akatemia stylized logo." />
                  </NavLink>
                  {renderNavLinks()}
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
          <Route path="/register" element={<RegisterView />} />
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
