// Libraries
import { NavLink, Link, useMatch } from "react-router-dom";

// Assets
import InStockLogo from "../../assets/logo/InStock-logo.svg";

// Styles
import "./Header.scss";

function Header() {
  const isWarehousesActive = useMatch("/warehouses/*");
  const isInventoryActive = useMatch("/inventory/*");

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={InStockLogo} alt="InStock Logo" />
      </Link>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <NavLink
              to="/warehouses"
              className={`header__nav-link ${
                isWarehousesActive ? "active" : ""
              }`}
            >
              Warehouses
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink
              to="/inventory"
              className={`header__nav-link ${
                isInventoryActive ? "active" : ""
              }`}
            >
              Inventory
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
