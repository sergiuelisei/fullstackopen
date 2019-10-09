import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = ({feedback, fb, text}) => (
  <p> {text} {feedback} {fb}</p>
)

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGood = () => {
    setFeedback({ ...feedback, good: feedback.good + 1 });
  }
  const handleNeutral = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 });
  }
  const handleBad = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 });
  }

  return (
    <div>
        <h1>give feedback</h1>
        <Button onClick={handleGood} text="good"/>
        <Button onClick={handleNeutral} text="neutral"/>
        <Button onClick={handleBad} text="bad"/>

        <h1>statistics</h1>
        <Display text="good" feedback={feedback.good} />
        <Display text="neutral" feedback={feedback.neutral} />
        <Display text="bad" feedback={feedback.bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))