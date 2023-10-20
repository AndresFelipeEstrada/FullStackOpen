import mongoose from "mongoose";

const password = process.env.PASSWORD

const db = `mongodb+srv://fullstack:${password}@cluster0.mzbgwx2.mongodb.net/phonebook?retryWrites=true&w=majority`


mongoose.connect(db)

const phonebook = mongoose.Schema({
  name: String,
  number: Number
})

export const Phone = mongoose.model('PhoneNumber', phonebook)




