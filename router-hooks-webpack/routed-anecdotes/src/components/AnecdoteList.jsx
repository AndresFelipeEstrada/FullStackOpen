import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes, notification, message }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {message}

      <ul>
        {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdote/${anecdote.id}`}>
          {anecdote.content}
          </Link>
        </li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList
