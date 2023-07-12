const mongoose = require("mongoose");
const conn = require("./db");

const memberSchema = new mongoose.Schema({
   "account" : String,
   "passwd"  : String 
},{
    collection : "members",
    versionKey : false
})

const memberModel = conn.model("Members", memberSchema);

module.exports = memberModel;