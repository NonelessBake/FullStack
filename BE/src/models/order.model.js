import mongoose from "mongoose";
import Collections from "../database/collection.js";
const orderSchema = new mongoose.Schema({
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Collections.PRODUCTS,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Collections.USERS,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
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