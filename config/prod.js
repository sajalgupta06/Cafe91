const { googleClientID } = require("./dev");

module.exports={
    mongourl:process.env.MONGOURI,
    secret_key:process.env.JWT_SEC,
    SENDGRID_API:process.env.SENDGRID_API,
    EMAIL:process.env.EMAIL,
    googleClientID:process.env.googleClientID,
    googleClientSecret:process.env.googleClientSecret,
    cookieKey:"cafe91Sajal"
}