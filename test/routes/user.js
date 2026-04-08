const express = require('express');
const router = express.Router();
//user routes
//home
router.get("/",(req,res)=>{
    res.send("User Home Routes");
});
//Get User by id
router.get("/:id",(req,res)=>{
    res.send("User Home id ");
});
//Create User
router.post("/",(req,res)=>{
    res.send("POST User Routes");
});
//Delete User
router.delete("/:id",(req,res)=>{
    res.send("DELETE User Routes");
})

module.exports = router;