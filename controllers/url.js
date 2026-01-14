const { customAlphabet  } = require("nanoid");
const URL = require("../models/url.js");
async function handleCreateUrl(req,res){
    let body =req.body;
    if(!body.url){
        return res.status(404).json({error:"url is needed"});
    }
    const nanoid = customAlphabet('1234567890abcdef', 8);
    const shortId = nanoid()
    await URL.create({
        shortId : shortId,
        redirectUrl : body.url,
        visitHistory:[],
        createdBy: req.user._id,  //This user is taken from the middleware restrictToLoggedinUserOnly
    })
    const allUrls = await URL.find({});
    return res.render("home",{
        urls: allUrls
    });

    // return res.status(201).json({message:"Sucessfully created"});
}

async function handleGetShortUrl(req,res){
    const shortId = req.params.shortId;
    if(!shortId) return res.status(404).json({message:"Not found"});
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push:{
            visitHistory: {
                timestamp: Date.now(),
            }
        },
    }
    );

    res.redirect(entry.redirectUrl);
}

async function handleAnalytics(req,res){
    const shortId = req.params.shortId;
    if(!shortId) return res.status(404).json({message:"Not found"});

    const result = await URL.findOne({shortId});

    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory});

}
module.exports = {
    handleCreateUrl,
    handleGetShortUrl,
    handleAnalytics
}