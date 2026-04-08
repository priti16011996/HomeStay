const express = require('express');
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");



router.get("/",wrapAsync(async(req,res)=>{
    let HomeStayListings = await Listing.find();
   res.render("listings/index.ejs",{HomeStayListings});
}));

router.get("/addNew",(req,res)=>{
    res.render("listings/AddHomeStay.ejs");
})

router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let specificHomeStayData = await Listing.findById(id,).populate("reviews");
   // console.log(specificHomeStayData);
   res.render("listings/show.ejs",{specificHomeStayData});
}));

// With wrapAsync phase-3
router.put("/", wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }
    let listingData = new Listing(req.body.listing);
    await listingData.save();
    res.redirect("/Listings");
}));

router.post("/:id/editHomeStayDesc", wrapAsync(async(req, res) => {
    let { id } = req.params;
    let HomeStayData = await Listing.findById(id);
    res.render("listings/EditHomeStayInfo.ejs", { HomeStayData }); 
}));


router.put("/:id", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }
    let HomeStayData = await Listing.findByIdAndUpdate(id,req.body.listing);
    //console.log(HomeStayData);
    res.redirect(`/Listings/${id}`);
}));

router.delete("/:id", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let HomeStayData = await Listing.findByIdAndDelete(id);
    //console.log(HomeStayData);
    res.redirect("/Listings");
}));

module.exports = router;