import { useAnecdotes } from '../hooks/useAnecdotes'

const Notification = () => {
  const { message } = useAnecdotes()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  //  if (true) return null

  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  )
}

export default Notification
