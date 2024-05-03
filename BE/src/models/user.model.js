import mongoose from 'mongoose'
import Collections from '../database/collection.js'

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    password_2: String,
    salt: String,
    salt_2: String,
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