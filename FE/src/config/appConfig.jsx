export const APP_CONFIG = {
  BASE_URL: import.meta.env.VITE_BACK_END_BASE_URL || "http://localhost:5000",
  STORAGE_TOKEN_NAME: {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
  },
  LOCAL_STORAGE_ITEMS: {
    CART: "cart",
  },
  PRODUCT_LIMIT: {
    SHOP: {
      PAGE_SIZE: 8,
    },
    HOME: {
      PAGE_SIZE: 10,
    },
  },
};
