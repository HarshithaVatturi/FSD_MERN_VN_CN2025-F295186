import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h2 className="logo">My College</h2>

      <nav className="nav-bar">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          About
        </NavLink>
        <NavLink
          to="/departments"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Departments
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
