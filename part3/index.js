  
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

app.use(cors())

morgan.token('person', (req) => {
  return JSON.stringify(req.body)
})

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :person'))


app.use(express.static('build'))

// function generateId() {
//   return Math.floor(Math.random()*999);
// }

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  } 
  
  // if (person.find(p => p.name === body.name)) {
  //   return response.status(400).json({ error: "name must be unique" });
  // } 
  
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson  => {
    response.json(savedPerson.toJSON())
  })

})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON() ))
  })
})

// app.get('/info', (request, response) => {
//   const number = persons.length;
//   response.send(`<h1>Phonebook has info for ${number} people</h1>
//   ${Date(Date.now()).toString() }
//   `)
// })

app.get('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const person = persons.find(person => person.id === id)
  // if (person) {
  //   response.json(person)
  // } else {
  //   response.status(404).end()
  // }

  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person.toJSON())
    } else {
      response.status(404).end() 
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)

  // response.status(204).end()
console.log('--------------------------------')
console.log(request.params)
console.log('request :',request.params.articleId)
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}
app.use(errorHandler)


// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})