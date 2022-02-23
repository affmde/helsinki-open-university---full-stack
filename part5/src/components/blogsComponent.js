import React from 'react'
import Blog from './Blog'

export const BlogsComponent = ({ blogs, handleLogout, setBlogs, setMessage, user }) => {

  blogs.sort((a,b) => {
    return b.likes-a.likes
  })
  return (
    <div>
      <h2>blogs</h2>
      <button onClick={handleLogout}>Logout</button>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} setMessage={setMessage} user={user} blogs={blogs} />
      )}
    </div>
  )
}