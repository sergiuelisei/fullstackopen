const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true);

if(process.argv.length < 3) {
  console.log('missing password')
  process.exit(1)
}


const password = process.argv[2]

const url =
`mongodb+srv://sergiu123:${password}@phonebook-jw29g.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })


const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)



if ( process.argv.length === 5 ) {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({name, number})
  person
  .save()
  .then(person => {
  console.log(`added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
  process.exit(1)
})

} else  {
  
Person.find({}).then(persons => {
  console.log("phonebook:")
  persons.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
  process.exit(1)
})
}