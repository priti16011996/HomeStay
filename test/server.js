const express = require('express');
const app = express();
const userRouter = require("./routes/user.js");
const postRouter = require("./routes/post.js"); 
const cookieParser = require("cookie-parser");
app.use(cookieParser("secretKey"));

app.get("/",(req,res)=>{
    res.send("Welcome to Home Stay");
});
app.get("/setCookies",(req,res)=>{
    res.cookie("token","1234567890");
    res.cookie("isLoggedIn",true);
    res.send("Cookies have been set");
});


app.get("/getCookies",(req,res)=>{
    const cookies = req.cookies;
    console.log(cookies);
    res.send(cookies);
});

app.get("/setSignedCookies",(req,res)=>{
    res.cookie("token","1234567890",{signed:true});
    res.cookie("isLoggedIn",true,{signed:true});
    res.send("Signed Cookies have been set");
});

app.get("/getSignedCookies",(req,res)=>{
    const signedCookies = req.signedCookies;
    console.log(signedCookies);
    res.send(signedCookies);
});

//app.use("/user",userRouter);
//pp.use("/post",postRouter);

app.listen(3600,(req,res)=>{
    console.log("Server is running on 3000");
})
