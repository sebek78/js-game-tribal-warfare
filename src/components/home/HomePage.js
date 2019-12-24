import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homePage">
      <h1 className="homePage__title">Wojna Plemienna</h1>
      <p className="homePage__tagline">
        Pokonaj wrogie plemię
        <br className="tagline__break" /> i osiądź tu na stałe.
      </p>
      <p className="homePage__text">
        Wojna Plemienna jest grą karcianą dla dwóch graczy, którzy dowodzą
        prehistorycznym plemieniem. Celem gry jest pokonanie drugiego plemienia.
        Zaponaj się z{" "}
        <NavLink className="text__link" to="/manual">
          zasadami gry
        </NavLink>
        . Obecnie gra jest w bardzo wczesnej fazie produkcji i jest jeszcze nie
        grywalna.
      </p>
      <div className="homePage__btnBox">
        <NavLink to="/game" className="homePage__ctaBtn">
          Zagraj
        </NavLink>
      </div>
      <nav className="homePage__nav">
        <NavLink className="text__link" to="/manual">
          Zasady gry
        </NavLink>
        <NavLink className="text__link" to="/about">
          O projekcie
        </NavLink>
      </nav>
    </div>
  );
};

export default HomePage;
