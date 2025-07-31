import {asyncHandler} from './../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
 
const registerUser = asyncHandler(async(req, res) => {
    // res.status(200).json({
    //     message: "ok"
    // })

    // GET USER DETAILS FROM FRONTEND
    // VALIDATION - NOT EMPTY
    // CHECK IF USER ALREADY EXITST: CHECK BY UNIQUE EMAIL
    // CHECK FOR IMAGES, CHECK FOR AVATAR
    // UPLOAD THEM TO CLOUDINARY
    // CREATE USER OBJECT - CREATE ENTRY IN DB
    // REMOVE PASSWORD AND REFRESH TOKEN FIELD FROM RESPONSE
    // CHECK FOR USER CREATION
    // RETURN RES



    const {displayName, email, password} =  req.body
    console.log("email:", email);

    if([displayName, email, password].some((field)=> field.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{displayName}, {email}]
    })
    
    if(existedUser) {
        throw new ApiError(409, "User already exist")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    // User.create({
    //     fillName
    // })
    

})

export {registerUser}