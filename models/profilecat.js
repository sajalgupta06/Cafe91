const mongoose = require('mongoose')

const prodSchema = new mongoose.Schema({
    img:{
        type:String,
        required:true,
    },
    catName:{
        type:String,
        required:true,
    },
})

const ProfileCat = mongoose.model('ProfileCat',prodSchema)

module.exports = ProfileCat
