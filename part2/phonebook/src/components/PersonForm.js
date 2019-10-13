import React from 'react'
import personService from '../services/persons'

const PersonForm = ({ setPersons, setNewName,setNewNumber,  newName, newNumber, persons}) => {

  const findPerson = ()=>{
    const name = newName
    return persons.some(person => person.name.toLowerCase() === name.toLowerCase())
}
const duplicateContact = persons.find(p => p.name === newName);


const addEntry = (event) => {
    event.preventDefault()
    if( findPerson()) {
         const msg =  `${ duplicateContact.name } is already added to phonebook, replace the old number with a new one?`

        if (window.confirm(msg) === true) {
            personService
                .update(duplicateContact.id, {name: newName, number: newNumber})
                .then(updatedPerson => {
                    setPersons(persons.map(person => person.id !== duplicateContact.id ? person : updatedPerson))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    alert( `Something went wrong, try again `)
                    setPersons(persons.filter(person => person.id !== duplicateContact.id))
                })
        }
    }

    else if(newName.length > 0 && newNumber.length > 0 ){

      personService
      .create({name: newName, number: newNumber})
      .then(returnedPerson => {
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