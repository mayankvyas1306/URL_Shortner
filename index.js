const express = require("express");
const urlRouter = require("./routes/url.js");
const { connectToMongoDB } = require("./db.js");

connectToMongoDB("mongodb://localhost:27017/short-url");
const app = express();
app.use(express.json());
app.use('/url',urlRouter);

app.listen(8001,()=>{
    console.log(`server is Running on http://localhost:8001`);
    
})