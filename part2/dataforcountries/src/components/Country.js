import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  const API_KEY = "e33e156346e335e7ced5bd4b763e48fb";
  useEffect(() => {
    axios
      .get(
        `https://crossorigin.me/
         https://api.apixu.com/v1/current.json?key=${API_KEY}&q=${country.capital}`
      )
      .then(({ data }) => {
        const current = data.current;
        setWeather({
          temperature: current.temp_c,
          image: current.condition.icon,
          wind: `${current.wind_kph} kph direction ${current.wind_dir}`
        });
      });
  });
  
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <img src={country.flag} width="150" height="100" alt="country-flag" />
      <h2>Weather in {country.capital}</h2>
      <b>temperature:</b> {weather.temperature} Celsius<br/>
      <img src={weather.image} alt="weather image"/><br/>
      <b>wind:</b> {weather.wind}
    </div>
  );
};

export default Country;