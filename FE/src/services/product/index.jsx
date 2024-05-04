import axios from "axios";
import { APP_CONFIG } from "../../config/appConfig";

export const productService = {
  getProducts: async (params) => {
    try {
      const { data } = await axios.get(
        `${APP_CONFIG.BASE_URL}/product?${
          params.page && `page=${params.page}`
        }&${params.pageSize && `pageSize=${params.pageSize}`}&${
          params.search && `search=${params.search}`
        }&${params.category && `category=${params.category}`}&${
          params.sortBy && `sortBy=${params.sortBy}`
        }`
      );
      if (!data) throw new Error("Product data is missing");
      else {
        return data;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getProductById: async (id) => {
    try {
      const { data } = await axios.get(`${APP_CONFIG.BASE_URL}/product/${id}`);
      if (!data) throw new Error("Product is not exist");
      else {
        return data;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
