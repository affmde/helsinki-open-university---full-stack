const blogRouters = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouters.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouters.get('/:id', async (req, res) => {
  const id = req.params.id
  const blog= await Blog.findById(id)
  res.json(blog)
})

blogRouters.post('/', async (req, res) => {
  const body = req.body
  const decodedToken= jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try{
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  }catch(err){
    res.status(400).json(err).end()
  }
})

blogRouters.delete('/:id', async (req, res) => {
  const id= req.params.id
  const decodedToken= jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(id)
  const user = await User.findById(decodedToken.id)


  try{
    if(blog.user.toString() === user.id.toString()){
      const response= await Blog.findByIdAndDelete(id)
      res.status(204).json(response).end()
    }else{
      res.status(404).json({ error: 'ID not found', user, blog  })
    }
  }catch(error){
    res.status(400).json({ error: 'ID not found' }).end()
  }
})

blogRouters.put('/:id', async (req, res) => {
  const updatedBlog = {
    likes: req.body.likes || 0
  }
  try{
    const response = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
    if(response){
      res.status(204).json(response)
    }else{
      res.status(400).json('Error to find and delete').end()
    }
  }catch(error){
    res.status(400).end()
  }
})

blogRouters.post('/:id/comments', async (req, res) => {
  const comment ={
    comments: req.body.comments
  }

  console.log('backend comment: ', req)
  const updatedPost = await Blog.findByIdAndUpdate(req.params.id, comment )
  res.json(updatedPost)
})

module.exports = blogRouters