const Blog = require('../models/blogs')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'The ball',
    author: 'Joao',
    url: 'kvekekee.com',
    likes: 4
  },
  {
    title: 'The game',
    author: 'Arthur',
    url: 'thegame.com',
    likes: 8
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author:'Rosa', url: 'myblog.com', likes: 8 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}