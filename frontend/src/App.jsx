import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import personServices from './services/persons'
import ToastMessage from './components/ToastMessage'


const App = () => {
  const {getAll , create , deletePerson , update} = personServices
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    getAll()
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response)
      setFilteredPersons(response)
    })
  }, [])

  function handleShowToast(message){
    setShowToast(true)
    setToastMessage(message)
    setTimeout(()=>{
      setShowToast(false)
    },2000)
  }

  function handleSumbmitNewName(e){
    e.preventDefault()
    if(filteredPersons.filter(person => person.name == newName).length){
      let personToUpdate = {...filteredPersons.filter(person => person.name == newName)[0],number:newNumber}
      if (window.confirm(`${personToUpdate.name} is already added to phonebook, replace the old numbber with a new one?`)) {
        
        update(personToUpdate)
        .then(updatedPerson => {  
          let updatedPersons = persons.map(person => {
            if(person.id === updatedPerson.id){
              handleShowToast(`Updated ${updatedPerson.name} number`)
              return updatedPerson
            }else{
              return person
            }})
            
            setFilteredPersons(updatedPersons)
            setPersons(updatedPersons)
        })
        .catch(err =>{
          console.error(err)
        })
      }
    }else{
      let newObj = {
        name:newName,
        number:newNumber,
        id:JSON.stringify(filteredPersons.length + 1)
      }

      create(newObj)
      .then(req => {
        handleShowToast(`Added ${req.name}`)
        req.data
      })

      setFilteredPersons(filteredPersons.concat(newObj))
      setPersons(filteredPersons.concat(newObj))
    }
  }

  function handleChangeNewValue(e){
    let isInputNumber = e.target.className
    let cValue = e.target.value
    if(isInputNumber === 'inputNumber'){
      if(handleOnlyNumberValues(cValue)){
        setNewNumber(cValue)
      }
    }else{
      setNewName(cValue)
    }
  }

  function handleFilterPersons(e) {
    const cValue = e.target.value.toLowerCase()
    if (cValue === '') {
      setFilteredPersons(persons)
    } else {
      const fPersons = persons.filter(person => person.name.toLowerCase().includes(cValue))
      setFilteredPersons(fPersons)
    }
  }

  function handleDeletePerson(person){
    if (window.confirm(`Delete ${person.name} ?`)) {
      deletePerson(person.id)
      .then(deletedPerson => {  
        let fPersons = persons.filter(aPerson => aPerson.id != deletedPerson.id)
        setFilteredPersons(fPersons)
        setPersons(fPersons)
      })
      .catch(err =>{
        console.error(err)
      })
    }
  }

function handleOnlyNumberValues(cValue){
  const nonNumericPattern = /[^\d.+-]/;
  if (nonNumericPattern.test(cValue)) {
    return false;
  }
  return true;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      { showToast ? <ToastMessage message={toastMessage}></ToastMessage> : null}
      <Filter text={'filter shown with'} onHandleFilter={handleFilterPersons}/>
      <h2>add a new</h2>
      <PersonForm onSumbitForm={handleSumbmitNewName} number={newNumber} onChangeNumber={handleChangeNewValue} name={newName} onChangeName={handleChangeNewValue}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App