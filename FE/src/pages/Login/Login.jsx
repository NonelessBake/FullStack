import { useState } from "react";
import { APP_CONFIG } from "../../config/appConfig";
import { authService } from "../../services/auth";
import { login } from "../../store/slice/auth";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogin } = useSelector((state) => state.auth);
  const [isFail, setIsFail] = useState(false);
  const dispatch = useDispatch();
  const onLogin = async (event) => {
    try {
      event.preventDefault();
      const data = await authService.login({
        email,
        password,
      });
      if (!data) {
        setIsFail(true);
      }
      const { accessToken, userInfo, refreshToken } = data;
      if (accessToken && userInfo) {
        localStorage.setItem(
          APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN,
          refreshToken
        );
        dispatch(login({ accessToken, userInfo }));
      }
    } catch (error) {
      setIsFail(true);
    }
  };
  return (
    <>
      {isLogin ? (
        <Navigate to="/" replace="true" />
      ) : (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-violet-300">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <Link to="/">Home</Link>

            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
              Sign in
            </h1>
            <form className="mt-6" onSubmit={onLogin}>
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
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  name="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              {isFail && (
                <div className="justify-center mb-5 text-red-600">
                  Wrong email or password
                </div>
              )}
              <div className="flex justify-between">
                <Link
                  to="/reset-password"
                  className="text-xs text-purple-600 hover:underline"
                >
                  Forget Password?
                </Link>
                <Link
                  to="/register"
                  className="text-xs text-purple-600 hover:underline"
                >
                  {`Don't have an account ?`}
                </Link>
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
