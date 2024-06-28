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
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id)))
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

  app.get('/info', (request, response) => {
    const numberOfPersons = persons.length
    const actualTime = new Date()
    response.send(`<div>
        <p>Phonebook has info for ${numberOfPersons} people</p>
        <p>${actualTime}</p>
        </div>`)
  })



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})