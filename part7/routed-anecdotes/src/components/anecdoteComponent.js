import React from "react";
import { useParams } from "react-router-dom";

export const Anecdote = ({anecdotes}) =>{
    const id= useParams().id
    const anecdote= anecdotes.find(anecdote=>anecdote.id===Number(id))
    console.log(anecdote)
    return(
        <div>
            <div>{anecdote.content}</div>
            <div>{anecdote.author}</div>
            <div>{anecdote.info}</div>
            <div>{anecdote.votes}</div>
        </div>
    )
}