import { useMutation, useQueryClient } from 'react-query'
import { postAnecdote } from '../services/anecdotes'
import { useAnecdotes } from '../hooks/useAnecdotes'

// eslint-disable-next-line react/prop-types
const AnecdoteForm = ({ setShowMessage }) => {
  const queryClient = useQueryClient()
  const { dispatch } = useAnecdotes()

  const newAnecdoteMutation = useMutation(postAnecdote, {
    onError: () => {
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 3000)
      dispatch({ type: 'error', payload: 'Anecdota demasiado corta' })
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: 'create', payload: content })

    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
