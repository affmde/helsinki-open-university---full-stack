import React, { useState } from 'react'
import blogsService from '../services/blogs'

export const CreateBlogFormComponent = ({ user, setBlogs, blogs, setMessage, blogsFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      await blogsService.createBlog(newBlog)
      setBlogs(blogs.concat(newBlog))
      setMessage({ type: 'success', message: `New blog "${newBlog.title}" by ${newBlog.author} created successfully! ` })
      setTimeout(() => {
        setMessage(null)
      },5000)
    }catch(error){
      console.log(error)
      setMessage({ type: 'error', message: 'Failed to create a new blog' })
      setTimeout(() => {
        setMessage(null)
      },3000)
    }

  }

  return(
    <div>
      <h3>Create new Blog</h3>
      <form id='create-blog-form' onSubmit={handleCreateBlog}>
        <div>Title <input id="new-blog-title" type="text" placeholder="title" onChange={e => setTitle(e.target.value)}></input></div>
        <div>Author <input id="new-blog-author" type="text" placeholder="author" onChange={e => setAuthor(e.target.value)}></input></div>
        <div>URL <input id="new-blog-url" type="text" placeholder="url" onChange={e => setUrl(e.target.value)}></input></div>
        <div><button id="save-newBlog-btn" type="submit">Create</button></div>
      </form>
    </div>
  )
}