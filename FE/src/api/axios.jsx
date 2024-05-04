import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";
import { store } from "../store/config";
import { login, logout } from "../store/slice/auth";
import { authService } from "../services/auth";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_BASE_URL || "http://localhost:5000",
  timeout: import.meta.env.VITE_REQUEST_HTTP_TIMEOUT || 10000,
});

axiosInstance.interceptors.request.use(function (config) {
  const {
    auth: { isLogin, accessToken },
  } = store.getState();

  if (isLogin && accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }

  return config;
});
const refreshAndRetryQueue = [];

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const {
        auth: { isLogin },
      } = store.getState();
      if (error.config.url.includes("/renew-access-token")) {
        localStorage.removeItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN);
        if (isLogin) {
          store.dispatch(logout());
        }
      } else {
        const refreshToken = localStorage.getItem(
          APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN
        );
        if (refreshToken) {
          try {
            const { accessToken, userInfo } =
              await authService.renewAccessToken(refreshToken);
            store.dispatch(login({ accessToken, userInfo }));

            // Add a new field to the original request headers to mark it as retried
            originalRequest.headers["retry"] = true;
          } catch (refreshError) {
            console.log("error axios response interceptor");
          }
        } else {
          if (isLogin) {
            store.dispatch(logout());
          }
        }
      }
      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ resolve, reject });
      });
    } else if (originalRequest.headers["retry"]) {
      // Do not retry the request if it has already been retried after renewing access token
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
