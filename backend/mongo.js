const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@clusterfso.z5mjknl.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=ClusterFSO`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  //Since the parameter is an empty object{} we get all of the notes stored in the notes collection.
  Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })

}else{
  const newName = process.argv[3]
  const newNumber = process.argv[4]

  const person = new Person({
    name: newName,
    number: newNumber,
  })


  person.save().then(result => {
    console.log(`added ${newName} number ${newNumber} to phonebook`,result)
    mongoose.connection.close()
  })
}

