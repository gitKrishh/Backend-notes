import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"


const app = express()
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)

//common middlewares:
app.use( express.json({limit:"16kb"})) // limit the size of the json file to 16kb
app.use(express.urlencoded({extended: true, limit:"16kb"})) // This middleware is used to parse incoming requests with URL-encoded payloads — typically sent by HTML forms (application/x-www-form-urlencoded).
app.use(express.static("public")) //This middleware serves static files from the "public" directory.That means: any files inside public/ — like HTML, CSS, JS, images, fonts — become directly accessible via the browser...
app.use(cookieParser()) //give options to edit cookie

//import routes
import userRouter from './routes/user.routes.js' //AB ROUTER KO LANE KE LIYE MIDDLEWARE USE HOGA

//routes decleration:
app.use("/api/v1/users", userRouter)



//routes
// app.use("/api/v1/healthcheck", healthcheckRouter)

//GENERAL SYNTAX : app.use([path], callbackFunction OR router)
/*


    path (optional): The base URL path.

    callback/router: What should be run when a request hits that path.

    import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);

This tells Express:

    "For anything starting with /api/v1/users, use the userRoutes router."


*/ 


/*
This mounts the router on the path /api/v1/healthcheck
So now any request that starts with /api/v1/healthcheck will go to healthcheck.routes.js for further routing.
*/

export {app}