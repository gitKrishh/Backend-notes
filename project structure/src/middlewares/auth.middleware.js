import { User } from "../models/user.models"
import { ApiError } from "../utils/ApiError"
import { asyncHandler } from "../utils/asyncHandler"
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHandler(async(req, _, next)=>{ //we can use _ insted of res if it is not used in the code
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401, "unauthorized request")
        }
        const decodedToken = JsonWebTokenError.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401, "invalid token")
        }

        req.user = user; //Attach that user info to the req object so the next middleware or controller can use it. Used to store the logged-in user info after JWT verification. Accessible to all routes/middleware that come after.
        next()
    }catch(error){
        throw new ApiError(401, error?.message || "invalid access token")
    }
})