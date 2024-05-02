import mongoose from 'mongoose'
const connectDB = async () => {
    const connectString = process.env.DB_URL
    return await mongoose.connect(connectString)
}
export default connectDB