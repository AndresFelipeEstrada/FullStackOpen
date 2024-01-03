import './notification.css'

const Notification = ({ message }) => {
  if (message === null) return

  const successStyle = {
    borderColor: 'green',
    color: 'green',
  };

  const errorStyle = {
    borderColor: 'red',
    color: 'red',
  };
  return (
    <div style={message.type === 'success' ? successStyle : errorStyle} className='message'>
      {message.message}
    </div>
  )
}

export default Notification
