import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const path = location.pathname;
  return (
    <nav className="header">
      <NavLink className="header__logo" exact to="/">
        <h1>Wojna Plemmienna</h1>
      </NavLink>
      <div className="header__menu">
        {path === "/game" ? null : (
          <NavLink className="text__link text__link--mediumSize" to="/game">
            Gra
          </NavLink>
        )}
        {path === "/manual" ? null : (
          <NavLink className="text__link text__link--mediumSize" to="/manual">
            Zasady gry
          </NavLink>
        )}
        {path === "/about" ? null : (
          <NavLink className="text__link text__link--mediumSize" to="/about">
            O projekcie
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
