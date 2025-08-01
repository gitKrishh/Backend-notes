import { asyncHandler } from './../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import path from "path"; // 👈 add this if not present
import { access } from 'fs'
import { ref } from 'process'


const generateAccessandRefreshToken = async(userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return(accessToken, refreshToken)


    }catch(error){
        throw new ApiError(400, "something went wrong while generating access and refresh token")
    }
}


const registerUser = asyncHandler(async (req, res) => {
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



    const { displayName, email, password } = req.body
    console.log("email:", email);

    if ([displayName, email, password].some((field) => field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ displayName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User already exist")
    }

    console.log("req.files:", req.files);


    const avatarLocalPath = req.files?.avatar[0]?.path;
    const absolutePath = path.resolve(avatarLocalPath);


    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required 1 ")
    }

    console.log("Avatar local path:", avatarLocalPath);
    console.log("Absolute path:", absolutePath);


    const avatar = await uploadOnCloudinary(absolutePath)


    if (!avatar) {
        throw new ApiError(400, "Avatar file is required 2 ")
    }

    const user = await User.create({
        displayName,
        avatar: avatar?.url || "",  //hai toh url dal do nai hai toh empty rhene do
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //kya kya nahi chaiye
    )

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})

const loginUser = asyncHandler(async (req,res)=>{
    //req body --> data
    //check for username or email
    //find the user
    //check password
    //access and refresh token --> first create method and then call the method in loginUser const
    //send cookie

    const {email, rollnumber, password} = req.body

    if(!username || !email){
        throw new ApiError(400, "username or password is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "password incorrect")
    }

    const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)

    //Access Token is used to authorize requests (like fetching profile, updating data).
    // //Refresh Token is used to get a new access token without logging in again

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true, //Prevents JavaScript from accessing cookies (mitigates XSS attacks)
        secure: true //Ensures cookies are only sent over HTTPS (not over plain HTTP)
    } //ab ye hoga ki ye cookies sirf aur sirf server se modifiable hoti hai

    return res //you can see it in browser DevTools → Network tab → Response Headers
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken //data
            },
            "User loggedin successfully"
        )
    )
        //cookies --> Prevents frontend from having to store JWTs in localStorage (which is less secure)
        //Cookies are small pieces of data stored on the client (browser) and automatically sent to the server with every request to the same domain.

})
const logoutUser = asyncHandler(async(req, res)=>{
    // the problem is we do not have any data to find user by id to logout them if we give them form to logout then anyone can logout anyone!!
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            }
        },
        {
            new: true
        }
    )

    /*
    What does $set mean?

It tells MongoDB:

    “Set the value of this field to this new value.”

If the field already exists, it updates it.
If the field doesn't exist, it creates
    */

    const options= {
        httpOnly: true,
        secure: true
    }

    /*
        These are cookie options:

        httpOnly: true: JS running in browser cannot access the cookies (prevents XSS attacks)

        secure: true: Cookie is only sent over HTTPS (adds security)


    */

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully"))

})



export {
    registerUser,
    loginUser,
    logoutUser
}

/*
| Response Part     | Sent via    | Stored In (Client)             | Access Method                           |
| ----------------- | ----------- | ------------------------------ | --------------------------------------- |
| `res.cookie(...)` | HTTP header | Browser cookies                | Browser DevTools → Application tab      |
| `res.json(...)`   | HTTP body   | JS memory (your frontend code) | `response.json()` or `res.data` (Axios) |
| `res.status(...)` | HTTP status | Response metadata (transient)  | `res.status` in frontend code           |

*/