import mongoose from 'mongoose'
import Collections from '../database/collection.js'

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true
    }
    ,
    discription: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    discount: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: [String],
        required: true
    }
}, { timestamps: true })
const ProductModel = mongoose.model(Collections.PRODUCTS, productSchema)
export { ProductModel }