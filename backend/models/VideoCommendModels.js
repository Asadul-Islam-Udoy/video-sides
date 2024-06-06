const mongoose = require('mongoose');
const videoCommendSchema = new mongoose.Schema({
  commend:{
    type:String,
    required:true
  },
  videoId:{
    type:String,
    required:true
  },
  senderId:{
    type:mongoose.Schema.ObjectId,
    ref:'Users',
    required:true
  }
},{timestamps:true});
module.exports = mongoose.model('videoCommends',videoCommendSchema);
