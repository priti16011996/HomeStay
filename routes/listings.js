const express = require('express');
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const {isLoggedIn,isOwner} = require("../middleware.js");
//Validation Middleware for Listing Data using JOI
const validateListing = (req,res,next)=>{
    const {error} = listingSchema.validate(req.body);   
    if(error){
        const msg = error.details.map(el=>el.message).join(",");
        throw new ExpressError(400, msg);
    }   
    else{
        next();
    }
}

router.get("/",wrapAsync(async(req,res)=>{
    let HomeStayListings = await Listing.find();
   res.render("listings/index.ejs",{HomeStayListings});
}));

router.get("/addNew",isLoggedIn,(req,res)=>{
    
    res.render("listings/AddHomeStay.ejs");
})

router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let specificHomeStayData = await Listing.findById(id,).populate({
        path:"reviews",
        populate:{
            path:"author",
        }
        }).populate("owner");
    if(!specificHomeStayData){
       req.flash("error","Home Stay you are looking for does not exist anymore"); 
       res.redirect("/Listings");
    }
    else
    {
        console.log(specificHomeStayData);
        res.render("listings/show.ejs",{specificHomeStayData});
    }
}));

// With wrapAsync phase-3
router.put("/",isLoggedIn, wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }
    let listingData = new Listing(req.body.listing);
    listingData.owner = req.user._id;
    await listingData.save();
    req.flash("success","New Home Stay has been added successfully");
    res.redirect("/Listings");
}));

router.post("/:id/editHomeStayDesc",isLoggedIn,isOwner, wrapAsync(async(req, res) => {
    let { id } = req.params;
    let HomeStayData = await Listing.findById(id);  
    res.render("listings/EditHomeStayInfo.ejs", { HomeStayData }); 
}));

//Update Home Stay details
router.put("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }
    let HomeStayData = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Home Stay details updated successfully");
    //console.log(HomeStayData);
    res.redirect(`/Listings/${id}`);
}));

router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let HomeStayData = await Listing.findByIdAndDelete(id);
    req.flash("success","Home Stay has been deleted successfully");
    //console.log(HomeStayData);
    res.redirect("/Listings");
}));

module.exports = router;