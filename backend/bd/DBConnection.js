const mongoose = require("mongoose");
const DBConnection  = async()=>{
    try{
      const conn = await mongoose.connect(process.env.MONGOS_URL);
      console.log(`mongoose connection ${conn.connection.host}`.bgCyan);
    }
    catch(error){
      console.log(error.bgRed);     
    }
} 

module.exports = DBConnection;