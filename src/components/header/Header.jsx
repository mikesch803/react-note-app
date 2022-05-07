import React from "react";
import { Link } from "react-router-dom";
import { CarbonSearch } from "../../assests/icons/icons";
import "./Header.css";
export function Header() {
  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="navbar-title">Note app</h1>
      </Link>
      <div className="navbar-search">
        <input type="text" placeholder="search..." className="navbar-input" />
        <CarbonSearch />
      </div>
      <div className="navbar-icons">
        <Link to='/login'>
        <button className="btn btn-link navbar-login">
          login
        </button>
        </Link>
      </div>
    </div>
  );
}
