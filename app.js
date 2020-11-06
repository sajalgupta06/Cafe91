const express =  require('express')
const mongoose =  require('mongoose')
// const cors =require('cors')
const https =require('https') 
const {mongourl} = require('./config/keys');
const PORT = process.env.PORT||5000
const app = express();


// app.use(cors())
mongoose.connect(mongourl,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})

mongoose.connection.on("connected",()=>{
    console.log("mongoose connected successfully")
})
mongoose.connection.on('error',(error)=>{
    console.log("mongoose not connected",error)
})

require('./models/user')
require('./models/product')
app.use(express.json())
app.use(require('./routes/user'))


if(process.env.NODE_ENV=="production")
{
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("we are up")
})
