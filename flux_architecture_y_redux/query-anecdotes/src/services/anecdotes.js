import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAllAnecdotes = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const postAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length <= 5) {
    throw new Error('El contenido de la anécdota debe tener más de 5 caracteres')
  }
  const res = await axios.post(baseUrl, newAnecdote)
  return res.data
}

export const updateVotes = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })
  return res.data
}
