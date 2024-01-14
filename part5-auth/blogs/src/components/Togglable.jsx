import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={{ display: visible ? 'none' : '' }}>
        <button onClick={toggleVisibility}>{props.label}</button>
      </div>

      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}

Togglable.prototypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Togglable
