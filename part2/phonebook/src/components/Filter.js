import React from 'react'

const Filter = ({handleFilter}) => (
    <div>search name in the phonebook: <input onChange={handleFilter}/></div>
) 


export default Filter