import { useEffect } from 'react'
import './App.css'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <h3>New Notes</h3>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
