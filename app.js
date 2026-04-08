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
const listingsRoutes = require("./routes/listings.js"); 
const reviewRoutes = require("./routes/reviews.js")

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

app.use("/Listings", listingsRoutes);

app.use("/Listings/:id/reviews", reviewRoutes);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
    console.log(err); // 👈 add this for debugging

    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    res.status(statusCode).render("errors", { message, statusCode });
});



