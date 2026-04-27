const mongoose = require('mongoose');
const MONGO_URL ="mongodb://127.0.0.1:27017/HomeStay";
const NewData = require("./data.js");
const Listing = require("../models/listing.js");

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


// initialize db with some random data
// first clean the data from collection
// then insert all static data 

// const initDB = async()=>{
//     await Listing.deleteMany({});
//     console.log("db data clean");
//     //console.log(NewData.data);
//     NewData.data=NewData.data.map((obj)=>({ ...obj, owner: "69e22a05714b061ba88c4b04" }));
//     await Listing.insertMany(NewData.data);
//     console.log("data inserted succesfully")
// }

// initDB();

const initDB = async () => {
  await Listing.deleteMany({});
  console.log("db data clean");

  const coordsMap = {
    "Malibu": [-118.7798, 34.0259],
    "New York City": [-74.0060, 40.7128],
    "Aspen": [-106.8175, 39.1911],
    "Florence": [11.2558, 43.7696],
    "Portland": [-122.6765, 45.5231],
    "Cancun": [-86.8515, 21.1619],
    "Amsterdam": [4.9041, 52.3676],
    "Los Angeles": [-118.2437, 34.0522],
    "Bali": [115.1889, -8.4095],
    "Tokyo": [139.6917, 35.6895]
  };

  NewData.data = NewData.data.map((obj) => ({
    ...obj,
    owner: "69e22a05714b061ba88c4b04",
    geometry: {
      type: "Point",
      coordinates: coordsMap[obj.location] || [77.2090, 28.6139] // fallback (Delhi)
    }
  }));

  await Listing.insertMany(NewData.data);
  console.log("data inserted successfully");
};

initDB();



