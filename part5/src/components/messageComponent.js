import React from 'react'

export const MessageComponent = ({ message }) => {

  const success= {
    border: '3px solid darkgreen',
    color: 'green',
    padding: '10px 20px',
    backgroundColor: 'lightgray',
    width: '40%'
  }

  const error={
    border: '3px solid darkred',
    color: 'red',
    padding: '10px 20px',
    backgroundColor: 'lightgray',
    width: '40%'
  }

  if(!message)return null
  return <p id="message-div" style={message.type === 'success' ? success : error}>{message.message}</p>
}