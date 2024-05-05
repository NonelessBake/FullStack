import { Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useEffect, useState } from "react";
import { APP_CONFIG } from "../config/appConfig";
import { authService } from "../services/auth";
import { login } from "../store/slice/auth";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchLogin = async () => {
      if (!isLogin) {
        if (localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)) {
          setIsLoading(true);
          const { accessToken, userInfo } = await authService.renewAccessToken(
            localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)
          );
          dispatch(login({ accessToken, userInfo }));
          setIsLoading(false);
        }
      }
    };
    fetchLogin();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      if (userInfo?.role !== "admin") {
        navigate("/");
      }
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex w-full">
          <NavigationBar />
          <main style={{ padding: "2.5rem 5rem" }} className="w-full h-screen">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
