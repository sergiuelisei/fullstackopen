import React from 'react'

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
        const newPersons = persons.concat({name: newName, number: newNumber})
    
        setPersons(newPersons)
        setNewName('')
        setNewNumber('')
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