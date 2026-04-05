const express = require('express');
const mongoose = require('mongoose');
const Listing = require("./models/listing.js")
const PORT = "5000";
const app = express();
const MONGO_URL ="mongodb://127.0.0.1:27017/HomeStay";
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js")
const { listingSchema, reviewSchema } = require("./schema.js");
const Joi = require('joi'); 

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
//Listen on PORT
app.listen(PORT,()=>{
    console.log(`server is runing on the Port ${PORT}`);
});

//Call to connect to db 
main().then(()=>{
    console.log("Db Cpnnection Successful");
}).catch((err) => {
    console.log(err);
});

//DB Connection ON URL
async function main() {
  await mongoose.connect(MONGO_URL);
}


//Home Route
app.get("/",(req,res)=>{
    res.send("Hi!, Welcome to Home Stay")
});

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

//ListingTest
//Route Listing Test
//Create Object from  model
// app.get("/ListingTest",async(req,res)=>{
//     let newListing = new Listing(
//         {
//             title:"Indian Heritage Vibes",
//             decription:"We preserved the indian tradition with modern facilities.Try and feel the best vibes with Us",
//             price:5000,
//             location:"Luxa",
//             country:"India"
//         }
//     );
//     await newListing.save();      
//     res.send("Listing Route")
// });

app.get("/Listings",wrapAsync(async(req,res)=>{
    let HomeStayListings = await Listing.find();
   // console.log(HomeStayListting);
   // res.send(HomeStayListting);
   res.render("listings/index.ejs",{HomeStayListings});
}));

app.get("/Listings/addNew",(req,res)=>{
    res.render("listings/AddHomeStay.ejs");
})

app.get("/Listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let specificHomeStayData = await Listing.findById(id,).populate("reviews");
   // console.log(specificHomeStayData);
   res.render("listings/show.ejs",{specificHomeStayData});
}));
// Without try catch block phase-1
// app.put("/Listings", async(req,res)=>{
//     let listingData = new Listing(req.body.listing);
//     await listingData.save();
//     res.redirect("/Listings");
// });

// With try catch block phase-2
// app.put("/Listings", async(req,res,next)=>{
//     try{
//         let listingData = new Listing(req.body.listing);
//         await listingData.save();
//         res.redirect("/Listings");
//     }catch(err) {
//         next(err);
//     }
    
// });
// With wrapAsync phase-3
app.put("/Listings", wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }
    let listingData = new Listing(req.body.listing);
    await listingData.save();
    res.redirect("/Listings");
}));

app.post("/Listings/:id/editHomeStayDesc", wrapAsync(async(req, res) => {
    let { id } = req.params;
    let HomeStayData = await Listing.findById(id);
    res.render("listings/EditHomeStayInfo.ejs", { HomeStayData }); 
}));


app.put("/Listings/:id", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }
    let HomeStayData = await Listing.findByIdAndUpdate(id,req.body.listing);
    //console.log(HomeStayData);
    res.redirect(`/Listings/${id}`);
}));

app.delete("/Listings/:id", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let HomeStayData = await Listing.findByIdAndDelete(id);
    //console.log(HomeStayData);
    res.redirect("/Listings");
}));

app.post("/Listings/:id/reviews",validateReview, wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(req.params.id);
    let NewReview = await new Review(req.body.review);
    listing.reviews.push(NewReview);
    await NewReview.save();
    await listing.save();
    res.redirect(`/Listings/${id}`);

}));

app.delete("/Listings/:id/reviews/:reviewId", wrapAsync(async(req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/Listings/${id}`);
}));

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
    console.log(err); // 👈 add this for debugging

    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    res.status(statusCode).render("errors", { message, statusCode });
});



