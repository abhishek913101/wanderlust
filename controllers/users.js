const User = require("../models/user");


// sign Up form 
 module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");  
}


// Sign Up
module.exports.signup =  async (req,res,next)=>{
    try {
        let {username ,email , password} = req.body;
        let newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        // console.log(registeredUser);
        req.logIn(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Registration Successfully");
            res.redirect("/listings");
        })
        } catch (error) {
            req.flash("error",error.message);
            res.redirect("/signup");
    }
 }


//  Login rout from

module.exports.renderLoginForm = (rew,res)=>{
    res.render("users/login.ejs");
 }


//  login

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome Back To WanderLust! You are logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
 }


//  Log-Out

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Log out successfully ");
        res.redirect("/listings");
    })
 }