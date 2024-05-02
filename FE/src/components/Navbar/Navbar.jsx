import "./index.css";
import logo from "../../assets/logo.png";
import logoBlack from "../../assets/logoblack.png.webp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/auth";
import { APP_CONFIG } from "../../config/appConfig";
import { FaRegUser } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { FaRegStar } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import CartList from "../CartList/CartList";
import GlobalModal from "../GlobalModal/GlobalModal";
import UserModal from "../UserModal/UserModal";

export default function Navbar(newProps) {
  const { cart } = useSelector((state) => state.cart);
  const { isHomeActive, classActive } = newProps;
  const activeClass = (params) => {
    return params.isActive ? "active-item" : "hover-active";
  };
  const { isLogin, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    handleCloseUserModal();
    handleCloseModal();
    navigate("/");
  };
  const modalStyle = {
    display: showModal ? "block" : "none",
  };

  const [userModal, setUserModal] = useState(false);
  const handleShowUserModal = () => {
    setUserModal(true);
  };
  const handleCloseUserModal = () => {
    setUserModal(false);
  };
  const userModalActive = {
    display: userModal ? "block" : "none",
  };
  return (
    <nav className={`navbar-container ${!isHomeActive ? "navbar-single" : ""}`}>
      <div className="nav-left">
        <div className="logo">
          {isHomeActive ? (
            <img src={logo} alt="logo" />
          ) : (
            <img src={logoBlack} alt="logo-black" />
          )}
        </div>
        <ul className="nav-items">
          <li>
            <NavLink to="/" className={classActive}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={activeClass}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={activeClass}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={activeClass}>
              About us
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <div>
          <button className="search-button">
            <IoMdSearch size={25} />
          </button>
        </div>
        <div className="user">
          <button className="user-button" onClick={handleShowUserModal}>
            <FaRegUser size={20} />
          </button>
          <GlobalModal
            handleCloseUserModal={handleCloseUserModal}
            userModalActive={userModalActive}
          />
          <UserModal
            userInfo={userInfo}
            isLogin={isLogin}
            onLogout={onLogout}
            handleCloseUserModal={handleCloseUserModal}
            userModalActive={userModalActive}
          />
        </div>
        <div>
          <button className="wishlist-button">
            <FaRegStar size={20} />
          </button>
        </div>
        <div className="cart">
          <button className="cart-button" onClick={handleShowModal}>
            <BsCart3 size={20} />
            <span className="cart-length">{cart.length}</span>
          </button>
          <GlobalModal
            modalStyle={modalStyle}
            handleCloseModal={handleCloseModal}
          />
          <CartList
            modalStyle={modalStyle}
            handleCloseModal={handleCloseModal}
          />
        </div>
      </div>
    </nav>
  );
}
