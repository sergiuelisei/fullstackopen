import React from 'react'


const Persons = ({newFilter, persons}) => {
  
    const personsFiltered = persons.filter(person => {
        return person.name.toLowerCase().includes(newFilter.toLowerCase())
    })
    
    const personsToShow = newFilter.length === 0 ? persons : personsFiltered

    const displayPersons = personsToShow.map(person =>
        <div key={person.name}> {person.name} {person.number}</div>
    )    
    
    return (
        <div>{displayPersons}</div>
    )
}

export default Persons