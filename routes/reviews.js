const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { listingSchema, reviewSchema } = require("../schema.js");
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
router.post("/",validateReview, wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(req.params.id);
    let NewReview = await new Review(req.body.review);
    listing.reviews.push(NewReview);
    await NewReview.save();
    await listing.save();
    req.flash("success","Review has been added successfully");
    res.redirect(`/Listings/${id}`);

}));

router.delete("/:reviewId", wrapAsync(async(req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review has been deleted successfully");
    res.redirect(`/Listings/${id}`);
}));

module.exports = router;