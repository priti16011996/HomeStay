const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(req.params.id);
    let NewReview = await new Review(req.body.review);
    NewReview.author = req.user._id;
    console.log(NewReview);
    listing.reviews.push(NewReview);
    await NewReview.save();
    await listing.save();
    req.flash("success","Review has been added successfully");
    res.redirect(`/Listings/${id}`);

}

module.exports.deleteReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review has been deleted successfully");
    res.redirect(`/Listings/${id}`);
}