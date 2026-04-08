const express = require('express');
const router = express.Router();
//post routes
//home
router.get("/",(req,res)=>{
    res.send("post Home Routes");
});
//Get post by id
router.get("/:id",(req,res)=>{
    res.send("post Home id ");
});
//Create post
router.post("/",(req,res)=>{
    res.send("POST User Routes");
});
//Delete post
router.delete("/:id",(req,res)=>{
    res.send("DELETE post Routes");
})


module.exports = router;