const mongoose = require("mongoose");
const categoriSchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    parentId:{
        type:String,
        default:null
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"Users"
    }
},{timestamps:true});

module.exports = mongoose.model('Categories',categoriSchema);