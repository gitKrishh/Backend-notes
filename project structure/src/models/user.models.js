/*
id string pk
  displayName string
  email string
  password string
  DOB string
  NotesTitle string
*/

import mongoose, {Schema} from 'mongoose'
import bycrypt from "bycrypt" //helps you to hash your password
import jwt from "jsonwebtoken"

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
 
userSchema.pre("save", async function (next) {// pre hook data save hone se just pehele run hota

    if(!this.isModified("password")) return next() // this refers to the Mongoose document that's currently being saved. and 

    this.password = bycrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCOrrect = async function(passwod){
    return await bycrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    //short lived access token
    jwt.sign({_id: this._id,
        email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
)
}
userSchema.methods.generateRefreshToken = function(){
    //long lived access token
    jwt.sign({_id: this._id,//This is the data stored inside the token
        //less data in refresh token then access token
    },
    process.env.REFRESH_TOKEN_SECRET, //Used to sign the token so no one can tamper with it
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY} //define how long the token is valid
)
}

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