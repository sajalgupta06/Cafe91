const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {User} = require("../models/user");
const {Admin} = require("../models/user");
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const { secret_key } = require('../config/keys');
const Prod = require("../models/product");
const ProfleCat = require("../models/profilecat");
const ProfileCat = require("../models/profilecat");
const OrderInfo = require("../models/orderinfo");

router.post('/signup', (req, res) => {
    const { name, email, password, phonenum } = req.body;
    if (!name || !email || !password || !phonenum) {
        res.status(422).json({ error: "All fields are required" });
    }
    User.findOne({ email }).then((saveduser) => {
        if (saveduser) {
            return res.json({ error: "Email Already exist" });
        }
        User.findOne({ phonenum }).then((saveduser) => {
            if (saveduser) {
                return res.json({ error: "Phone Number Already exist" });
            }
            bcrypt.hash(password, 8).then((hashedpass) => {
                const user = new User({
                    name,
                    password: hashedpass,
                    email,
                    phonenum,
                });

                user
                    .save()
                    .then((user) => {
                        res.status(400).json("Signup Successfully");
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            });
        });
    });
});

router.post('/signin',(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ error: "Please fill the above fields" })
    }
    User.findOne({ email }).then(saveduser => {
        if (!saveduser) {
            return res.json({ error: "Invalid Email and Password" })
        }
        bcrypt.compare(password, saveduser.password).then(user => {
            if (!user) {
                return res.json({ error: "Invalid Email and Password" })
            }
            const token=jwt.sign({id:saveduser._id},secret_key)
            const {_id} = saveduser
            res.json({token,user:_id})
        })
    }).catch(error => {
        res.send(error)
    })
})

router.post('/adminsignin',(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ error: "Please fill the above fields" })
    }
    Admin.findOne({ email }).then(saveduser => {
        if (!saveduser) {
            return res.json({ error: "Invalid Email and Password" })
        }
        bcrypt.compare(password, saveduser.password).then(user => {
            if (!user) {
                return res.json({ error: "Invalid Email and Password" })
            }
            const token=jwt.sign({id:saveduser._id},secret_key)
            const {name ,email} = saveduser
            res.json({token,user:{name,email}})
        })
    }).catch(error => {
        res.send(error)
    })
})                                                                              

router.get('/getusers',(req,res)=>{

    User.find().populate().exec().then(users=>

      res.json(users)
        )
    
})

router.post('/addproduct',(req,res)=>{
    const {name,price,quantity,img,inCart,catName} = req.body
    const prod = new Prod({
        name,
        price,
        quantity,
        img,
        inCart,
        catName
    })

    prod.save().then(savedprod=>{
        res.json("Product added")
    }).catch(error=>{
        res.send(error)
    })

})

router.post('/searchprod',(req,res)=>{
    Prod.find().populate().then(prod=>
        res.send(prod)
    )
})

router.post('/deleteprod',(req,res)=>{
    const {category} = req.body
    Prod.find(category).populate().then(prod=>
        res.send(prod)
    )
})

router.post('/addcategory',(req,res)=>{

    const {catName,img} = req.body

    const profilecat = new ProfileCat({
        catName,
        img
    })

    profilecat.save().then(savedcat=>{
        res.send(savedcat)
    }).catch(error=>{
        res.send(error)
    })
})

router.post('/searchcategory',(req,res)=>{
    ProfileCat.find().populate().then(cat=>{
        res.send(cat)
    }).catch(error=>{
        res.send(error)
    })
})

router.post('/orderinfo',(req,res)=>{

    const {products,userInfo} = req.body


    if(!userInfo.name||!userInfo.phone||!userInfo.address)
    {
        return res.send({error:"Please Fill above required fields"})
    }
    // const {catName,price,total,count,userName,contactNum} = req.body
    const orderinfo = new OrderInfo({
        productInfo:products,
        userId:userInfo.id,
        userName:userInfo.name,
        contactNum:userInfo.phone,
        address:userInfo.address,

    })
    orderinfo.save().then(savedorder=>{
        return res.send({mssg:"Order Placed"})
    }).catch(error=>{
        console.log(error)
       return  res.send(error)
    })
})

router.get('/adminorder',(req,res)=>{

    OrderInfo.find().populate().exec().then(order=>{
        res.send(order)
    }).catch(error=>{
        res.send(error)
    })
})

router.post('/spawnitems',(req,res)=>{
    const {catName}= req.body
    Prod.find({catName}).populate().exec().then(prod=>
        {
        return res.send(prod)
    }).catch(error=>{
        res.send(error)
    })

})



module.exports = router
