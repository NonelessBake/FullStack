import { NavLink, Outlet } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";
export default function Order() {
  const activeClass = (params) => {
    return params.isActive ? "active-item" : "hover-active";
  };
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <div className="order-page">
      <ul className="navigation-link">
        <li>
          <NavLink to="/order/shopping-cart" className={activeClass}>
            shopping cart
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${isLogin ? "/order/check-out" : "/login"}`}
            className={activeClass}
          >
            checkout
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
