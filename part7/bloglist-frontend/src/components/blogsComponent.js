import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


export const BlogsComponent = () => {
  const allBlogs = useSelector(state => state.blog)
  const sorted = [...allBlogs]
  sorted.sort((a,b) => {
    return b.likes-a.likes
  })

  const links ={
    textDecoration: 'none'
  }

  return (
    <div>
      <h2>Blogs</h2>
      {sorted.map(blog =>
        <Link style={links} key={blog.id} to={`/blogs/${blog.id}`}><Blog blog={blog} /></Link>
      )}
    </div>
  )
}