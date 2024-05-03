import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { authService } from "../../services/auth";
import { useSelector } from "react-redux";
import { userService } from "../../services/user";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password_2, setPassword_2] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isFail, setIsFail] = useState(false);
  const { isLogin } = useSelector((state) => state.auth);
  const [isSuccess, setIsSuccess] = useState(false);
  const onResetPassword = async (event) => {
    try {
      event.preventDefault();
      const data = await userService.resetPassword(
        email,
        password_2,
        newPassword
      );
      if (!data) setIsFail(true);
      else {
        alert("Reset password successful");
        setIsSuccess(true);
      }
    } catch (error) {
      if (error) setIsFail(true);
    }
  };
  return (
    <>
      {isSuccess && <Navigate to="/login" replace="true" />}
      {isLogin ? (
        <Navigate to="/" replace="true" />
      ) : (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-violet-300">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <Link to="/">Home</Link>

            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
              Reset Password
            </h1>
            <form className="mt-6" onSubmit={onResetPassword}>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  name="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="username"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="password_2"
                  name="password_2"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password 2
                </label>
                <input
                  onChange={(e) => setPassword_2(e.target.value)}
                  value={password_2}
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="newPassword"
                  name="newPassword"
                  className="block text-sm font-semibold text-gray-800"
                >
                  New Password
                </label>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              {isFail && (
                <div className="justify-center mb-5 text-red-600">
                  Incorrect Password
                </div>
              )}
              <div className="flex justify-between">
                <Link
                  to="/login"
                  className="text-xs text-purple-600 hover:underline"
                >
                  Back To Login
                </Link>
                <Link
                  to="/register"
                  className="text-xs text-purple-600 hover:underline"
                >
                  Register
                </Link>
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
