import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1
  }
  if (action.type === 'DECREMENT') {
    return state - 1
  } else if (action.type === 'ZERO') {
    return 0
  }

  return state
}

export const store = createStore(counterReducer)
