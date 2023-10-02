import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  if (action.type === 'vote') {
    return `Votaste por ${action.payload}`
  }
  if (action.type === 'create') {
    return `Creaste la nota: ${action.payload}`
  }
  if (action.type === 'error') {
    return action.payload
  }
  return state
}

export const NotificationContext = createContext()

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [message, dispatch] = useReducer(notificationReducer, 'Mensaje')

  return (
    <NotificationContext.Provider value={{ message, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}
