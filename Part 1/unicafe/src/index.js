import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  const good = props.clicks.good
  const neutral = props.clicks.neutral
  const bad = props.clicks.bad
  const total = good + neutral + bad
  const average = (good * 1 + bad * -1) / total
  const positivePercent = (good / total) * 100

  if (total > 0) {
    return (
      <div>
        <h3>statistics</h3>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positivePercent} />
      </div>
    )
  } else {
    return (
      <div>No feedback given</div>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = (props) => {
  //save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => {
    const newGood = good + 1;
    setGood(newGood);
    console.log('good Clicked');
  }

  const clickNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    console.log('Neutral Clicked');
  }

  const clickBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
    console.log('Bad Clicked');
  }

  const clicks = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button handleClick={clickGood} text='good' />
        <Button handleClick={clickNeutral} text='neutral' />
        <Button handleClick={clickBad} text='bad' />
      </p>
      <Statistics clicks={clicks} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));