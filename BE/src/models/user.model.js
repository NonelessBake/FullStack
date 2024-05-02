import mongoose from 'mongoose'
import Collections from '../database/collection.js'

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    salt: String,
    avatar: String,
    role: {
        type: String,
        default: 'customer'
    },
},
    {
        timestamps: true
    })
const UserModel = mongoose.model(Collections.USERS, userSchema)
export { UserModel }