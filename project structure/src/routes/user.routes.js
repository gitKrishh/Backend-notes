import {Router} from "express"
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js"
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar", //first object
            maxCount: 1
        },
        // {
        //     name: "coverimage"
        // }
    ]),
    registerUser) //registerUser controller now has access to: req.body — all text fields req.files.avatar — the uploaded avatar file

router.route("/login").post(loginUser)

//secured routes

router.route("/logout").post(verifyJWT, logoutUser)


export default router
/*
    Adds parsed data to:

        req.files (for files)

        req.body (for text)


*/