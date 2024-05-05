import { UserModel } from "../models/user.model.js";
import { verifyToken } from "../utils/token.js";

const middleware = {
    validateSignup: (req, res, next) => {
        try {
            const { email, password, username } = req.body
            if (!email) throw new Error('Missing email')
            const formatEmail = String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            if (!formatEmail) throw new Error('Email không đúng định dạng!');
            if (!password) throw new Error('Missing password')
            if (password.length < 6) throw new Error('Password at least 6 letters')
            if (!username) throw new Error('Missing username')
            next()
        }
        catch (error) {
            res.status(403).json({ message: error.message })
        }
    },
    validateSignin: (req, res, next) => {
        try {
            const { email, password } = req.body
            if (!email) throw new Error('Missing email')
            const formatEmail = String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            if (!formatEmail) throw new Error('Email không đúng định dạng!');
            if (!password) throw new Error('Missing password')
            if (password.length < 6) throw new Error('Password at least 6 letters')
            next()
        }
        catch (error) {
            res.status(403).json({ message: error.message })
        }
    },
    verifyAccessToken: (req, res, next) => {
        try {
            const authToken = req.headers['authorization']
            if (!authToken) throw new Error('Invalid token')
            const token = authToken.split(' ')[1]
            const data = verifyToken(token, 'AT')
            req.user = data
            next()
        }
        catch (error) {
            let type = '';
            let getMessage = '';
            switch (error.message) {
                case 'invalid signature':
                    getMessage = 'Không thể xác thực token';
                    type = 'INVALID_TOKEN';
                    break;
                case 'jwt expired':
                    getMessage = 'Token hết hạn';
                    type = 'EXP_TOKEN';
                    break;
                default:
                    getMessage = 'Không thể xác thực';
                    type = 'UNAUTH';
                    break;
            }
            res.status(401).json({
                data: null,
                error,
                message: getMessage,
                type,
                success: false,
            });
        }
    },
    verifyRefreshToken: (req, res, next) => {
        try {
            const authToken = req.headers['authorization'];
            if (!authToken) throw new Error('Bạn không thể thực hiện hành động!');
            const token = authToken.split(' ')[1];
            const data = verifyToken(token, 'RT');
            req.user = data;
            next();
        } catch (error) {
            let type = '';
            let getMessage = '';
            switch (error.message) {
                case 'invalid signature':
                    getMessage = 'Không thể xác thực token';
                    type = 'INVALID_TOKEN';
                    break;
                case 'jwt expired':
                    getMessage = 'Token hết hạn';
                    type = 'EXP_TOKEN';
                    break;
                default:
                    getMessage = 'Không thể xác thực';
                    type = 'UNAUTH';
                    break;
            }
            res.status(401).json({
                data: null,
                error,
                message: getMessage,
                type,
                success: false,
            });
        }
    },
    verifyComment: (req, res, next) => {
        try {
            const { postId, content } = req.body
            if (!postId) throw new Error('Post id is empty')
            if (!content) throw new Error('Comment is empty')
            next()
        }
        catch (error) {
            res.status(403).json({ message: error.message })
        }
    },
    verifyRole: async (req, res, next) => {
        try {
            const user = req.user
            const currentUser = await UserModel.findOne({
                _id: user.userId,
                role: { $in: ["admin", "customer"] }
            });
            if (!currentUser) throw new Error(`You don't have permission`)
            req.role = currentUser.role
            next()
        }
        catch (error) {
            res.status(404).json({
                message: error.message,
                success: false
            })
        }
    }
}
export { middleware }