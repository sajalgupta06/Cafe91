const express =  require('express')
const mongoose =  require('mongoose')
const https =require('https') 
const {mongourl} = require('./config/keys');
const PORT = process.env.PORT||5000
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy
const cookieSession = require("cookie-session")
const Keys = require("./config/keys")
const localStorage = require("localStorage")

const {User} = require('./models/user')


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




require("./service/passport")
app.use(cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[Keys.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());
app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  
  app.get("/auth/google/callback", passport.authenticate("google"),(req,res)=>{
      
      res.redirect('http://localhost:3000/home')
      
      
  });

  app.get('/current_user',(req,res)=>{
      res.send(req.user)
  })

  app.get('/logout',(req,res)=>{

    req.logOut()
    res.send(req.user)
    res.redirect('http://localhost:3000/home')
    
})


  passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id)
.then(user=>{
    done(null,user)
})

})

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
