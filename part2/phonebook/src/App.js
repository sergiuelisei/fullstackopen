import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])
  

    const deleteContact = (e) => {
      const id = Number(e.target.id)
      const name = e.target.name
      const msg = `Do you really want to delete ${ name }?`
    
      if (window.confirm(msg) === true) {
          personService
              .deletePerson(id)
              .then(deletedPerson => {
                  setPersons(persons.filter(person => person.id !== id))
              })
              .catch(error => {
                  alert( `${ name } was already removed`)
                  setPersons(persons.filter(person => person.id !== id))
              })
      }
    }


    
  return (
    <div>
      <h2>Phonebook</h2>
     <Filter setNewFilter={setNewFilter} />

      <h2>add a new</h2>
    <PersonForm
      persons={persons}
      setPersons={setPersons}
      newName={newName}
      setNewName={setNewName} 
      newNumber={newNumber}
      setNewNumber={setNewNumber}
    />

      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} deleteContact={deleteContact}/>  
    </div>
  )
}

export default App

