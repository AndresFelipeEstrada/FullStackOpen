import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import { useEffect, useState } from 'react'
import { votes, createAnecdote, initialAnecdotes, newAnecdote } from './reducers/anecdoteReducer'
import { showContent } from './reducers/notificationReducer'

const App = () => {
  const [showNotification, setshowNotification] = useState(false)
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)


  useEffect(() => {
    dispatch(initialAnecdotes())
  }, [dispatch])

  const handleMessage = (message) => {
    dispatch(showContent(message))

    setshowNotification(true)

    setTimeout(() => {
      setshowNotification(false)
    }, 3000)
  }

  const vote = async (anecdote) => {
    dispatch(votes(anecdote))
    handleMessage(anecdote.content)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const addNewAnecdote = {
      content: content,
      votes: 0
    }

    dispatch(createAnecdote(addNewAnecdote))
    handleMessage(addNewAnecdote.content)
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {showNotification && <Notification />}
      {sortedAnecdotes.map(anecdote =>
        <div key={`anecdote-${anecdote.id}`} >
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
      }
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div >
  )
}

export default App
