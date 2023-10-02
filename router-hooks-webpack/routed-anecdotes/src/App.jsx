import { useState } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'

import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  const message = showMessage ? notification : ''

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const math = useMatch('/anecdote/:id')
  const anecdote = math ? anecdotes.find(a => a.id === Number(math.params.id)) : null

  return (
    <>
    <div>
      <h1>Software anecdotes</h1>
     <Menu />
       {/* <About /> */}

    <Routes>
      <Route path='/' element={<AnecdoteList anecdotes={anecdotes} notification={notification} message={message}/>} />
      <Route path='/create' element={<CreateNew addNew={addNew}/>} />
      <Route path='/anecdote/:id' element={<Anecdote anecdote={anecdote} />} />
      <Route path='/about' element={<About/>} />

    </Routes>

    <br />
      <Footer />

    </div>
    </>
  )
}

export default App
