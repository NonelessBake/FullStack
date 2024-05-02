import express from 'express'
import RouterAuthentication from './routers/auth.route.js';
import { userRouter } from './routers/user.route.js';
import { productRouter } from './routers/product.route.js';
import orderRouter from './routers/order.route.js';
import renewAccessTokenRouter from './routers/renewAccessToken.js';

const rootRouter = express.Router()

rootRouter.use('/authentication', RouterAuthentication);
rootRouter.use('/renew-access-token', renewAccessTokenRouter);
rootRouter.use('/users', userRouter)
rootRouter.use('/product', productRouter)
rootRouter.use('/order', orderRouter)

export { rootRouter }