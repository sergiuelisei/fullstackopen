  
const express = require('express')
const morgan = require('morgan')

const bodyParser = require('body-parser')
const app = express()

morgan.token('person', (req) => {
	return JSON.stringify(req.body)
})

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :person'))

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

function generateId() {
  return Math.floor(Math.random()*999);
}

app.post('/api/persons', (request, response) => {
  const body = request.body

 if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  } 
  
  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  } 
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  // console.log(person.name)
  // console.log(body.name)

 
  // console.log(persons.find(p => p.name === body.name));
  response.json(person) 
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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})