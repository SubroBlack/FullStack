import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percetn of the code accounts for the first 90 percent of the development time... THe remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as celverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const emptyVotes = [0, 0, 0, 0, 0, 0]
  const [votes, setVotes] = useState(emptyVotes)

  console.log('The quote number', selected)
  console.log('The votes array', votes)

  const Vote = () => {
    const copy = [...votes]
    copy[selected] = copy[selected] + 1
    setVotes(copy)
    console.log('New Votes in', votes)
    console.log('Most Votes is', mostVote())
  }

  const selectQuote = () => {
    const num = Math.floor(Math.random() * 6)
    setSelected(num)
  }

  const mostVote = () => {
    let max = 0
    votes.forEach(vote => {
      if (vote > max) {
        max = vote
      }
    })
    console.log('Max Vote yet', max)
    return max
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {props.anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={selectQuote} text='Next Anecdote' />
      <Button handleClick={Vote} text='Vote' />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[votes.indexOf(mostVote())]}
      <br />
      has {mostVote()} votes
    </div>
  )

}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));