import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import PageNotFound from "./PageNotFound";
import Game from "./game/Game";
import ManualPage from "./manual/ManualPage";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/game" component={Game} />
        <Route path="/manual" component={ManualPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
