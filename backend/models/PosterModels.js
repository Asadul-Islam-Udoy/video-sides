const mongoose = require("mongoose");
const posterSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    PosterImages:[{
        image:{
            type:String,
            required:true
        }
    }],
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'Users'
        },
        rating:{
            type:Number,
            default:0
        },
        comment:{
            type:String
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'Users'
    }
},{timestamps:true});

module.exports = mongoose.model("Posters",posterSchema);