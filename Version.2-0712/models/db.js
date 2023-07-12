const mongoose = require("mongoose");

const connCongig = "mongodb://127.0.0.1:27017/nodejs-tutorial";
const conn = mongoose.createConnection(connCongig);

conn.on("connected",()=>{
    console.log(" MongoDB is connected");
});

module.exports = conn;