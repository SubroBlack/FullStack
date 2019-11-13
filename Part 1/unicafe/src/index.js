import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <button onClick={clickGood}>good</button>
        <button onClick={clickNeutral}>neutral</button>
        <button onClick={clickBad}>bad</button>
      </p>
      <h3>statistics</h3>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));