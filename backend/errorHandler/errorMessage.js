const app = require("../app");
app.use('*',(err,req,res,next)=>{
    if(res.headers){
        next(
            res.status(500).json({
                success:false,
                message:err.message
            })
        )
    }
    else{
        if(err.message){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
        else{
            res.status(500).json({
                success:false,
                message:'somthing is wrong this urls!'
            })
        }
    }
})

