const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
// signup route
router.get("/signUp",(req,res)=>{
 res.render("users/signup.ejs");
});

// Create a new user and register them using passport-local-mongoose's register method, which takes care of hashing the password and saving the user to the database. If registration is successful, it redirects to the listings page; otherwise, it catches any errors (like duplicate usernames) and flashes an error message before redirecting back to the signup page.
router.post("/signUp", wrapAsync(async(req,res)=>{
    //console.log(req.body);
    try{
        const {email, username, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {  
                req.flash("error", "An error occurred during login. Please try logging in manually.");
                return res.redirect("/User/login");
            }  
            req.flash("success",`Welcome to Home Stay! ${registeredUser.username}`);
            res.redirect("/Listings");
         });
    }catch(e){
        req.flash("error",e.message);
        console.log(e.message);
        res.redirect("/User/signUp");
    }
}));

// login route
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

// login logic using passport's authenticate method, which checks the provided credentials against the database. If authentication is successful, it flashes a success message and redirects to the listings page; if it fails, it flashes an error message and redirects back to the login page.
router.post("/login",
    passport.authenticate("local",{
        failureRedirect:"/User/login",
        failureFlash:true,
    }),
    async(req,res)=>{
        req.flash("success",`Welcome Back to Home Stay ${req.user.username}`);
        res.redirect("/Listings");
    }
);

// logout route
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You have been logged out successfully");
        res.redirect("/Listings");
    })
})

module.exports = router;