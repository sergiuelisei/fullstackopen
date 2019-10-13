import React, { useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const searchCountries = input => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${input}`)
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        setCountries([]);
      });
  };
  const handleSearch = event => {
    setSearch(event.target.value);
    searchCountries(event.target.value);
  };

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <Countries countries={countries} />
    </div>
  );
};

export default App;