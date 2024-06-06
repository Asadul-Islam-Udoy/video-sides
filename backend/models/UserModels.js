const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
///user models
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"name is required"],
        trim:true,
        maxlength:[30,"max length 30 charter"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"]
    },
    password:{
        type:String,
        select:false,
        required:[true,"password is required"],
    },
    is_veridfied:{
        type:Boolean,
        default:false
    },
    is_token:{
        type:String,
    },
    expiresIn:{
        type:Date
    },
    avatar:{
       type:String,
       default:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
    },
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true});
/// has password
userSchema.pre("save",async function(next){
 if(!this.isModified("password")){
   next();
 }
 this.password = await bcrypt.hash(this.password,10);
});
/// crate jwt user token
userSchema.methods.GetTokenMethod = function(){
    return jwt.sign({_id:this._id},process.env.SECERIT_KEY,{expiresIn:"7d"});
}

//compare password
userSchema.methods.ComparePassword= async function(password){
  return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model("Users",userSchema);