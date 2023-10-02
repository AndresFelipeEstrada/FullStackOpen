import { useContext } from 'react'
import { NotificationContext } from '../context/Notification'

export const useAnecdotes = () => {
  const notify = useContext(NotificationContext)
  return notify
}
