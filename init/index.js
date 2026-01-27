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

const initDB = async()=>{
    await Listing.deleteMany({});
    console.log("db data clean");
    //console.log(NewData.data);
    await Listing.insertMany(NewData.data);
    console.log("data inserted succesfully")
}

//initDB();



