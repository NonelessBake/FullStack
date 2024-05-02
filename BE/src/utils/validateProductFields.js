export const validateProductFields = (object) => {
    const requiredFields = ['productName', 'stock', 'price', 'description', 'ram', 'cpu', 'screenResolution', 'vga']
    for (let field of requiredFields) {
        if (!object.hasOwnProperty(field)) {
            return false
        }
    }
}