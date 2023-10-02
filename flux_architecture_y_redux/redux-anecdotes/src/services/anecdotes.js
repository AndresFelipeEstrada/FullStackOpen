import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export const postAnecdote = async ({ content, votes }) => {
  const { data } = await axios.post(baseUrl, {
    content: content,
    votes: votes
  })
  return data
}

export const postVotes = async ({ id, votes }) => {
  const { data } = await axios.patch(`${baseUrl}/${id}`, {
    votes: votes + 1
  })
  return data
}
