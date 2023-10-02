import { createSlice } from '@reduxjs/toolkit'
import { getAnecdotes, postAnecdote, postVotes } from '../services/anecdotes'

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    getInitialAnecdotes(_state, action) {
      return action.payload
    },
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const { id } = action.payload
      const anecdote = state.find(a => a.id === id)
      const changeVote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changeVote)
    }
  }
})
export const { getInitialAnecdotes, newAnecdote, addVote } = anecdoteReducer.actions

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes()
    dispatch(getInitialAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await postAnecdote(content)
    dispatch(newAnecdote(anecdote))
  }
}
export const votes = (anecdote) => {
  return async (dispatch) => {
    const vote = await postVotes(anecdote)
    dispatch(addVote(vote))
  }
}
export default anecdoteReducer.reducer
