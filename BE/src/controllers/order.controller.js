
import { OrderStatus } from "../config/order_status.config.js"
import OrderModel from "../models/order.model.js"
import { ProductModel } from "../models/product.model.js"
import { checkStatus } from "../utils/orderStatus.js"
import pageSplit from "../utils/pageSplit.js"

const orderController = {
    getAllOrders: async (req, res) => {
        try {
            const { page, pageSize } = req.query
            const role = req.role
            const user = req.user
            let findData = []
            if (role === 'admin') {
                findData = await pageSplit(page, pageSize, OrderModel, null, 'items.product')
            }
            if (role === 'customer') {
                findData = await pageSplit(page, pageSize, OrderModel, {
                    customer: user.userId
                }, 'items.product')
            }

            return res.status(200).json({
                data: findData,
                success: true
            })
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                data: null,
                success: false
            })
        }
    },
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;
            const { page, pageSize } = req.query
            const data = await pageSplit(page, pageSize, OrderModel, { _id: id }, 'items.product')
            if (!data) throw new Error('Order not found')

            return res.status(200).json({
                data,
                success: true
            });
        } catch (error) {
            return res.status(403).json({ error: error.message });
        }
    },
    getOrdersByCusomterId: async (req, res) => {
        try {
            const { id } = req.params
            const { page, pageSize } = req.query
            const data = await pageSplit(page, pageSize, OrderModel, { customer: id })
            if (!data) throw new Error('Order not found')
            res.status(200).json({
                data: data,
                success: true
            })
        }

        catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    },
    getOrderByStatus: async (req, res) => {
        try {
            const { status } = req.params
            const { page, pageSize } = req.query
            if (!status) throw new Error('Status is missing')
            const isValidStatus = checkStatus(status)
            if (!isValidStatus) throw new Error('Status is not correct')
            const user = req.user
            const role = req.role
            if (role === 'admin') {
                const data = await pageSplit(page, pageSize, OrderModel, { status })
                return res.status(200).json({
                    data: data,
                    success: true
                })
            }
            if (role === 'customer') {
                const data = await pageSplit(page, pageSize, OrderModel, {
                    status,
                    _id: user.userId
                })

                return res.status(200).json({
                    data: data,
                    success: true
                })
            }
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }

    },
    createOrder: async (req, res) => {
        try {
            const { items, totalPrice } = req.body
            /* items = [{
                product: "id",
                quanity: 123123
            },
                product: "id",
                quanity: 2312312
            ]*/
            const user = req.user
            for (let i = 0; i < items.length; i++) {
                const currentItem = await ProductModel.findById(items[i].product)
                if (!currentItem) {
                    throw new Error('Product(s) not found')
                }
            }
            const createdOrder = await OrderModel.create({
                items,
                customer: user.userId,
                totalPrice
            })
            res.status(201).json({
                data: createdOrder,
                success: true,
                message: 'Order successful'
            })
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    },
    updateOrderStatus: async (req, res) => {
        try {
            const { orderStatus } = req.orderStatus
            const { id } = req.params
            const currentOrder = await OrderModel.findById(id)
            if (!currentOrder) throw new Error('Order not found')
            currentOrder.status = orderStatus
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    }
    ,
    updateOrderById: async (req, res) => {
        try {
            const { id } = req.params
            const { items, totalPrice } = req.body
            for (let i = 0; i < items.length; i++) {
                const currentItem = await ProductModel.findById(items[i].product)
                if (!currentItem) {
                    throw new Error('Product(s) not found')
                }
            }
            const user = req.user
            const currentOrder = await OrderModel.findById(id)

            if (!currentOrder) throw new Error('Order not found')
            if (user.userId !== currentOrder.customer.toString()) throw new Error(`You don't have permission`)
            if (currentOrder.status !== OrderStatus.status.received) throw new Error(`Can't update order while ${currentOrder.status}`)
            for (let i = 0; i < items.length; i++) {
                if (items[i].quantity < 0 || items[i].product.length <= 0) throw new Error('Item quantity is lower than 0')
            }
            if (!totalPrice || totalPrice <= 0) throw new Error('Total price is wrong')
            for (let i = 0; i < currentOrder.items.length; i++) {
                for (let j = 0; j < items.length; j++) {
                    if (currentOrder.items[i].product === items[j].product) {
                        currentOrder.items[i].quantity = items[j].quantity
                    }
                }
            }
            currentOrder.totalPrice = totalPrice
            await currentOrder.save()
            res.status(201).json({
                message: 'Order updated',
                success: true,
                data: currentOrder
            })
        }
        catch (error) {
            res.status(404).json({
                message: error.message,
                success: false
            })
        }
    },
    deleteOrderById: async (req, res) => {
        try {
            const { id } = req.params
            const user = req.user
            const currentOrder = await OrderModel.findById(id)
            if (!currentOrder) throw new Error('Order not found')
            if (user.userId !== currentOrder.customer) throw new Error(`You don't have permission`)
            if (currentOrder.status !== OrderStatus.status.received || currentOrder.status !== OrderStatus.status.delivered) throw new Error(`Can't delete order while ${currentOrder.status}`)
            await OrderModel.findByIdAndDelete(id)
            res.status(201).json({
                message: 'Order deleted',
                success: true,
            })
        }
        catch (error) {
            res.status(404).json({
                message: error.message,
                success: false
            })
        }
    }
}

export default orderController