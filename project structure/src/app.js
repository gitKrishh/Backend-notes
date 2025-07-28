import express from 'express'
import cors from 'cors'


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
app.use(express.static("public")) //This middleware serves static files from the "public" directory.That means: any files inside public/ — like HTML, CSS, JS, images, fonts — become directly accessible via the browser.

export {app}