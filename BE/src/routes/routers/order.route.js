import express from 'express'
import { middleware } from '../../middlewares/middleware.js'
import authorization from '../../middlewares/author.middleware.js'
import orderController from '../../controllers/order.controller.js'
const orderRouter = express.Router()
orderRouter.get('/', middleware.verifyAccessToken, middleware.verifyRole, orderController.getAllOrders)
orderRouter.get('/:id', middleware.verifyAccessToken, middleware.verifyRole, orderController.getOrderById)
orderRouter.get('/status/:status', middleware.verifyAccessToken, middleware.verifyRole, orderController.getOrderByStatus)
orderRouter.get('/customer/:id', middleware.verifyAccessToken, middleware.verifyRole, authorization.verifyAdmin, orderController.getOrdersByCusomterId)

orderRouter.post('/', middleware.verifyAccessToken, middleware.verifyRole, orderController.createOrder)

orderRouter.put('/:id', middleware.verifyAccessToken, middleware.verifyRole, authorization.verifyCustomer, orderController.updateOrderById)
orderRouter.put('/status/:id', middleware.verifyAccessToken, middleware.verifyRole, authorization.verifyAdmin, orderController.updateOrderStatus)

orderRouter.delete('/:id', middleware.verifyAccessToken, middleware.verifyRole, orderController.deleteOrderById)
export default orderRouter