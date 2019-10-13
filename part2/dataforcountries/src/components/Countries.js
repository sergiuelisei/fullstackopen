import React from 'react'
import ShowCountry from './ShowCountry'
import Country from './Country'

const Countries = ({ countries }) => {
    if (countries.length === 0) {
      return <div>Nothing found</div>;
    } else if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (countries.length > 1) {
      return (
        <>
          {countries.map(country => (
            <ShowCountry key={country.name} country={country} />
          ))}
        </>
      );
    } else {
      return <Country country={countries[0]} />;
    }
  };

export default Countries