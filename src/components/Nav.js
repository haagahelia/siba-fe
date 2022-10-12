import React, { useState } from "react";
import { NavLink, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/NavBar.css";
import logo from '../styles/SIBA_LOGO.png'
import ResultView from "../views/ResultView";
import SubjectView from "../views/SubjectView";
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img src={logo} alt="Logo" />
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
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
                Aineryhmänäkymä
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
            <MenuIcon/>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>

      <Routes>
          <Route path="/subject" element={<><SubjectView/><ResultView/></>} />
          <Route path="/onlyresult" element={<ResultView/>}/>
        </Routes>
    </Router>
  );
}

export default NavBar;