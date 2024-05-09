import { useSelector } from "react-redux";
import "./index.css";
import { useState } from "react";
import { userService } from "../../services/user";
export default function ChangePassword() {
  const { userInfo } = useSelector((state) => state.auth);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };
  const onChangePassword = async (e) => {
    e.preventDefault();
    if (
      password.currentPassword &&
      password.newPassword &&
      password.confirmNewPassword
    ) {
      if (
        password.newPassword === password.confirmNewPassword &&
        password.currentPassword !== password.newPassword
      ) {
        try {
          setIsLoading(true);
          const data = await userService.updatePassword(userInfo._id, password);
          setIsLoading(false);
          setPassword({});
          setError("");
          alert("Password Updated");
        } catch (err) {
          setIsLoading(false);
          console.log(err);
          setError(err.message);
        }
      } else {
        setError("Confirm New Password Incorrect");
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <div>Loadding...</div>
      ) : (
        <form onSubmit={onChangePassword} className="update-password">
          <div>
            <label htmlFor="current-password">Current Password:</label>
            <input
              onChange={handleChange}
              type="password"
              name="currentPassword"
            />
          </div>
          <div>
            <label htmlFor="new-passowrd">New Password:</label>
            <input onChange={handleChange} type="password" name="newPassword" />
          </div>
          <div>
            <label htmlFor="confirm-new-password">Confirm New Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmNewPassword"
            />
          </div>
          {error.length > 0 && <div style={{ color: "red" }}>{error}</div>}
          <button>Save</button>
        </form>
      )}
    </>
  );
}
