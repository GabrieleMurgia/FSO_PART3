const express = require('express')
const app = express()
const morgan = require('morgan');
const mongoose = require('mongoose')
require('dotenv').config();

app.use(express.static('dist'))
app.use(express.json()) 
app.use(morgan('tiny'));

morgan.token('post-data', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));


//DB 
//Person
const Person = require('./models/person')
//

  app.get('/', (request, response) => {
    response.send('<h1>Go to /api/persons to get the list of all the persons</h1>')
  })

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => { 
      response.json(result)
    })
  })

  app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
    .then(result => {
      response.status(200).json({ message: 'Person deleted', result:result});
    })
    .catch(error => next(error))
  })

  app.get('/info', (request, response, next) => {
    Person.countDocuments({})
      .then(count => {
        const actualTime = new Date()
        response.send(`<div>
          <p>Phonebook has info for ${count} people</p>
          <p>${actualTime}</p>
          </div>`)
      })
      .catch(error => next(error))
  })

  app.post('/api/persons', (request, response) => {
    debugger
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
  
    const person = new Person({
      name: body.name,
      number: body.number,
      })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person)
      .then(updatedPerson => {
        if (updatedPerson) {
          response.status(200).json({ message: 'Person number updated', result:updatedPerson});
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

//Error Middleware it has to be the last loaded middleware, also all the routes should be registered before the error-handler!
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})