import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState(null)
  
useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])

    const handleFilter = (event) => {
      setNewFilter(event.target.value)
  }    

    const deleteContact = (e) => {
      const id = e.target.id
      const name = e.target.name
      const msg = `Do you really want to delete ${ name }?`
    
      if (window.confirm(msg) === true) {
          personService
              .deletePerson(id)
              .then(deletedPerson => {
                setNotificationMessage({
                  "text": `${ name } was removed from server`,
                  "type": "error"
              })
              setTimeout(() => {
                  setNotificationMessage(null)
              }, 5000)

                  setPersons(persons.filter(person => person.id !== id))
              })
              .catch(error => {
                  setNotificationMessage({
                  "text": `${ name } was already removed from server`,
                  "type": "error"
              })
              setTimeout(() => {
                  setNotificationMessage(null)
              }, 5000)

                  setPersons(persons.filter(person => person.id !== id))
              })
      }
    }

    const findPerson = ()=>{
      const name = newName
      return persons.some(person => person.name.toLowerCase() === name.toLowerCase())
  }
  const duplicateContact = persons.find(p => p.name === newName);
  
  
  const addEntry = (event) => {
      event.preventDefault()
      if( duplicateContact ) {
           const msg =  `${ duplicateContact.name } is already added to phonebook, replace the old number with a new one?`
  
          if (window.confirm(msg) === true) {
              personService
                  .update(duplicateContact.id, {name: newName, number: newNumber})
                  .then(updatedPerson => {
  
                    setNotificationMessage({
                      "text": ` ${ duplicateContact.name }'s number is now updated`,
                      "type": "notification"
                  })
    
                  setTimeout(() => {
                      setNotificationMessage(null)
                  }, 5000)
                      setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
                      setNewName('')
                      setNewNumber('')
                  })
                  .catch(error => {
                    setNotificationMessage({
                      "text": ` Information of  ${ duplicateContact.name } has already been removed from server`,
                      "type": "error"
                  })
    
                  setTimeout(() => {
                      setNotificationMessage(null)
                  }, 5000)
                        
                  })
          }
      }
  
      else if(newName.length > 0 && newNumber.length > 0 ){
  
        personService
        .create({name: newName, number: newNumber})
        .then(returnedPerson => {
          
          setNotificationMessage({
            text: `${ returnedPerson.name } is now in your phonebook`,
            type: "notification"
        })
  
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
  
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          
           
  
        }) 
  
      }
      else{
          alert("please complete the name and the number field")
      }
  
     
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

    
  return (
    <div>
      <h2>Phonebook</h2>

      { notificationMessage !== null ? <Notification message={ notificationMessage } /> : null }

     <Filter handleFilter={handleFilter} />

      <h2>add a new</h2>
    <PersonForm
      addEntry={addEntry}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}
    />

      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} deleteContact={deleteContact}/>  
    </div>
  )
}

export default App

