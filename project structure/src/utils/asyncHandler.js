const asyncHandler = (requestHandler)=>{
    return (req, res, next) =>{ //next is a middleware
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err)) //It returns a Promise that is already resolved with the given value.
    }
}

export {asyncHandler}