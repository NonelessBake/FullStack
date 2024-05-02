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
            // Gửi lại tất cả các yêu cầu trước đó đã thất bại
            refreshAndRetryQueue.forEach((retryRequest) => {
              retryRequest.resolve(axios(originalRequest));
            });
            refreshAndRetryQueue.length = 0; // Xoá queue sau khi đã gửi lại tất cả yêu cầu
          } catch (refreshError) {
            // Xử lý lỗi khi làm mới access token
            console.log("error axios response interceptor");
          }
        } else {
          if (isLogin) {
            store.dispatch(logout());
          }
        }
      }
      return new Promise((resolve, reject) => {
        // Đưa yêu cầu vào queue để gửi lại sau khi làm mới access token thành công
        refreshAndRetryQueue.push({ resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from "axios";
// import { APP_CONFIG } from "../config/appConfig";
// import { store } from "../store/config";
// import { login, logout } from "../store/slice/auth";
// import { authService } from "../services/auth";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACK_END_BASE_URL || "http://localhost:5000",
//   timeout: import.meta.env.VITE_REQUEST_HTTP_TIMEOUT || 20000,
// });

// axiosInstance.interceptors.request.use(function (config) {
//   const {
//     auth: { isLogin, accessToken },
//   } = store.getState();

//   if (isLogin && accessToken) {
//     config.headers["Authorization"] = "Bearer " + accessToken;
//   }

//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem(
//         APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN
//       );
//       if (refreshToken) {
//         const { accessToken, userInfo } = await authService.renewAccessToken(
//           refreshToken
//         );
//         store.dispatch(login({ accessToken, userInfo }));
//       } else {
//         const {
//           auth: { isLogin },
//         } = store.getState();
//         if (isLogin) {
//           store.dispatch(logout());
//         }
//       }
//       return axios(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );
