require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

// 3.8: log the request body for POST requests
morgan.token('body', (request) =>
  request.method === 'POST' ? JSON.stringify(request.body) : ''
)
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
]

// 3.1: get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// 3.2: info page
app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()
  response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
})

// 3.3: get a single person
app.get('/api/persons/:id', (request, response) => {
  const person = persons.find((p) => p.id === request.params.id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// 3.4: delete a person
app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter((p) => p.id !== request.params.id)
  response.status(204).end()
})

// update the number of an existing person
app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  const person = persons.find((p) => p.id === request.params.id)

  if (!person) {
    return response.status(404).end()
  }

  person.number = body.number
  response.json(person)
})

const generateId = () => String(Math.floor(Math.random() * 1_000_000))

// 3.5 + 3.6: add a person, with validation
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number is missing' })
  }

  if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
