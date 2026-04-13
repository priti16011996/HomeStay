const express = require('express');
const app = express();
const userRouter = require("./routes/user.js");
const postRouter = require("./routes/post.js"); 
const session = require("express-session");
const path = require('path');
const flash = require("connect-flash");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(flash());

// app.use(session({
//     secret:"mySecretConsistency",
//     resave:false,
//     saveUninitialized:true,
// }));

const sessionOptions = {
    secret:"mySecretConsistency",
    resave:false,
    saveUninitialized:true,
};

app.use(session(sessionOptions));
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorsMsg = req.flash("error");
    next();
})

app.get("/",(req,res)=>{
   
    if(req.session.count !== undefined){
        req.session.count = req.session.count+1;
    }
    else{
         req.session.count = 0;
    }
    res.send(`Welcome to Home Stay, count is ${req.session.count}`);
});

app.get("/register",(req,res)=>{
    let {name="Farzi Admi Nikal"} = req.query;
    req.session.name = name;
    if(name === "Farzi Admi Nikal")
    {
        req.flash("error","Please provide your name");
    }
    else
    {
        req.flash("success","You have registered successfully");
    }
    res.redirect("/apnelog");
});

app.get("/apnelog",(req,res)=>{
    const name = req.session.name;
    res.render("page.ejs",{name:name});
})
// const cookieParser = require("cookie-parser");
// app.use(cookieParser("secretKey"));

// app.get("/",(req,res)=>{
//     res.send("Welcome to Home Stay");
// });
// app.get("/setCookies",(req,res)=>{
//     res.cookie("token","1234567890");
//     res.cookie("isLoggedIn",true);
//     res.send("Cookies have been set");
// });


// app.get("/getCookies",(req,res)=>{
//     const cookies = req.cookies;
//     console.log(cookies);
//     res.send(cookies);
// });

// app.get("/setSignedCookies",(req,res)=>{
//     res.cookie("token","1234567890",{signed:true});
//     res.cookie("isLoggedIn",true,{signed:true});
//     res.send("Signed Cookies have been set");
// });

// app.get("/getSignedCookies",(req,res)=>{
//     const signedCookies = req.signedCookies;
//     console.log(signedCookies);
//     res.send(signedCookies);
// });

//app.use("/user",userRouter);
//pp.use("/post",postRouter);

app.listen(3600,(req,res)=>{
    console.log("Server is running on 3600");
})
