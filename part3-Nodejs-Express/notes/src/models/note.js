import mongoose from "mongoose"

const url = process.env.URL_DB

export const connectDB = () => {
  mongoose.connect(url).then(_result => {
    console.log('Connect to Database')
  }).catch(error => {
    console.log('error connecting to mongoDB', error.message)
  })
}


const noteSchema = mongoose.Schema({
  content: String,
  date: Date,
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
