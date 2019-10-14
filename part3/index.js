  
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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})