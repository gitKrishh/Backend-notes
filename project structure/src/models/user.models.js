/*
id string pk
  displayName string
  email string
  password string
  DOB string
  NotesTitle string
*/

import mongoose, {Schema} from 'mongoose'
import bycrypt from "bycrypt"

const userSchema = new Schema({
    displayName: {
        type: String,
        required:true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    NotesTitle: [
        {
            type: Schema.Types.ObjectId ,
            ref: "Title"
            
        }
    ],
    password: {
        type: String,
        required: [true, "password is required"]
    },
    refreshToken: {
        type: String,
    },
    
},
{timestamps: true}
) 

userSchema.pre("save", async function (next) {

    if(!this.modified("password")) return next()

    this.password = bycrypt.hash(this.password, 10)
    next()
})



export const User= mongoose.model("User", userSchema) //A model is a class with which we construct documents

// User --->> but in db the mongoose autometically converts this in lower case and in plural format

/*    ObjectId is MongoDB's default primary key type (_id field)
It's a 12-byte identifier typically represented as a 24-character hex string (e.g., "507f1f77bcf86cd799439011")
It consists of:
4-byte timestamp        5-byte random value        3-byte incrementing counter
The Schema is the fundamental building block in Mongoose that allows you to:
Define the structure of your documents
Set validation rules    Configure defaults    Define relationships between models
Types (capital T) is an object attached to the Schema constructor that contains all the available Mongoose types
*/