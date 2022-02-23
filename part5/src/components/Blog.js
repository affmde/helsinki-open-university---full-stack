import React, { useState } from 'react'
import blogsService from '../services/blogs'


const Blog = ({ blog, setMessage, user, setBlogs, blogs }) => {

  const [showInfo, setShowInfo] = useState(false)
  const toggleDisplay = { display: showInfo ? '' : 'none' }

  const style = {
    border: '1px solid black',
    padding: '5px 10px',
    width: '50%',
    marginBottom: '3px'
  }

  const buttonStyle = {
    height: '0.8 rem',
    backgroundColor: 'white',
    border: '0.5px solid grey',
    borderRadius: '5px',
    cursor: 'pointer'
  }

  const deleteButton = {
    border: '0.5px solid black',
    backgroundColor: 'red',
    padding: '3px 5px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const addLike = async (id) => {

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user
    }
    try{
      blogsService.updateBlog(id, updatedBlog)
      setMessage({ type: 'success', message: 'You liked the blog' })
      setTimeout(() => {
        setMessage(null)
      },1000)

    }catch(error){
      //console.log(error)
      setMessage({ type: 'error', message: 'Something wrong happened. You could not like the blog' })
      setTimeout(() => {
        setMessage(null)
      },3000)
    }
  }

  const deleteBlog = async (id) => {
    try{
      const deleteConfirm = window.confirm('Are you sure you want to delete this blog?')
      if(deleteConfirm){
        await blogsService.deleteBlog(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setMessage({ type: 'success', message: 'Blog deleted successfully' })
        setTimeout(() => {
          setMessage(null)
        },3000)
        setShowInfo(false)
      }
    }catch(error){
      console.log(error)
      setMessage({ type: 'error', message: 'Not possible to delete the blog right now' })
      setTimeout(() => {
        setMessage(null)
      },3000)
    }
  }

  return (
    <div style={style}>
      <table>
        <tbody>
          <tr>
            <td className='blog-title'><strong>{blog.title}</strong> - </td>
            <td className='blog-author'>{blog.author}</td>
            <td><button onClick={toggleInfo} style={buttonStyle} id="hide-show">{showInfo ? 'Hide' : 'Show'}</button></td>
          </tr>
        </tbody>
      </table>


      <div style={toggleDisplay} className='hidden-div'>
        {blog.url} <br />
        {blog.likes} <button style={buttonStyle} onClick={() => addLike(blog.id)} id="likeBtn">Like</button> <br />
        <br />
        {blog.user.username===user.username && <button id="remove-blog-button" onClick={() => deleteBlog(blog.id)} style={deleteButton} >Delete</button>}
      </div>
    </div>
  )

}

export default Blog