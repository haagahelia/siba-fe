import React, { useState } from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "../styles/NavBar.css";
// import logo from "../styles/SIBA_LOGO_WHITE.png";
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

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            {/* I didn't have logos, add them to the project and it works */}
            {/* <img src={logo} alt="Logo" /> */}
            <i className="fas fa-code" />
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/login"
                end
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/register"
                end
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/"
                end
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Front page
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/subject"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Lessons
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/roomresult"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Room results
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/programresult"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Program results
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/settings"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/allocation"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Alloc rounds
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/equipment"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Equipment
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/building"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Buildings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/department"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Department
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <MenuIcon />
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginView />} />
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
