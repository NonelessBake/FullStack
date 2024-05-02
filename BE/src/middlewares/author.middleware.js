

const authorization = {
    verifyAdmin: (req, res, next) => {
        try {
            if (req.role !== "admin") throw new Error("You don't have permission")
            next()
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    },
    verifyCustomer: (req, res, next) => {
        try {
            if (req.role !== "customer") throw new Error("You don't have permission")
            next()
        }
        catch (error) {
            res.status(403).json({
                message: error.message,
                success: false
            })
        }
    }
}

export default authorization