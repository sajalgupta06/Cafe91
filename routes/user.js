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
const nodemailer = require("nodemailer")
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require("crypto")


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))





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
                     
                        transporter.sendMail({
                            to:user.email,
                            from:"gscafe91@gmail.com",
                            subject:"Signup Successfully",
                            html:"<h1>welcome to cafe91</h1>"
                        })


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


router.post('/userorder',(req,res)=>{

    const {userId} = req.body

    OrderInfo.find( {userId}).populate().exec().then(order=>{
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

router.post("/reset-password",(req,res)=>{
    crypto.randomBytes(32,(error,buffer)=>{
        if(error)
        {
            return console.log(error)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email}).then(user=>{
            if(!user)
            {
                return res.status(422).json({error:"User does not exists with that e-mail"})
            }
            user.resetToken = token
            user.expireToken=Date.now()+3600000
            user.save().then(result=>{
                transporter.sendMail({
                    to:user.email,
                    from:"gscafe91@gmail.com",
                    subject:"Password Reset",
                    html:`<p>
                    You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset</h5>`
                })
                res.json({message:"check your Email"})
            })
        
        })
    })
})


router.post("/new-password",(req,res)=>{
    const newpassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}}).then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }

        bcrypt.hash(newpassword,12).then(hashedpassword=>{
            user.password = hashedpassword
            user.resetToken = undefined
            user.expireToken=undefined
            user.save().then((saveduser)=>{
                res.json({message:"Password Updated Successfully"})
            })
        })
    }).catch(error=>{
        console.log(error)
    })
})


module.exports = router
