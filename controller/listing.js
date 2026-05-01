const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const axios = require("axios");
//Index 
module.exports.Index = async(req,res)=>{
    let HomeStayListings = await Listing.find();
   res.render("listings/index.ejs",{HomeStayListings});
} 

//add new Listing Form
module.exports.renderNewForm =(req,res)=>{
    res.render("listings/AddHomeStay.ejs");
}

//show listing
module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    let specificHomeStayData = await Listing.findById(id,).populate({
        path:"reviews",
        populate:{
            path:"author",
             model: "User"
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
}

//create listing
// module.exports.createListing = async(req,res)=>{
//     let url = req.file.path;
//     let filename = req.file.filename;
//    // console.log(url+"..."+filename);
//     let listingData = new Listing(req.body.listing);
//     listingData.owner = req.user._id;
//     listingData.image={url,filename};
//     await listingData.save();
//     req.flash("success","New Home Stay has been added successfully");
//     res.redirect("/Listings");
// }

module.exports.createListing = async (req, res) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;

    let listingData = new Listing(req.body.listing);

    // 👇 get location string
    const locationQuery = `${listingData.location}, ${listingData.country}`;

    // 👇 call Geoapify
    const geoRes = await axios.get(
      "https://api.geoapify.com/v1/geocode/search",
      {
        params: {
          text: locationQuery,
          apiKey: process.env.GEOAPIFY_KEY,
        },
      }
    );

    const features = geoRes.data.features;

    if (!features || features.length === 0) {
      req.flash("error", "Invalid location");
      return res.redirect("/listings/new");
    }

    // ⚠️ IMPORTANT: [lon, lat]
    const coordinates = features[0].geometry.coordinates;

    // 👇 set geometry
    listingData.geometry = {
      type: "Point",
      coordinates: coordinates,
    };

    // 👇 other fields
    listingData.owner = req.user._id;
    listingData.image = { url, filename };

    await listingData.save();

    req.flash("success", "New Home Stay has been added successfully");
    res.redirect("/listings");

  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while creating listing");
    res.redirect("/listings");
  }
};

// render edit form
module.exports.renderEditForm = async(req, res) => {
    let { id } = req.params;
    let HomeStayData = await Listing.findById(id);  
    if(!HomeStayData)
    {
        req.flash("error","Home Stay you are looking for does not exist anymore");
        return res.redirect("/Listings");
    }
    let originalImageUrl = HomeStayData.image.url;
    const geometry = JSON.stringify(HomeStayData.image.url);
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_100,w_100");
    res.render("listings/EditHomeStayInfo.ejs", { HomeStayData,originalImageUrl,geometry }); 
}

//Update Home Stay details
module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Invalid Listing Data");
    // }
    let HomeStayData = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file !== "undefined")
    {
        let url = req.file.path;
        let filename = req.file.filename;
        HomeStayData.image={url,filename};
        console.log(HomeStayData);
        await HomeStayData.save();
    }
    // // 👇 get location string
    // const locationQuery = `${listingData.location}, ${listingData.country}`;

    // // 👇 call Geoapify
    // const geoRes = await axios.get(
    //   "https://api.geoapify.com/v1/geocode/search",
    //   {
    //     params: {
    //       text: locationQuery,
    //       apiKey: process.env.GEOAPIFY_KEY,
    //     },
    //   }
    // );

    // const features = geoRes.data.features;

    // if (!features || features.length === 0) {
    //   req.flash("error", "Invalid location");
    //   return res.redirect("/listings/new");
    // }

    // // ⚠️ IMPORTANT: [lon, lat]
    // const coordinates = features[0].geometry.coordinates;

    
    req.flash("success","Home Stay details updated successfully");
    //console.log(HomeStayData);
    res.redirect(`/Listings/${id}`);
}

//delete listing
module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    let HomeStayData = await Listing.findByIdAndDelete(id);
    req.flash("success","Home Stay has been deleted successfully");
    //console.log(HomeStayData);
    res.redirect("/Listings");
}