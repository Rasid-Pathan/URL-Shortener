const shortid= require('shortid');
const URL = require('../model/url');

async function HandleGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error : "URL is required."})
    }
    const shortId = shortid();
    await URL.create({
        ShortId: shortId,
        redirecturl : body.url,
        visithistory: [],
        createdby: req.user._id
    });

    //for retriving urls based on users role
    if(req.user.role == "Admin"){
        var allurls = await URL.find().populate("createdby");
    }else{
        var allurls = await URL.find({createdby: req.user._id}).populate("createdby");
    }

    // Respond with JSON containing the short URL, instead of rendering the page
    return res.json({
        shortId: shortId
    });
}

async function fetchUpdatedURLs(req, res) {
    const urls = req.user.role === "Admin" 
        ? await URL.find().populate('createdby') 
        : await URL.find({ createdby: req.user._id }).populate('createdby');

    res.json({ urls: urls });
}


async function HandleGetAnaltics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ShortId: shortId});
    return res.json({totalClick: result.visithistory.length, analitics: result.visithistory })
}

module.exports = {HandleGenerateNewShortUrl , HandleGetAnaltics,fetchUpdatedURLs}