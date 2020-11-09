const mongoose = require("mongoose");

const orderinfoSchema = new mongoose.Schema({
      productInfo:[{
        catName: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    }],
      userName:{
        type:String,
        required:true
    },
    contactNum:{
        type:Number,
        required:true
    },
    address:{
      type:String,
      required:true
  },
  userId:{
    type:String,
    required:true
},
date:{type:String},

total:{type:Number}
    
});

const OrderInfo = mongoose.model("OrderInfo", orderinfoSchema);

module.exports = OrderInfo;
