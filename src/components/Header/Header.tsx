import { NavLink, Link } from "react-router-dom";
import InStockLogo from "../../assets/logo/InStock-logo.svg";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={InStockLogo} alt="InStock Logo" />
      </Link>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <NavLink to="/" className="header__nav-link">
              Warehouses
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/inventory" className="header__nav-link">
              Inventory
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
