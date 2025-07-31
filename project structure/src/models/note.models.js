/*
  id string pk
  title string
  description string
*/

import mongoose, {Schema} from 'mongoose'

const noteSchema = new Schema({
    id: {
        type: String, //cloudinary url
        required: true,
    },
    title: {
        type: String, //cloudinary url
        require: true, 
        index: true
    },
    description: {
        type: String, //cloudinary url
        required: true,
    }
},
{timestamps: true}
)

export const Note = mongoose.model("Note", noteSchema)