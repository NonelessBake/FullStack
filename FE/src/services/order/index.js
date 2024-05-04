import axiosInstance from "../../api/axios"
import { APP_CONFIG } from "../../config/appConfig"

export const orderService = {
    getOrderList: async () => {
        try {
            const data = await axiosInstance.get(`${APP_CONFIG.BASE_URL}/order`)
            return data
        } catch (err) {
            return err
        }
    },
    placeOrder: async (orderItems, subTotal,) => {
        try {
            const data = await axiosInstance.post(`${APP_CONFIG.BASE_URL}/order`, { orderItems, subTotal })
            if (!data) throw new Error("Can't create order")
            else {
                return data
            }
        }
        catch (err) {
            return err
        }
    }
}