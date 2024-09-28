const express = require('express');
const URL = require('../model/url');
const { restrictTo } = require('../middleware/auth');
const { handleUserLogout } = require('../controller/user');

const router = express.Router();

router.get("/",restrictTo(['Normal','Admin']), async (req,res)=>{
    if(req.user.role == "Admin"){
        var allurls = await URL.find().populate("createdby");
    }else{
        var allurls = await URL.find({createdby: req.user._id}).populate("createdby");
    }
    return res.render("home", {
        urls: allurls,
        user: req.user
    });
})

router.get('/signup', (req,res)=>{
    return res.render("signup");
})

router.get('/login', (req,res)=>{
    return res.render("login");
})

router.get('/logout',handleUserLogout);

module.exports = router