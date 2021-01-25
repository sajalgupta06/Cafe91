
const mongoose =  require('mongoose')

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        min:5,
        trim: true,
        max: 32,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    Date:Date,
   

})
const User = mongoose.model('User',userSchema)
const Admin = mongoose.model('Admin',userSchema)

module.exports={User,Admin}