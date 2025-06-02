const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { route } = require("./listing.js");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");

// Get signup form
router.get("/signup",userController.renderSignupForm)


// Sign Up post
router.post("/signup", userController.signup);



 router.get("/login", saveRedirectUrl,userController.renderLoginForm);


 router.post("/login",
    saveRedirectUrl,
     passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),
    userController.login 
    );


 router.get("/logout", userController.logout);

module.exports = router;
