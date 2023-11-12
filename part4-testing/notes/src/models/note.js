import mongoose from "mongoose"

const noteSchema = mongoose.Schema({
  content: {
    type: String,
    minlength: 2,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const Note = mongoose.model('Note', noteSchema)