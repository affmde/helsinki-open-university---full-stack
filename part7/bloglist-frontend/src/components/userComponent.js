import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ListGroup } from 'react-bootstrap'

export const User = () => {

  const id = useParams().id
  const users= useSelector(state => state.users)
  const user= users.find(u => u.id === String(id))

  if(!user)return null

  return(
    <div>
      <h3>{user.name}</h3>
      <h5>Added blogs</h5>
      <ListGroup as='ul' variant="flush">
        {user.blogs.map(blog => <ListGroup.Item key={blog.id} as="li" variant="light" >{blog.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}