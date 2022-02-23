import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux'
import { setNotification} from '../reducers/notificationReducer';


export const AnecdoteForm = () =>{

    const dispatch = useDispatch()
    const addNewAnecdote = async (e)=>{
        e.preventDefault()
        const content= e.target.anecdoteBody.value
        dispatch(addAnecdote(content))
        dispatch(setNotification(`You created a new anecdote: ${content}`,5))
      }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <div><input type="text" name="anecdoteBody" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

