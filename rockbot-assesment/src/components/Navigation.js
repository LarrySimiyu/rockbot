import React from "react";

import { Link } from "react-router-dom";



export default function Navigation() {

  return (
    <header>
      <div className="tabBar">
        <Link to="/" className="tab">
          Now Playing
        </Link>

        <Link to="/request" className="tab">
          Request
        </Link>
      </div>
    </header>
  );
}
