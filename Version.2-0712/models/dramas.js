const mongoose = require("mongoose");
const conn = require("./db");

let dramaSchema = new mongoose.Schema({
    "dramaId"  : String,
    "category" : String,
    "name"     : String,
    "score"    : Number
},{
    collection: "dramas-table",
    versionKey: false
})

let dramaModel = conn.model("Dramas", dramaSchema);
module.exports = dramaModel;