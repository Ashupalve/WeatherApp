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
