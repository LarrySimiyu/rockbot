import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import NowPlaying from "./NowPlaying";
import Leaderboard from "./Leaderboard";

export default function Main() {
  const [que, setQue] = useState([]);

  return (
    <main>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <NowPlaying  que={que} setQue={setQue} />
          )}
        />
        <Route
          path="/leaderboard"
          render={() => (
            <Leaderboard  que={que} setQue={setQue} />
          )}
        />
      </Switch>
    </main>
  );
}
