import mongoose from 'mongoose'
import {DB_NAME} from "../constants.js"

const connectDB = async()=> {
    try {
        const connectionInstence = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected! DB host: ${connectionInstence.connection.host}`) 
    } catch (error) {
        console.log("mongoDB connection error", error);
        process.exit(1)//This stops the server from running if the DB isn't connected — a common best practice.
        
    }
}

export default connectDB

//mongoose.connect() returns a connection object (called connectionInstence here). You can use it to get more info about the connection — like the host name.