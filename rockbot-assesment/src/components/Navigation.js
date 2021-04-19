import React from "react";

import { Link } from "react-router-dom";



export default function Navigation() {

  return (
    <header>
      <div className="tabBar">
        <Link to="/" className="tab nowPlayingTab">
          Now Playing
        </Link>

        <Link to="/leaderboard" className="tab leaderBoardTab" >
          Leaderboard
        </Link>
      </div>
    </header>
  );
}
