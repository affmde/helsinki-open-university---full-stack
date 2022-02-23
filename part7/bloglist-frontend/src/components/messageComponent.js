import React from 'react'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Alert } from 'react-bootstrap'

export const MessageComponent = () => {

  const message = useSelector(state => state.notification)

  if(!message)return null
  return <Alert id="message-div" variant={message.type === 'success' ? 'success' : 'danger'}>{message.message}</Alert>
}