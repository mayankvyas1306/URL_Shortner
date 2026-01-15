const { getUser } = require("../service/auth");

//Authentication

function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie){
        return next();
    }

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

//Authorization

function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}

//COMBINING THE FOLLOWING TWO FUNCTION INTO ONE ABOVE  i.e. checkForAuthentication

// async function restrictToLoggedinUserOnly(req,res,next){
//     const userUid = req.cookies?.uid;

//     // const userUid = req.headers['authorization'];

//     if(!userUid) return res.redirect('/login');

//     // const token = userUid.split("Bearer ")[1]; //"Bearer [234vdv43dvae]"
//     const user =  getUser(userUid);

// //    const user =  getUser(token);

//     if(!user) return res.redirect('/login');

//     req.user = user;// this i sused at created by 
//     next();
// }

// async function checkAuth(req,res,next){
//     const userUid = req.cookies?.uid;
//     //const userUid = req.headers['authorization'];
//     if(!userUid){
//         req.user = null;
//         return next();
//     }
//     //const token = userUid.split("Bearer ")[1]; //"Bearer [234vdv43dvae]"
     
//     const user = getUser(userUid);

//     req.user = user; 
//     next();
// }

