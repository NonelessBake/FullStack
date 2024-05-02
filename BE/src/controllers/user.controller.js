import { UserModel } from "../models/user.model.js"
import { UserInfoModel } from "../models/userInfo.model.js"
import { bcryptHasing } from "../utils/bcrypt.js"
import { generateToken } from "../utils/token.js"

const userController =
{
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const existedAccount = await UserModel.findOne({ email })
            if (existedAccount) throw new Error('Email existed')
            const hash = bcryptHasing.hashingPassword(password)
            const createdUser = await UserModel.create({
                username,
                email,
                password: hash.password,
                salt: hash.salt,
            })

            const createdUserInfo = await UserInfoModel.create({
                user: createdUser._id
            })
            res.status(201).json({
                data: createdUser,
                success: true
            })
        } catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const currentUser = await UserModel.findOne({ email })
            if (!currentUser) throw new Error('Wrong email or password')
            const checkPassword = bcryptHasing.verifyPassword(password, currentUser.password, currentUser.salt)
            if (!checkPassword) throw new Error('Wrong email or password')
            const getUser = { ...currentUser.toObject() }
            delete getUser.password
            delete getUser.salt
            const accessToken = generateToken({
                userId: getUser._id,
                email: getUser.email
            },
                'AT')
            const refreshToken = generateToken({
                userId: getUser._id,
                email: getUser.email
            },
                'RT')
            res.status(201).json({
                message: 'Login success',
                data: {
                    userInfo: getUser,
                    accessToken,
                    refreshToken
                },
                success: true
            })
        }
        catch (error) {
            res.status(401).json({
                message: error.message,
                success: false
            })
        }
    },
    getUser: async (req, res) => {
        try {
            const { id } = req.params;
            const currentUser = await UserModel.findById(id, {
                password: 0,
                salt: 0
            });
            res.status(200).json({
                data: currentUser,
                message: 'Thành công!',
                success: true
            })
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }
    },
    getUserInfo: async (req, res) => {
        try {
            const { id } = req.params;
            const currentUserInfo = await UserInfoModel.find({ user: id })
            res.status(200).json({
                data: currentUserInfo,
                message: 'Thành công!',
                success: true
            })
        } catch (err) {
            res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }
    }
    ,
    updateUserInfo: async (req, res) => {
        try {
            const { id } = req.params
            const { firstName, lastName, phoneNumber, address, city } = req.body
            const currentUserInfo = await UserInfoModel.findOne({ user: id })
            if (!currentUserInfo) throw new Error("User not exist")
            currentUserInfo.firstName = firstName ? firstName : currentUserInfo.firstName
            currentUserInfo.lastName = lastName ? lastName : currentUserInfo.lastName
            currentUserInfo.phoneNumber = phoneNumber ? phoneNumber : currentUserInfo.phoneNumber
            currentUserInfo.address = address ? address : currentUserInfo.address
            currentUserInfo.city = city ? city : currentUserInfo.city
            await currentUserInfo.save()
            res.status(203).json({
                data: currentUserInfo,
                success: true,
                message: "Update successful"
            })
        }
        catch (err) {
            res.status(403).json({
                success: false,
                message: "Can't update"
            })
        }
    },
    updateUserPassword: async (req, res) => {
        try {
            const { id } = req.params
            const { currentPassword, newPassword, confirmNewPassword } = req.body
            console.log(req.body);
            if (newPassword !== confirmNewPassword) throw new Error("Newpassword Incorrect")
            const user = req.user
            if (user.userId !== id) throw new Error(`You are now allowed to do this`)
            const currentUser = await UserModel.findById(id)
            const checkPassword = bcryptHasing.verifyPassword(currentPassword, currentUser.password, currentUser.salt)
            if (!checkPassword) throw new Error('Password is not correct')
            const hash = bcryptHasing.hashingPassword(newPassword)
            await UserModel.findOneAndUpdate({ _id: id }, {
                password: hash.password,
                salt: hash.salt
            })
            res.status(201).json({ message: "Password change successful" })
        }
        catch (error) {
            res.status(403).json({ message: "Password Incorrect" })
        }
    }
}
export { userController }