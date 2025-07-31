const asyncHandler = (requestHandler)=>{
    return (req, res, next) =>{ //next is a middleware
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err)) //It returns a Promise that is already resolved with the given value.
    }
}

export {asyncHandler}


//OR WE CAN ALSO USE TRY CATCH:
/*
const asyncHandle = (fn) => async(req,res,next) => {
    try{
        await fn(req, res, next)
    }catch(error){
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
*/