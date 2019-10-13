import React from 'react'
import axios from 'axios'

const PersonForm = ({ setPersons, setNewName,setNewNumber,  newName, newNumber, persons}) => {

  const findPerson = ()=>{
    const name = newName
    return persons.some(person => person.name.toLowerCase() === name.toLowerCase())
}

const addEntry = (event) => {
    event.preventDefault()
    if( findPerson()) {
      alert(`${newName} is already in the phonebook`)}

    else if(newName.length > 0 && newNumber.length > 0 ){

      axios
      .post('http://localhost:3001/persons', {name: newName, number: newNumber})
      .then(response => {
        setPersons(persons.concat(response.data))
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
 
 return (<form onSubmit={addEntry}>
        <div>
          name: <input  value={newName}
          onChange={handleNameChange}/>
        </div> 
        
        <div>
          number: <input  value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)
}

export default PersonForm;