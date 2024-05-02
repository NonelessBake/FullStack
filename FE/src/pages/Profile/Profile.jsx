import { NavLink, Navigate, Outlet } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";

export default function Profile() {
  const { isLogin } = useSelector((state) => state.auth);
  if (!isLogin) {
    <Navigate to="/login" />;
  }
  const activeClass = (params) => {
    return params.isActive ? "active-item" : "hover-active";
  };

  return (
    <div className="profile">
      <div className="profile-links">
        <ul className="navigation-link">
          <li>
            <NavLink className={activeClass} to="info">
              Checkout Information
            </NavLink>
          </li>
          <li>
            <NavLink className={activeClass} to="password">
              Update Password
            </NavLink>
          </li>
          <li>
            <NavLink className={activeClass} to="order">
              Order
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
