
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Keys = require("../config/keys")
const mongoose = require('mongoose');
require('../models/user')
const User = mongoose.model('User')

passport.use(
    new GoogleStrategy(
      {
        clientID: Keys.googleClientID,
        clientSecret: Keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
      },
      function (token, tokenSecret, profile, done) {
  
        User.findOne({googleId:profile.id}).then(existingUser=>{
            if(existingUser)
            {
  done(null,existingUser)
          }else{
          new User({googleId:profile.id}).save().then((user)=>{
              done(null,user)
          })
          }
        })  
      }
    )
  );

  

