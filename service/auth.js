const jwt = require("jsonwebtoken");

const secretKey = "maybyudgcbugucyvv&^(*%*bdshb80dsgc76735uihdyu^^^*";

function setUser(user){
    //creating token
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role
        },
        secretKey
    );
};

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secretKey);
    }catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}