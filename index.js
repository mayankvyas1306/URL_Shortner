const express = require("express");
const { connectToMongoDB } = require("./db.js");
const path = require("path");
const cookieParser = require('cookie-parser')
const { checkForAuthentication,restrictTo} = require("./middleware/auth.js")
connectToMongoDB("mongodb://localhost:27017/short-url");

const urlRouter = require("./routes/url.js");
const staticRouter = require("./routes/staticRouter.js");
const userRouter = require("./routes/user.js");

const app = express();

//telling that i am using ejs  engine
app.set("view engine","ejs")
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/url',restrictTo(["ADMIN","NORMAL"]),urlRouter);
app.use('/user',userRouter);
app.use('/',staticRouter);


app.listen(8001,()=>{
    console.log(`server is Running on http://localhost:8001`);
    
})