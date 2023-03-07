import React, { useState } from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "../styles/NavBar.css";
// import logo from "../styles/SIBA_LOGO_WHITE.png";
import ResultView from "../views/ResultView";
import SubjectView from "../views/SubjectView";
import AllocRoundView from "../views/AllocRoundListView";
import AddAllocRound from "../components/AllocRound/AddAllocRound";
import AllocationSubjectFailureView from "../views/AllocationSubjectFailureView";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            {/* I didn't have logos, add them to the project and it works */}
            {/* <img src={logo} alt="Logo" /> */}
            <i className="fas fa-code" />
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                end
                exact="true"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Front page
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
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
                exact="true"
                to="/onlyresult"
                activeclassname="active"
                className="nav-links"
                onClick={handleClick}
              >
                Results view
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/allocroundpage"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Allocations
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
        <Route
          path="/subject"
          element={
            <>
              <SubjectView />
            </>
          }
        />
        <Route
          path="/allocroundpage"
          element={
            <>
              <AllocRoundView />
            </>
          }
        />
        <Route
          path='/allocroundpage/addAllocRound'
          element={<AddAllocRound />}
        />
        <Route path="/onlyresult" element={<ResultView />} />
        <Route
          path="/alloc-fail/:allocId"
          element={<AllocationSubjectFailureView />}
        />
      </Routes>
    </Router>
  );
}

export default NavBar;
