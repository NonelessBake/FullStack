import express from 'express'
import { middleware } from '../../middlewares/middleware.js'
import { userController } from '../../controllers/user.controller.js'

const userRouter = express.Router()
userRouter.post('/register', middleware.validateSignup, userController.register)
userRouter.post('/login', middleware.validateSignin, userController.login)
userRouter.get('/:id', userController.getUser)
userRouter.get('/information/:id', middleware.verifyAccessToken, userController.getUserInfo)
userRouter.put('/information/:id', middleware.verifyAccessToken, userController.updateUserInfo)
userRouter.put('/:id/password', middleware.verifyAccessToken, userController.updateUserPassword)
export { userRouter }