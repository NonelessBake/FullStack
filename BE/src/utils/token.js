import jwt from 'jsonwebtoken'
const generateToken = (document, type) => {
    const secretKey = type === 'AT' ? process.env.AT_KEY : process.env.RT_KEY
    const expireTime = type === 'AT' ? 300 : '7d'
    const token = jwt.sign(document, secretKey, {
        expiresIn: expireTime
    })
    return token
}
const verifyToken = (document, type) => {
    const secretKey = type === 'AT' ? process.env.AT_KEY : process.env.RT_KEY
    const decoded = jwt.verify(document, secretKey)
    return decoded
}
export { generateToken, verifyToken }