import { ProductModel } from "../models/product.model.js"
import pageSplit from "../utils/pageSplit.js"
import { v2 as cloudinary } from 'cloudinary'
const productController = {
    getProducts: async (req, res) => {
        try {
            let { page, pageSize, search, category, sortBy } = req.query
            const filterModel = {}
            let formatSearch = ""
            let formatCategory = ""
            if (search) {
                formatSearch = search.split("-").join(" ")
                filterModel.productName = {
                    $regex: formatSearch,
                    $options: "i"
                }
            }
            if (category) {
                formatCategory = category.split("-").join(" ").toLowerCase()
                filterModel.category = formatCategory
            }
            const data = await pageSplit(page, pageSize, ProductModel, filterModel, undefined, sortBy && sortBy)
            const products = await ProductModel.find()
            const productCategories = products.map(item => item.category)
            let counter = {};
            productCategories
                .join()
                .split(",")
                .forEach((name) => (counter[name] ? counter[name]++ : (counter[name] = 1)));
            const categoryList = Object.entries(counter);
            data.categoryList = categoryList
            res.status(200).json({
                success: true,
                data,

            })
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                data: null,
                success: false
            })
        }
    }
    ,
    getProductById: async (req, res) => {
        try {
            const { id } = req.params
            const currentProduct = await ProductModel.findById(id)
            if (!currentProduct) throw new Error("Product not found")
            res.status(200).json({
                data: currentProduct,
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
    createProduct: async (req, res) => {
        try {
            const { productName, tags, price, category, discount, stock, discription, finalPrice } = req.body
            const existProduct = await ProductModel.findOne({
                productName,
                price
            })
            if (existProduct) throw new Error('Product is already existed')
            const requiredFields = ['productName', 'tags', 'price', 'category', 'discount', 'stock', 'discription', 'finalPrice'];
            for (let field of requiredFields) {
                if (!Object.prototype.hasOwnProperty.call(req.body, field)) {
                    throw new Error('Missing field: ' + field);
                }
            }
            const listFile = req.files
            if (!listFile || listFile.length === 0) throw new Error('Missing image product')
            const createdProduct = await ProductModel.create({
                productName,
                stock,
                price,
                finalPrice,
                discription,
                discount,
                tags,
                category,
                imageUrl: []
            })

            for (let file in listFile) {
                const dataUrl = `data:${listFile[file].mimetype};base64,${listFile[file].buffer.toString('base64')}`
                const fileName = `${Date.now()}-${listFile[file].originalname}`
                await cloudinary.uploader.upload(dataUrl, {
                    public_id: fileName,
                    resource_type: 'auto',
                    folder: `Products/${createdProduct._id.toString()}`
                })
            }
            const listImage = await cloudinary.api.resources({
                type: 'upload',
                prefix: `Products/${createdProduct._id.toString()}`
            })
            const urlList = listImage.resources.map(resource => resource.secure_url)
            createdProduct.imageUrl = urlList
            createdProduct.save()
            return res.status(201).json({
                data: createdProduct,
                success: true,
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
    updateProductById: async (req, res) => {
        try {
            const { id } = req.params
            const { productName, price, finalPrice, discount, imageUrl, stock, discription, category, tags } = req.body
            console.log(req.files);
            const currentProduct = await ProductModel.findById(id)
            if (!currentProduct) throw new Error("Product not found")
            const differentElements = currentProduct.imageUrl.filter(item => !imageUrl.includes(item))
            if (differentElements.length > 0) {
                currentProduct.imageUrl = currentProduct.imageUrl.filter(item => !differentElements.includes(item))
            }
            const listFile = req.files
            if (!listFile) {
                if (currentProduct.imageUrl.length === 0) throw new Error("Missing Image")
                else {
                    for (const url of differentElements) {
                        const publicId = `Products/${currentProduct._id}/${url.match(/\/v\d+\/Products\/[^/]+\/([^\.]+)/)[1]}.webp`;
                        try {
                            cloudinary.uploader.destroy(publicId);
                            console.log(publicId);
                        } catch (error) {
                            throw new Error("Can't delete")
                        }
                    }
                }
            }
            else {
                for (let file in listFile) {
                    const dataUrl = `data:${listFile[file].mimetype};base64,${listFile[file].buffer.toString('base64')}`
                    const fileName = `${Date.now()}-${listFile[file].originalname}`
                    await cloudinary.uploader.upload(dataUrl, {
                        public_id: fileName,
                        resource_type: 'auto',
                        folder: `Products/${currentProduct._id.toString()}`
                    })
                }
                const listImage = await cloudinary.api.resources({
                    type: 'upload',
                    prefix: `Products/${currentProduct._id.toString()}`
                })
                const urlList = listImage.resources.map(resource => resource.secure_url)
                currentProduct.imageUrl = [...currentProduct.imageUrl, ...urlList]
                for (const url of differentElements) {
                    const publicId = `Products/${currentProduct._id}/${url.match(/\/v\d+\/Products\/[^/]+\/([^\.]+)/)[1]}.webp`;
                    try {
                        cloudinary.uploader.destroy(publicId);
                        console.log(publicId);
                    } catch (error) {
                        throw new Error("Can't delete")
                    }
                }
            }
            currentProduct.productName = productName ? productName : currentProduct.productName
            currentProduct.tags = tags ? tags : currentProduct.tags
            currentProduct.price = price ? price : currentProduct.price
            currentProduct.category = category ? category : currentProduct.category
            currentProduct.discount = discount ? discount : currentProduct.discount
            currentProduct.stock = stock ? stock : currentProduct.stock
            currentProduct.discription = discription ? discription : currentProduct.discription
            currentProduct.finalPrice = finalPrice ? finalPrice : currentProduct.finalPrice
            await currentProduct.save()
            return res.status(201).json({
                success: true,
                message: 'Update Successful'
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
    deleteProductById: async (req, res) => {
        try {
            const { id } = req.params
            const currentProduct = await ProductModel.findOneAndDelete({ _id: id })
            if (!currentProduct) throw new Error('Product not found')
            const currentFolderPath = `Products/${currentProduct._id}`
            const findImageFolder = await cloudinary.api.delete_resources_by_prefix(currentFolderPath,
                { resource_type: 'image' })
            if (!findImageFolder) throw new Error('Cloud image folder not found')
            await cloudinary.api.delete_folder(currentFolderPath);
            res.status(200).json({
                message: 'Delete Successful',
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
    }
}
export default productController