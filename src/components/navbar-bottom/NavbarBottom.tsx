import { NavLink } from "react-router-dom";
import { asideData } from "../../data/aside-data";
import "./NavbarBottom.css";
export function NavbarBottom() {
  const NavLinkStyles = ({ isActive }: any) => {
    return {
      color: isActive ? `var(--COLOR-PRIMARY)` : "inherit",
    };
  };
  return (
    <div className="navbar-bottom">
      <div className="navbar-bottom-icons">
        {asideData.map((link, index) => (
          <NavLink
            style={NavLinkStyles}
            to={link.to}
            className="btn btn-link"
            key={index}
          >
            <span>{link.icon}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
