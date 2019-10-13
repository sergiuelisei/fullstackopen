import React from 'react'

const Filter = ({setNewFilter}) => {

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }    

return (
    <div>search name in the phonebook: <input onChange={handleFilter}/></div>
) 
}

export default Filter