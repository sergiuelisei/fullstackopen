import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
    }, [])
  

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
      <Persons newFilter={newFilter} persons={persons}/>  
    </div>
  )
}

export default App

