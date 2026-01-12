const express = require("express");
const urlRouter = require("./routes/url.js");
const { connectToMongoDB } = require("./db.js");
const path = require("path");
const staticRouter = require("./routes/staticRouter.js");

connectToMongoDB("mongodb://localhost:27017/short-url");
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))
app.use('/url',urlRouter);
app.use('/',staticRouter)
//telling that i am using ejs  engine
app.set("view engine","ejs")
app.set("views",path.resolve("./views"));

app.listen(8001,()=>{
    console.log(`server is Running on http://localhost:8001`);
    
})