import express from 'express'
import { middleware } from '../../middlewares/middleware.js'
import productController from '../../controllers/product.controller.js'
import authorization from '../../middlewares/author.middleware.js'
import { memoryUploader } from '../../middlewares/uploader.middleware.js'

const productRouter = express.Router()
productRouter.get('', productController.getProducts)
productRouter.get('/:id', productController.getProductById)
productRouter.post('/', middleware.verifyAccessToken, middleware.verifyRole, authorization.verifyAdmin, memoryUploader.array('files'), productController.createProduct)
productRouter.put('/:id', memoryUploader.array('files'), productController.updateProductById)
productRouter.delete('/:id', middleware.verifyAccessToken, middleware.verifyRole, authorization.verifyAdmin, productController.deleteProductById)



export { productRouter }