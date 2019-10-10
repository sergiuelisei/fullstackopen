import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '1234-1234-1234'
  }
]

ReactDOM.render(<App persons={persons} />, document.getElementById('root'));

