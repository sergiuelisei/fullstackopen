import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({text, votes}) => {
  return (
    <div>{text} <br/> has {votes} votes</div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(x => 0));
  const randomAnecdote = () => {
     const index = Math.floor(Math.random() * anecdotes.length);
     setSelected(index);
  }
  const voting = (value) =>{
    const arr = [...votes];
    arr[value]++;
    setVotes(arr);
  }
  const topVote = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button text="VOTE" onClick={()=>voting(selected)} />
      <Button text="next anecdote" onClick={randomAnecdote} />
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[topVote]}  votes={votes[topVote]} />

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)