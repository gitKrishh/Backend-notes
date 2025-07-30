import mongoose, {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

/*
  id string pk
  whichUser string
  numberOfNotes int
*/

const notesSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    whichUser: {
        type: String,
        required: true,
    },
    numberOfNotes: {
        type: Number,
        required: true,
    },
},
{timestamps: true}
)
 
notesSchema.plugin(mongooseAggregatePaginate)

export const Notes= mongoose.model("Notes", notesSchema)