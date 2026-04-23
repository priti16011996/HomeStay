const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require('../middleware.js');
const userController = require("../controller/user.js");

//signUp routes with different HTTP methods
router.route("/signUp")
.get(userController.renderSignUpForm) // signup route
.post(wrapAsync(userController.signUp)); // Create a new user and register them using passport-local-mongoose's register method, which takes care of hashing the password and saving the user to the database. If registration is successful, it redirects to the listings page; otherwise, it catches any errors (like duplicate usernames) and flashes an error message before redirecting back to the signup page.

router.route("/login")
.get(userController.renderLoginForm) // login form render
.post(saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/User/login",
        failureFlash:true,
    }),
    userController.login
); // login logic using passport's authenticate method, which checks the provided credentials against the database. If authentication is successful, it flashes a success message and redirects to the listings page; if it fails, it flashes an error message and redirects back to the login page.

// logout route
router.get("/logout", userController.logout);

module.exports = router;