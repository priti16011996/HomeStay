const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to add a new Home Stay");
        return res.redirect("/User/login");
    }
    next();
}

const saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

const isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    console.log("hello1");
    console.log(listing);
    console.log("hello1");
    if(!listing.owner[0].equals(res.locals.currentUser._id)){
        req.flash("error","You don't have permission to do that");
        return res.redirect(`/Listings/${id}`);
    }
    next();
}
//Validation Middleware for Review Data using JOI
const validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);   
    if(error){
        const msg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, msg);
    }   
    else{
        next();
    }
}

const isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","You are not authorized to delete others review");
        return res.redirect(`/Listings/${id}`);
    }
    next();
}
module.exports = {isLoggedIn, saveRedirectUrl, isOwner,validateReview,isReviewAuthor}; 