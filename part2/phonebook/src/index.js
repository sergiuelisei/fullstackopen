import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '1234-1234-1234'
  },{
    id: 2,
    name: 'Abramov Hellas',
    number: '040-123456'
  },{
    id: 3,
    name: 'Arto Dee',
    number: '444-444444'
  },{
    id: 4,
    name: 'Ada Lovelace',
    number: '222-2222'
  },

]

ReactDOM.render(<App persons={persons} />, document.getElementById('root'));

