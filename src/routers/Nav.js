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
            {/* mulla ei ollu logoja, lisää ne projektiin nii toimii */}
            {/* <img src={logo} alt="Logo" /> */}
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                end
                exact={true}
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Etusivu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/subject"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Opetukset
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/onlyresult"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Tulosnäkymä
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <MenuIcon />
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
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
        <Route path="/onlyresult" element={<ResultView />} />
        <Route path="/alloc-fail/:allocId" element={<AllocationSubjectFailureView />} />
      </Routes>
    </Router>
  );
}

export default NavBar;
