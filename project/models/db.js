const mongoose = require("mongoose");

const connConfig = "mongodb://127.0.0.1:27017/nodejs-ToDoList";
const conn = mongoose.createConnection(connConfig);

conn.on("connected",()=>{
    console.log("MongoDB is connected");
})

module.exports = conn;