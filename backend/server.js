require("colors");
require("./errorHandler/errorMessage");
const app = require("./app");
const DBConnection = require("./bd/DBConnection");


//db connection
DBConnection();
///first chack
app.use('/',(req,res)=>{
    res.send("<h1>Hello Mern Stack</h1>")
});
// hosting port connection
const PORT = process.env.PORT;
app.listen(PORT,()=>{
console.log(`server running port 127.0.0.1:${PORT}`.bgGreen)
})