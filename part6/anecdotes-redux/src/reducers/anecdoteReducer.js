import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    addVote(state, action){
      return state.map(anecdote=> anecdote.id !== action.payload.id ? anecdote : {...anecdote, votes: anecdote.votes+1})
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const {addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = ()=>{
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content)=>{
  return async dispatch =>{
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const newVote = (id) =>{
  return async dispatch =>{
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch(addVote(votedAnecdote))
  }
}



export default anecdoteSlice.reducer;
