const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
       type: String,
       required:true,
    },
    description: String,
    // image: {
    // filename: {
    //   type: String,
    //   default: "listingimage",
    // },
    // url: {
    //   type: String,
    //   default:
    //     "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    // },
  //},
  image:{
    url:String,
    filename:String,
  },
    // image:{
        
    //     type:String,
    //     default:"https://unsplash.com/photos/ornate-building-with-outdoor-cafe-seating-in-sunlight-ZM-tbhM1x-8",
    //     set:(v)=>
    //     v=== ''
    //         ?"https://unsplash.com/photos/ornate-building-with-outdoor-cafe-seating-in-sunlight-ZM-tbhM1x-8"
    //         :v,
    // },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }],
    owner:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }]
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing.reviews.length){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
})
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;