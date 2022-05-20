import React from "react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "../../assests/icons/icons";
import { useAuthContext, useThemeContext } from "../../context";
import "./Header.css";
export function Header() {
  const { token, user } = useAuthContext();
const {themeHandler, theme} = useThemeContext();
  return (
    <div className="navbar" data-theme = {theme}>
      <Link to="/">
        <h1 className="navbar-title">Note app</h1>
      </Link>
      
      <div className="navbar-icons">
        {token ? (
          <span className="btn btn-link navbar-login btn-user">{user.firstName}</span>
        ) : (
          <Link to="/login">
            <button className="btn btn-link navbar-login">login</button>
          </Link>
        )}
       <button className="btn btn-link btn-ft" onClick={themeHandler}>{theme === "dark" ? <MoonIcon/> : <SunIcon/>}</button>
      </div>
    </div>
  );
}
