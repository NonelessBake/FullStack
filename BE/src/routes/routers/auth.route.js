import { Router } from "express";
import { middleware } from "../../middlewares/middleware.js";
import { generateToken } from "../../utils/token.js";
import { UserModel } from "../../models/user.model.js";


const RouterAuthentication = Router();
RouterAuthentication.post('', middleware.verifyRefreshToken, async (req, res) => {
    try {
        const dataToken = {
            userId: req.user.userId,
            email: req.user.email,
            typeToken: 'AT'
        }
        const currentUser = await UserModel.findById(dataToken.userId)
        if (!currentUser) throw new Error("User non exist")
        const getUser = { ...currentUser.toObject() }
        delete getUser.password
        delete getUser.salt
        const createAccessToken = generateToken(dataToken, 'AT');
        res.status(201).json({
            userInfo: getUser,
            accessToken: createAccessToken,
            success: true,
            message: 'Xác thực thành công!'
        })
    } catch (error) {
        res.status(403).json({
            data: null,
            message: error.message,
            success: false,
            error
        });
    }
});
export default RouterAuthentication;