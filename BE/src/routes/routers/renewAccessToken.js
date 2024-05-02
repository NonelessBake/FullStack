import { Router } from "express";
import { middleware } from "../../middlewares/middleware.js";
import { generateToken } from "../../utils/token.js";
import { UserModel } from "../../models/user.model.js";
import { verifyToken } from "../../utils/token.js";

const renewAccessTokenRouter = Router();
renewAccessTokenRouter.post('', async (req, res) => {
    try {
        const { refreshToken } = req.body
        const data = verifyToken(refreshToken, 'RT')
        const dataToken = {
            userId: data.userId,
            email: data.email,
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
            message: 'Token đã được làm mới'
        })

    } catch (error) {
        res.status(403).json({
            data: null,
            message: "Token đã hết hạn sử dụng",
            success: false,
            error
        });
    }
});
export default renewAccessTokenRouter;