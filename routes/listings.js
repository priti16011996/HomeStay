const express = require('express');
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const {isLoggedIn,isOwner} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
//const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage })
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
//Home routes with different HTTP methods
router.route("/")
.get(wrapAsync(listingController.Index)) //Apply MVC pattern for listing routes
//.put(isLoggedIn, wrapAsync(listingController.createListing)); // With wrapAsync phase-3 create listing
.put(upload.single('listing[image]'),(req, res)=>{
    res.send(req.file);
} );

//New listing form render route
router.get("/addNew",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing)) //show route
.put(isLoggedIn,isOwner,wrapAsync(listingController.updateListing))//Update Home Stay details
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing)) //Delete Home Stay


//edit form render route
router.post("/:id/editHomeStayDesc",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;