const User = require("../models/user.js");

//signup form render
module.exports.renderSignUpForm = (req,res)=>{
 res.render("users/signup.ejs");
}

//create user and register
module.exports.signUp = async(req,res)=>{
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
}

//login form render
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

//login logic
module.exports.login = async(req,res)=>{
    req.flash("success",`Welcome Back to Home Stay ${req.user.username}`);
    let redirectUrl = res.locals.redirectUrl || "/Listings";
    res.redirect(redirectUrl);
}

//logout logic
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You have been logged out successfully");
        res.redirect("/Listings");
    })
}
