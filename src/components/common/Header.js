import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      {" | "}
      <NavLink to="/game"> Game </NavLink>
      {" | "}
      <NavLink to="/about">About</NavLink>
    </nav>
  );
};

export default Header;
