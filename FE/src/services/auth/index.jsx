import axios from "axios";
import { apiAuth } from "../../api/auth";
import { APP_CONFIG } from "../../config/appConfig";

export const authService = {
  register: async (payloadRegister) => {
    try {
      const data = await axios.post(
        `${APP_CONFIG.BASE_URL}/users/register`,
        payloadRegister
      );
      if (!data) throw new Error("Sai thông tin đăng ký");
      else {
        return data;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
  login: async (payloadLogin) => {
    try {
      const { data } = await apiAuth.login(payloadLogin);
      const { accessToken, refreshToken, userInfo } = data;
      if (accessToken && refreshToken) {
        return {
          userInfo,
          accessToken,
          refreshToken,
        };
      } else {
        throw new Error("Incorrect password");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
  renewAccessToken: async (refreshToken) => {
    try {
      const { accessToken, userInfo } = await apiAuth.renewAccessToken(
        refreshToken
      );
      if (!accessToken && !userInfo) {
        throw new Error("Data was empty");
      }
      return {
        userInfo,
        accessToken,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
