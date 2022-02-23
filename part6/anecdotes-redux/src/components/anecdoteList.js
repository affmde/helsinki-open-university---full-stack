import React from "react";
import { newVote} from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer";
import { removeFilter } from "../reducers/filterReducer";

export const AnecdoteList = () =>{
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state=>state.filter)
  const array = anecdotes.filter(f=>f.content.toLowerCase().includes(filter.toLowerCase()))
  const orderAnecdotes = array.sort((a, b)=>{
    return b.votes - a.votes
  })


    const vote = (id, content)=>{
        dispatch(newVote(id))
        dispatch(removeFilter())
        dispatch(setNotification(`You liked: ${content}`,5))
      }
    return(
        <div>
            <h2>Anecdotes</h2>
      {orderAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}