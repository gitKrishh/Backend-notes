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
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    numberOfNotes: {
        type: Number,
        required: true,
    },
},
{timestamps: true}
)
 
notesSchema.plugin(mongooseAggregatePaginate) //.plugin() is a Mongoose method that adds custom functionality to your schema.

export const Notes= mongoose.model("Notes", notesSchema)