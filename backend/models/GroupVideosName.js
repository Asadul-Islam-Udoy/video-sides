const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    groupname:{
        type:String,
        required:true,
        unique:true
    },
    profession:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"Users"
    }
},{timestamps:true});

module.exports = mongoose.model("GroupVideoName",groupSchema);