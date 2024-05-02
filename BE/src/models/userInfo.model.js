import mongoose from 'mongoose'
import Collections from '../database/collection.js'

const userInfoSchema = new mongoose.Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Collections.USERS,
        required: true
    }
},
    {
        timestamps: true
    })
const UserInfoModel = mongoose.model(Collections.USER_INFOS, userInfoSchema)
export { UserInfoModel }