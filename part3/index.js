  
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
      {
        name: "Arto Hellas",
        number: "2242424",
        id: 1
      },
      {
        name: "sergiu test",
        number: "132-1231",
        id: 2
      },
      {
        name: "Test",
        number: "123",
        id: 3
      },
      {
        name: "server",
        number: "00000",
        id: 4
      }
  
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const number = persons.length;
  response.send(`<h1>Phonebook has info for ${number} people</h1>
  ${Date(Date.now()).toString() }
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})