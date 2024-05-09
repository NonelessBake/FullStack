import { APP_CONFIG } from "../../config/appConfig";
import axiosInstance from "../axios";

export const apiAuth = {
  login: async (payloadLogin) => {
    try {
      const { data } = await axiosInstance.post("/users/login", payloadLogin);
      if (data) {
        return data;
      } else {
        throw new Error("missing data");
      }
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  },
  renewAccessToken: async (payloadToken) => {
    try {
      const { data } = await axiosInstance.post(
        `${APP_CONFIG.BASE_URL}/renew-access-token`,
        { refreshToken: payloadToken }
      );
      if (data) {
        return data;
      } else {
        throw new Error("Dữ liệu trả về bị thiếu");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
