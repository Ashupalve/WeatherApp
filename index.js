const express = require("express");
const app = express();
const path = require("path");
const methodoverride = require("method-override");
const mongoose = require('mongoose');
const ejs = require("ejs");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportLocalStartegy = require("passport-local");
const user = require("./models/user.js");
const {signupform,signup,signinform,signin,logout}  = require("./controllers/usercontroller.js");
const userRoutes = require("./routes/userRoutes.js");
const multer = require("multer");
const mongoStore = require("connect-mongo");
mongoose.connect(dbURL,
).then(()=>{
    console.log("Connection Established To An Wonderlust Database");
});
const store =  mongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600
})
const sessionOptions = {
    // store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now()+7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly:true
    }
}
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocalStartegy(user.authenticate()))
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use((req,resp,next)=>{
    resp.locals.sucess = req.flash("sucess");
    resp.locals.error = req.flash("error");
    resp.locals.currUser = req.user;
    resp.locals.redirectUrl= req.session.redirectUrl;
    next();
})
