import { Link } from "react-router-dom";
import { useAuthContext } from "../../context";
import logo from "../../assests/images/logo.png";
import "./Header.css";

export function Header() {
  const { token, user } = useAuthContext();
  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="navbar-title">
          Note app <img src={logo} alt="logo" height={50} width={50} />
        </h1>
      </Link>

      <div className="navbar-icons">
        {token ? (
          <span className="btn btn-link navbar-login btn-user">
            {user?.firstName}
          </span>
        ) : (
          <Link to="/login">
            <button className="btn btn-link navbar-login">login</button>
          </Link>
        )}
      </div>
    </div>
  );
}
