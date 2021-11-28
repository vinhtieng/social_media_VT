const User = require('../models/User')
class UserController {
    async createUser(req, res) {
        let { name, email, introduction, image, website } = req.body
        let id = req._id
        try {
            const data = { userid: id, name, email, introduction, image, website }
            const user = new User(data)
            await user.save()
            return res.json({ success: true, message: "User created!", user })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    }

    async updateUser(req, res) {
        let id = req._id
        try {
            const user = await User.findOneAndUpdate({ userid: id }, req.body, { new: true })
            return res.json({ success: true, message: "User was updated!", user })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error.message })
        }
    }
}

module.exports = new UserController();