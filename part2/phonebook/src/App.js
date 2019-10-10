import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')

  const addEntry = (event) => {
    event.preventDefault()

    const entryObject = {
      name: newName,
      id: persons.length + 1
    }

    setPersons(persons.concat(entryObject));
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const entries = () => persons.map(person => 
  <Person   key={person.name} person={person.name} /> )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input  value={newName}
          onChange={handleNameChange}/>
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    <ul>
        {entries()}
      </ul>
    </div>
  )
}

export default App