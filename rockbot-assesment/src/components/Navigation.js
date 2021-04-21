import React from "react";

import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  return (
    <header>
      <div className="tabBar">
        <Link
          to="/"
          className={location.pathname === "/" ? "activeTab" : "tab"}
        >
          Now Playing
        </Link>

        <Link
          to="/request"
          className={location.pathname === "/request" ? "activeTab" : "tab"}
        >
          Request
        </Link>
      </div>
    </header>
  );
}
