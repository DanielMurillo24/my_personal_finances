import { Link, NavLink } from "react-router-dom";
import { User, LogIn, LogOut } from "lucide-react";
import { useAuthStore } from "../hooks";

export const Navbar = () => {
  const { initlogout, user } = useAuthStore();

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark p-2 shadow-lg border-bottom border-secondary"
      style={{ backgroundColor: "#033f63" }}
    >
      <div className="d-flex justify-content-center ps-4">
        <Link className="navbar-brand" to="/">
          Home Page
        </Link>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto align-items-center gap-2">
          <li className="nav-item dropdown me-3">
            <a
              className="nav-link dropdown-toggle text-white d-flex align-items-center gap-1"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <User size={18} />
              {user.name}
            </a>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="settingsDropdown"
            >
              <li>
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/settings">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/categories">
                  Categories
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center gap-2 text-danger"
                  onClick={initlogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
