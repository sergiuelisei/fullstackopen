import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => {
  return <h1>{text}</h1>;
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad }) => {
  const all = good+neutral+bad;
  const average = (good-bad)/all;
  const positive = good/all*100;

  if (all>0) {
    return (
      <table><tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive+'%'} />
      </tbody></table>
    )
  } else {
    return <div>No feedback given</div>
}
  }
  
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
         <Header text="Give feedback"/>
        <Button onClick={handleGood} text="good"/>
        <Button onClick={handleNeutral} text="neutral"/>
        <Button onClick={handleBad} text="bad"/>

        <Header text="statistics"/>
        <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))