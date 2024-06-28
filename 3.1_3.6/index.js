const express = require('express')
const app = express()

app.use(express.json()) 

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }

  app.get('/', (request, response) => {
    response.send('<h1>Go to /api/persons to get the list of all the persons</h1>')
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons) //In the earlier version where we were only using Node, we had to transform the data into the JSON formatted string with the JSON.stringify method:
    //With Express, this is no longer required, because this transformation happens automatically.
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id == id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(note => note.id != id)
  
    response.status(204).end()
  })

  app.get('/info', (request, response) => {
    const numberOfPersons = persons.length
    const actualTime = new Date()
    response.send(`<div>
        <p>Phonebook has info for ${numberOfPersons} people</p>
        <p>${actualTime}</p>
        </div>`)
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }else if(!body.name){
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})