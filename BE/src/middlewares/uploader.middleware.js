import multer from 'multer'
const disksStorage = multer.diskStorage('/')
const diskUploader = multer({ storage: disksStorage })

const memoryStorage = multer.memoryStorage()
const memoryUploader = multer({ storage: memoryStorage })

export { diskUploader, memoryUploader }