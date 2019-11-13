import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
  const good = props.clicks.good
  const neutral = props.clicks.neutral
  const bad = props.clicks.bad

  const total = good + neutral + bad

  const average = () => {
    if (total === 0) {
      return 0
    } else {
      return (good * 1 + bad * -1) / total
    }
  }
  const positivePercent = () => {
    if (total === 0) {
      return 0
    } else {
      return (good / total) * 100
    }
  }

  if (total > 0) {
    return (
      <div>
        <h3>statistics</h3>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {average()}</p>
        <p>positive {positivePercent()}</p>
      </div>
    )
  } else {
    return (
      <div>No feedback given</div>
    )
  }
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
        <button onClick={clickGood}>good</button>
        <button onClick={clickNeutral}>neutral</button>
        <button onClick={clickBad}>bad</button>
      </p>
      <Statistics clicks={clicks} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));