import './app.css'
import { useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAllAnecdotes, updateVotes } from './services/anecdotes'

import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const { dispatch } = useAnecdotes()
  const [showMessage, setShowMessage] = useState(false)
  const { data, isError, isLoading } = useQuery(
    ['anecdotes'],
    async () => await getAllAnecdotes(),
    { retry: false }
  )

  const queryClient = useQueryClient()

  const changeAnecdoteMutation = useMutation(updateVotes, {
    onSuccess: (updateAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const findAnecdote = anecdotes.map((anecdote) =>
        anecdote.id === updateAnecdote.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
      queryClient.setQueryData('anecdotes', findAnecdote)
    }
  })

  const handleVote = (anecdote) => {
    changeAnecdoteMutation.mutate(anecdote)
    setShowMessage(true)
    dispatch({ type: 'vote', payload: anecdote.content })

    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  if (isError) {
    return <p>Anecdote service not available due to problems in server</p>
  }

  if (isLoading) {
    return <p>Cargando..</p>
  }

  const anecdotes = data.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>

      {showMessage && <Notification />}

      <AnecdoteForm setShowMessage={setShowMessage}/>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} className="list">
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
