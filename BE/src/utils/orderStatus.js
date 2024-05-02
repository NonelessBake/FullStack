import { OrderStatus } from "../config/order_status.config.js";

export const checkStatus = (status) => {
    if (OrderStatus.status[status]) {
        return true;
    } else {
        return false;
    }
};