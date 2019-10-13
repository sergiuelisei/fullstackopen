import React, {useState} from 'react'
import Country from './Country'

const ShowCountry = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleOnClick = () => {
    setShow(!show);
  };

  return (
    <div>
      {country.name}
      <button onClick={handleOnClick}>{show ? "hide" : "show"}</button>
      {show ? <Country country={country}/> : null}
    </div>
  );
};

export default ShowCountry