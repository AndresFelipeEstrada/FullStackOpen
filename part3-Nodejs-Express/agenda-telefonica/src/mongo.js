import mongoose from "mongoose";

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const db = `mongodb+srv://fullstack:${password}@cluster0.mzbgwx2.mongodb.net/phonebook?retryWrites=true&w=majority`


mongoose.connect(db)

const phonebook = mongoose.Schema({
  name: String,
  number: Number
})

const PhoneNumber = mongoose.model('PhoneNumber', phonebook)

if (process.argv.length === 3) {
  PhoneNumber.find({}).then(result => {
    console.log('Phonebook: ')
    result.forEach(users => {
      console.log(users.name + " " + users.number)
      mongoose.connection.close()
    })
  }).then(error => {
    console.log(error)
    mongoose.connection.close()
  })
} else {

  const newUser = new PhoneNumber({
    name: name,
    number: number
  })

  newUser.save().then(result => {
    console.log('usuario creado: ', result)
    mongoose.connection.close()
  })
}


