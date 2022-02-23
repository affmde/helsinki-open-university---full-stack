import Axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () =>{
    const response = await Axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) =>{
    const object = {content, votes: 0}
    const response = await Axios.post(baseUrl, object)
    return response.data
}

const vote = async (id)=>{
    const anecdoteToUpdate = await Axios.get(`${baseUrl}/${id}`)
    const update= anecdoteToUpdate.data
    const response  =await Axios.put(`${baseUrl}/${id}`, {...update, votes: update.votes+1})
    return response.data
}

export default {getAll, createAnecdote, vote}