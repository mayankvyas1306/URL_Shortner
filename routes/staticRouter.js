const express = require("express");
const URL = require("../models/url");

const staticRouter = express.Router();

staticRouter.get('/',async(req,res)=>{
    if(!req.user) return res.redirect("/login") //id user is not there then login again
    const allUrls = await URL.find({createdBy : req.user._id});

    return res.render("home",{
        urls : allUrls,
    });
});


staticRouter.get("/signup",(req,res)=>{
    return res.render("signup");
})

staticRouter.get("/login",(req,res)=>{
    return res.render("login");
})

module.exports = staticRouter;