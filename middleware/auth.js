const jwt = require('jsonwebtoken')
const { secret_key } = require('../config/keys')
const User = require('../models/user')



const auth = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, secret_key, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: "You must be logged in" })
        }
        const { _id } = payload
        User.findOne(_id).then(userdata => {
            req.user = userdata
            next()
        })
    })
}
module.exports = auth