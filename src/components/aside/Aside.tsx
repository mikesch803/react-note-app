import { NavLink } from "react-router-dom";
import { asideData } from "../../data/aside-data";
import "./Aside.css";
export function Aside() {
  const NavLinkStyles = ({ isActive }: any) => {
    return {
      color: isActive ? `var(--COLOR-PRIMARY)` : "inherit",
      backgroundColor: isActive ? "lightblue" : "",
      borderBottomRightRadius: isActive ? "25px" : "",
      borderTopRightRadius: isActive ? "25px" : "",
    };
  };

  return (
    <aside className="aside">
      <div className="sidebar">
        {asideData.map((link) => (
          <NavLink
            style={NavLinkStyles}
            to={link.to}
            className="btn btn-link"
            key={link.text}
          >
            <span className="aside-icons">{link.icon}</span>
            {link.text}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
