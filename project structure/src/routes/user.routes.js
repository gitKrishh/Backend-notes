import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"
import {upload} from '../middlewares/multer.middleware.js'

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

export default router
/*
    Adds parsed data to:

        req.files (for files)

        req.body (for text)


*/