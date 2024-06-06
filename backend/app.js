const express = require("express");
const userRouters = require("./routers/UserRouters");
const videoRouters = require("./routers/VideoRouters");
const categoryRouters = require("./routers/VideoCategoriesRouter")
const posterRouters = require("./routers/PosterRouter")
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
//cors
app.use(cors())
//env path
dotenv.config({path:"backend/.env"});
//json 
app.use(express.json())
///use cookie
app.use(cookieParser())

//file limit
app.use(express.urlencoded({ extended: false }))
///static store image path
app.use('/images',express.static(path.join(__dirname,'./public/images')));

//user router api
app.use('/api/users',userRouters);
//videos router api
app.use('/api/videos',videoRouters);
///videos category router api
app.use('/api/categories',categoryRouters);
//poster router api
app.use('/api/posters',posterRouters)

module.exports= app;