const mongoose = require("mongoose");

async function connectToMongoDB(url){
    await mongoose.connect(url)
        .then(console.log('MongoDB connected Successfully'));
}

module.exports = {
    connectToMongoDB
}