import axiosInstance from "../../api/axios"
import { APP_CONFIG } from "../../config/appConfig"
export const userService = {
    getUserInfo: async (id) => {
        try {
            const { data } = await axiosInstance.get(`${APP_CONFIG.BASE_URL}/users/information/${id}`)
            if (!data) throw new Error("User info is not found")
            else {
                return data
            }
        } catch (err) {
            throw new Error(err.message)
        }
    }
    ,
    updateInfo: async (id, dataUpdate) => {
        try {
            const { data } = await axiosInstance.put(`${APP_CONFIG.BASE_URL}/users/information/${id}`, dataUpdate)
            if (!data) throw new Error("Can't update")
            else {
                return data
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    },
    updatePassword: async (id, dataUpdate) => {
        try {
            const data = await axiosInstance.put(`${APP_CONFIG.BASE_URL}/users/${id}/password`, dataUpdate)
            return data
        }
        catch (err) {
            return err
        }
    },
    resetPassword: async (email, password_2, newPassword) => {
        try {
            const data = await axiosInstance.put(`${APP_CONFIG.BASE_URL}/users/reset-password`, { email, password_2, newPassword })
            if (!data) throw new Error("Can't update")
            else {
                return data
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    }
}