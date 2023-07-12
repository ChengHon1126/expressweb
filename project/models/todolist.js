const mongoose = require("mongoose");
const conn = require("./db");

const todolistSchema = new mongoose.Schema({
    "to_do_id" : String,
    "subject"  : String,
    "reserved_time" : String,
    "modified_time" : String,
    "brief" : String,
    "level" : Number,
    "author" : String,
    "content" : String,
    "attachments" : Array
},{
    collection : "todolist",
    versionKey : false
});

const todoModel = conn.model("Todolist",todolistSchema);

module.exports = todoModel;