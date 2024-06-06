const mongoose = require("mongoose");
const videoFreeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },    
    description:{
        type:String,
        required:true
    },
    videoCost:{
        type:Number,
        default:0
    },
    video:{
        type:String,
        required:true
     },
     groupVideos:[{
        groupname:{
            type:String,
            default:'null'
        },
        group_id:{
            type:String
        }
     }],
     likes:[],
     views:[],
     category:{
        type:mongoose.Schema.ObjectId,
        ref:"Categories",
        required:true
     },
     user:{
        type:mongoose.Schema.ObjectId,
        ref:"Users"
     },
     getPaymentUser:[{
            type:mongoose.Schema.ObjectId,
            ref:"Users"
     }]
},{timestamps:true});

module.exports = mongoose.model('FreeVideos',videoFreeSchema);