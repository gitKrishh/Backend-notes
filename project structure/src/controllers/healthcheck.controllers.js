//A healthcheck.controller.js (sometimes just called health.js or ping.js) is a basic controller file used to check whether your backend server is running and healthy.

import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const healthcheck = asyncHandler(async (req,res)=>{
    return res.status(200).json(new ApiResponse(200, "OK", "Healthcheck passed")) //This is called method chaining. It means you're calling multiple functions one after another on the same object — in this case, the res object (response object from Express).
})

export {healthcheck}