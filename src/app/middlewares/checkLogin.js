const Account = require('../models/Account')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../credentials')

async function isLogin(req, res, next) {
    let header = req.headers.authorization
    let token = header && header.split(' ')[1]
    if (!token) {
        return res.json({ success: false, message: "Token missing" })
    }
    try {
        var decoded = jwt.verify(token, SECRET_KEY)
        const { _id } = decoded
        let account = await Account.findOne({ _id })
        if (!account) return res.json({ success: false, message: "User was not found" })
        req._id = _id
        next()
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

module.exports = isLogin