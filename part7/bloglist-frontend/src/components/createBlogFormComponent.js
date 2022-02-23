import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { notification } from '../reducers/notificationReducer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'

export const CreateBlogFormComponent = ({ user, blogsFormRef, handleLogout }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    blogsFormRef.current.toggleVisibility()
    const newBlog= {
      title,
      author,
      url,
      user
    }
    try{
      dispatch(createBlog(newBlog))
      dispatch(notification({ type: 'success', message: `New blog "${newBlog.title}" by ${newBlog.author} created successfully! ` }))
    }catch(error){
      dispatch(notification({ type: 'error', message: 'Failed to create a new blog' }))
      handleLogout()
    }

  }

  return(
    <div>
      <h3>Create new Blog</h3>
      <Form id='create-blog-form' onSubmit={handleCreateBlog}>
        <Form.Group className="mb-5">
          <Form.Label>Title</Form.Label>
          <Form.Control size='sm' className="mb-2" id="new-blog-title" type="text" placeholder="title" onChange={e => setTitle(e.target.value)}></Form.Control>
          <Form.Label>Author</Form.Label>
          <Form.Control size='sm' className="mb-2" id="new-blog-author" type="text" placeholder="author" onChange={e => setAuthor(e.target.value)}></Form.Control>
          <Form.Label>URL</Form.Label>
          <Form.Control size='sm' className="mb-2" id="new-blog-url" type="text" placeholder="url" onChange={e => setUrl(e.target.value)}></Form.Control>
          <Button variant="success" id="save-newBlog-btn" type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}