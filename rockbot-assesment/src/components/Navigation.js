import React from "react";

import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <nav>
        <Link to="/">Now Playing</Link>

        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
    </header>
  );
}
