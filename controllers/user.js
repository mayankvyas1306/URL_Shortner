const User = require('../models/users.js');
const { v4 : uuidv4 } = require('uuid');
const { setUser } = require('../service/auth.js');

async function handleCreateUser(req,res){
    const body = req.body;
    if(!body){
        return res.status(404).json({error:"Body is required"});
    }
    await User.create({
        name: body.name,
        email : body.email,
        password : body.password
    });

    return res.redirect("/");
}


async function handleUserLogin(req,res){
    const { email, password } =req.body;
    const user = await User.findOne({ email, password });
    if(!user){
        return res.render("login",{
            error: "invalid Username or Password",
        });
    }

    const token = setUser(user);

    //we are not using cookie instead lets try bearer authentication
    res.cookie("token",token);

    //return res.json({token});



    return res.redirect("/");
}

module.exports = {
    handleCreateUser,
    handleUserLogin
}