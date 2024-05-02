import { Link } from "react-router-dom";
import "./index.css";

export default function UserModal(newProps) {
  const { handleCloseUserModal, userModalActive, isLogin, onLogout, userInfo } =
    newProps;
  return (
    <div className={`user-modal`} style={userModalActive}>
      {!isLogin ? (
        <div className="navigate-auth">
          <p>
            <Link to="/login">Login</Link>
          </p>
          <p>
            <Link to="/register">Register</Link>
          </p>
        </div>
      ) : (
        <div className="logged-in-user">
          <p>
            <Link
              to={`/profile/${userInfo._id}/info`}
              onClick={handleCloseUserModal}
            >
              My Profile
            </Link>
          </p>
          <p>
            <Link
              to={`/profile/${userInfo._id}/order`}
              onClick={handleCloseUserModal}
            >
              Order Tracking
            </Link>
          </p>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
