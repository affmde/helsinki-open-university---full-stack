import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createComment, voteBlog } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'
import { delBlog } from '../reducers/blogReducer'
import { ListGroup, Button, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export const BlogDisplay = () => {

  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blog)
  const blog = blogs.find(b => b.id === id)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const addLike = async (id) => {

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user
    }
    try{
      dispatch(voteBlog(id, updatedBlog))
      dispatch(notification({ type: 'success', message: 'You liked the blog' }))

    }catch(error){
      //console.log(error)
      dispatch(notification({ type: 'error', message: 'Something wrong happened. You could not like the blog' }))
    }
  }

  const deleteBlog = async (id) => {
    try{
      const deleteConfirm = window.confirm('Are you sure you want to delete this blog?')
      if(deleteConfirm){
        dispatch(delBlog(id))
        dispatch(notification({ type: 'success', message: 'Blog deleted successfully' }))
        navigate('/')
      }
    }catch(error){
      console.log(error)
      dispatch(notification({ type: 'error', message: 'Not possible to delete the blog right now' }))
    }
  }

  const handleComment = (id) => {
    dispatch(createComment(id, { ...blog, comments: [...blog.comments, comment] }))
    setComment('')
    dispatch(notification({ type: 'success', message: 'Comment added' }))
    document.getElementById('comment').value = ''
  }
  const buttonStyle = {
    height: '0.8 rem',
    backgroundColor: 'white',
    border: '0.5px solid grey',
    borderRadius: '5px',
    cursor: 'pointer'
  }

  const container = {
    padding: '20px',
    marginBottom: '30px'
  }

  const commentStyle = {
    margin: '30px 0px',
  }


  if(!blog)return null

  return (
    <Container fluid="xxl" style={container}>
      <Row className="mb-2">
        <Col><h2>{blog.title}</h2></Col>
      </Row>
      <Row className="mb-2">
        <Col><a href={blog.url}>{blog.url}</a></Col>
      </Row>
      <Row className="mb-2">
        <Col>{blog.likes} <Button style={buttonStyle} onClick={() => addLike(blog.id)} id="likeBtn" variant="link">Like</Button></Col>
      </Row>
      <Row className="mb-2">
        <Col>added by <strong>{blog.author}</strong></Col>
      </Row>
      {blog.user.username===user.username && <Button id="remove-blog-button"
        onClick={() => deleteBlog(blog.id)}
        variant="outline-danger">Delete</Button>}
      <div>
        <Form style={commentStyle}>
          <Form.Group id="commentForm">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3} type="text" onChange={(e) => setComment(e.target.value)} id="comment"></Form.Control>
          </Form.Group>
          <Button onClick={() => handleComment(blog.id)} variant="success">Send</Button>
        </Form>
        <ListGroup as="ul" variant='flush' >
          {blog.comments.map(comment => <ListGroup.Item as="li" variant="light" key={Math.floor(Math.random()*1000000)}>{comment}</ListGroup.Item>)}
        </ListGroup>
      </div>
    </Container>
  )
}