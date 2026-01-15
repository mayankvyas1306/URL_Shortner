const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next){
    const userUid = req.cookies?.uid;

    // const userUid = req.headers['authorization'];

    if(!userUid) return res.redirect('/login');

    // const token = userUid.split("Bearer ")[1]; //"Bearer [234vdv43dvae]"
    const user =  getUser(userUid);

//    const user =  getUser(token);

    if(!user) return res.redirect('/login');

    req.user = user;// this i sused at created by 
    next();
}

async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;
    //const userUid = req.headers['authorization'];
    if(!userUid){
        req.user = null;
        return next();
    }
    //const token = userUid.split("Bearer ")[1]; //"Bearer [234vdv43dvae]"
     
    const user = getUser(userUid);

    req.user = user; 
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth
}