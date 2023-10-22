import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const password = process.env.PASSWORD

const db = `mongodb+srv://fullstack:${password}@cluster0.mzbgwx2.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(db)

const phonebook = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  number: {
    type: Number,
    min: 3,
    required: true
  }
})

phonebook.plugin(uniqueValidator)

export const Phone = mongoose.model('PhoneNumber', phonebook)
