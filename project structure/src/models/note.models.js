/*
  id string pk
  title string
  description string
*/

import mongoose, {Schema} from 'mongoose'

const noteSchema = new Schema({
    id: {
        type: string,
        required: true,
    },
    title: {
        type: string,
        require: true,

    },
    description: {
        type: string,
        required: true,
    }
},
{timestamps: true}
)

export const Note = mongoose.model("Note", noteSchema)