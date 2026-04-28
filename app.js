if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
const express = require('express');
const mongoose = require('mongoose');
const Listing = require("./models/listing.js")
const PORT = "5000";
const app = express();
//const MONGO_URL ="mongodb://127.0.0.1:27017/HomeStay";
const MONGO_URL = process.env.MONGO_DB_ATLAS;
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js")
const { listingSchema, reviewSchema } = require("./schema.js");
const Joi = require('joi'); 
const listingsRoutes = require("./routes/listings.js"); 
const reviewRoutes = require("./routes/reviews.js");
const userRoutes = require("./routes/user.js");


const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const flash = require("connect-flash");
const store = MongoStore.create({ 
    mongoUrl: MONGO_URL,
    crypto:{  
        secret: process.env.SECRET,
     },
    touchAfter: 24 * 3600 // time period in seconds    
});
store.on("error",(err)=>{
    console.log("Session Store Error",err );
})
const sessionOptions = {
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+15*24*60*60*60*1000,
        maxAge:15*24*60*60*60*1000,
        httpOnly:true
    }
};



app.use(session(sessionOptions));
app.use(flash());
//Passport Configuration
app.use(passport.initialize());
//To use persistent login sessions, Passport needs to be able to serialize users into and deserialize users out of the session.
app.use(passport.session());
//The LocalStrategy is a Passport strategy for authenticating with a username and password. It is commonly used for traditional login systems.
passport.use(new LocalStrategy(User.authenticate()));

//The serializeUser and deserializeUser methods are used by Passport to manage user sessions. They determine how user information is stored in the session and how it is retrieved on subsequent requests. 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());   

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
    console.log("Db Connection Successful");
}).catch((err) => {
    console.log(err);
});

//DB Connection ON URL
async function main() {
  await mongoose.connect(MONGO_URL);
}

//Home Route
// app.get("/",(req,res)=>{
//     res.send("Hi!, Welcome to Home Stay")
// });

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// app.get("/fakeUserRegister", async(req,res)=>{
//     const fakeUser = new User({
//         email:"Priti@gmail.com",
//         username:"Priti_Coder"
//     })
//     const registerUser = await User.register(fakeUser,"PaddiKoNindAARhiHai");
//     res.send(registerUser); 
// })



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

app.use("/User", userRoutes);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
    console.log(err); // 👈 add this for debugging

    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    res.status(statusCode).render("errors", { message, statusCode });
});



