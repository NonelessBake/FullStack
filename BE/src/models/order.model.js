import mongoose from "mongoose";
import Collections from "../database/collection.js";
const orderSchema = new mongoose.Schema({
    orderList: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Collections.PRODUCTS,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        totalprice: {
            type: Number,
            required: true
        }
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Collections.USERS,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'received'
    },
},
    {
        timestamps: true
    })
const OrderModel = mongoose.model(Collections.ORDERS, orderSchema)
export default OrderModel