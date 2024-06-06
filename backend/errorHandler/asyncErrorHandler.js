exports.asyncErrorHandler=(func)=>{
    return(req,res,next)=>{
        func(req,res,next).catch(err=>next(err));
    }
//  Promise.resolve(thinks(req,res,next)).catch(err=>next(err));
}

