import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import "./navbar.css";
import logo from "./logo.png";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [toggleIcon, setToggleIcon] = useState("nav__toggler");

  const location = useLocation(); 

  const navToggle = () => {
    setActive(active === "nav__menu" ? "nav__menu nav__active" : "nav__menu");
    setToggleIcon(
      toggleIcon === "nav_toggler" ? "nav__toggler toggle" : "nav__toggler"
    );
  };

  return (
    <nav className="nav">
      <div className="logo">
        <img id="logo" src={logo} alt="Logo" />
      </div>

    
      {location.pathname !== "/" && (
        <ul id="links" className={active}>
          <li className="nav__item">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/criar_despesa" className="nav__link">
              Nova Despesa
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/solicitar_ordem" className="nav__link">
              Solicitar OC
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/lista_ordem" className="nav__link">
              OC Solicitadas
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/anual" className="nav__link">
              Anual
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/diretoria" className="nav__link">
              Diretoria
            </Link>
          </li>
  
        </ul>
      )}

      <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
