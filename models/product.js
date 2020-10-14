const mongoose = require('mongoose')

const prodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    inCart:{
        type:Boolean,
        required:true,
    },
    catName:{
        type:String,
        required:true,
    },
})

const Prod = mongoose.model('Prod',prodSchema)

module.exports = Prod
