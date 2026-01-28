const express = require('express');
const mongoose = require('mongoose');
const Listing = require("./models/listing.js")
const PORT = "5000";
const app = express();
const MONGO_URL ="mongodb://127.0.0.1:27017/HomeStay";
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');

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
})

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

app.get("/Listings",async(req,res)=>{
    let HomeStayListings = await Listing.find();
   // console.log(HomeStayListting);
   // res.send(HomeStayListting);
   res.render("listings/index.ejs",{HomeStayListings});
});

app.get("/Listings/addNew",(req,res)=>{
    res.render("listings/AddHomeStay.ejs");
})

app.get("/Listings/:id",async(req,res)=>{
    let {id} = req.params;
    let specificHomeStayData = await Listing.findById(id);
   // console.log(specificHomeStayData);
   res.render("listings/show.ejs",{specificHomeStayData});
});

app.put("/Listings", async(req,res)=>{
    let listingData = new Listing(req.body.listing);
    await listingData.save();
    res.redirect("/Listings");
});

app.post("/Listings/:id/editHomeStayDesc", async(req, res) => {
    let { id } = req.params;
    let HomeStayData = await Listing.findById(id);
    res.render("listings/EditHomeStayInfo.ejs", { HomeStayData }); 
});


app.put("/Listings/:id", async(req,res)=>{
    let {id} = req.params;
    let HomeStayData = await Listing.findByIdAndUpdate(id,req.body.listing);
    console.log(HomeStayData);
    res.redirect(`/Listings/${id}`);
});

app.delete("/Listings/:id", async(req,res)=>{
    let {id} = req.params;
    let HomeStayData = await Listing.findByIdAndDelete(id);
    console.log(HomeStayData);
    res.redirect("/Listings");
});





