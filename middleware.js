const isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in to add a new Home Stay");
        return res.redirect("/User/login");
    }
    next();
}

module.exports = {isLoggedIn}; 