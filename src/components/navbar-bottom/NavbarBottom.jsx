import React from "react";
import { NavLink } from "react-router-dom";
import { useThemeContext } from "../../context";
import { asideData } from "../../data/aside-data";
import './NavbarBottom.css';
export function NavbarBottom() {
    
  const {theme} = useThemeContext();
    const NavLinkStyles = ({ isActive }) => {
        return {
          color: isActive ? `var(--COLOR-PRIMARY)` : "inherit"
        };
      };
  return (
      <div className="navbar-bottom"  data-theme={theme}>
        <div className="navbar-bottom-icons">
        {asideData.map((link, index) => (
          <NavLink style={NavLinkStyles} to={link.to} className={NavLinkStyles?'btn btn-link':'btn'} key={index}>
            <span>{link.icon}</span>
          </NavLink>
        ))}
      </div>
      </div>
  );
}