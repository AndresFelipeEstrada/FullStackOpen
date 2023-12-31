import { test, expect, describe } from 'vitest'
import notesReducer from './noteReducer'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'notes/createNote',
      payload: 'the app state is in redux store'
    }

    const newState = notesReducer(state, action)
    expect(newState).toHaveLength(1)
    expect(newState.map(s => s.content)).toContainEqual(action.payload)
  })

  test('return new state with action TOGGLE_IMPORTANCE', () => {
    const state = [{
      content: 'the app state is in redux store',
      important: true,
      id: 1
    },
    {
      content: 'state changes are made with actions',
      important: false,
      id: 2
    }]
    const action = {
      type: 'notes/toggleImportanceOf',
      payload: 2
    }
    const newState = notesReducer(state, action)
    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      important: true,
      id: 2
    })
  })
})
