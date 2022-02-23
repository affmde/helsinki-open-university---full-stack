import { useEffect } from 'react'
import { AnecdoteList } from './components/anecdoteList'
import { AnecdoteForm } from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/filterComponent'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(initializeAnecdotes())
  },[dispatch])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App