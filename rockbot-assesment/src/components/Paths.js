import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import NowPlaying from "./NowPlaying";

import Request from "./Request";
export default function Main() {
  const [que, setQue] = useState([]);

  return (
    <main>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <NowPlaying que={que} setQue={setQue} />}
        />
        <Route
          path="/request"
          render={() => <Request que={que} setQue={setQue} />}
        />
      </Switch>
    </main>
  );
}
