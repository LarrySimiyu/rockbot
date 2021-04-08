import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NowPlaying from "./NowPlaying";
import Leaderboard from "./Leaderboard";

export default function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={NowPlaying}></Route>
        <Route path="/leaderboard" component={Leaderboard}></Route>
      </Switch>
    </main>
  );
}
