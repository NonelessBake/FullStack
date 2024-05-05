import axios from "axios";
import { APP_CONFIG } from "../../config/appConfig";
import axiosInstance from "../../api/axios";
const URL_PATH = `${APP_CONFIG.BASE_URL}/product`;
export const productService = {
  getProducts: async (params) => {
    try {
      const { data } = await axios.get(
        `${URL_PATH}?${params.page && `page=${params.page}`}&${
          params.pageSize && `pageSize=${params.pageSize}`
        }&${params.search && `search=${params.search}`}&${
          params.category && `category=${params.category}`
        }&${params.sortBy && `sortBy=${params.sortBy}`}`
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
      const { data } = await axios.get(`${URL_PATH}/${id}`);
      if (!data) throw new Error("Product is not exist");
      else {
        return data;
      }
    } catch (err) {
      return err;
    }
  },
  createProduct: async (formData) => {
    try {
      const data = await axiosInstance.post(`${URL_PATH}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      console.log(formData);
      return data;
    } catch (err) {
      return err;
    }
  },
  updateProductById: async (productId, formData) => {
    try {
      console.log(formData);
      const data = await axiosInstance.put(
        `${URL_PATH}/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (err) {
      return err;
    }
  },
  deleteProductById: async (productId) => {
    try {
      const data = await axiosInstance.delete(`${URL_PATH}/${productId}`);
      if (!data) {
        throw new Error("Delete failed");
      }
      return data;
    } catch (err) {
      return err;
    }
  },
};
