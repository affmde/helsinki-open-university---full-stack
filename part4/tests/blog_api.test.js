const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blogs')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the third blog is about randmoness', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'The game'
  )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Football the great',
    author: 'Carlos',
    url: 'foottg.com',
    likes:10,
    user: '62052cfb8a670de888a35414'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogs = await helper.blogsInDb()
  const titles = blogs.map(blog => blog.title)
  expect(titles).toHaveLength(helper.initialBlogs.length+1)
  expect(titles).toContain('Football the great')
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Joel'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog is defined as id', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()

})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'Asdrubal',
    author: 'Otavio',
    url: 'asdrubal.pt',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAdded = await Blog.findOne({ title: 'Asdrubal' })
  expect(blogAdded.likes).toBe(0)

})

test('if no title or url properties, responds with the status code 400 Bad Request', async () => {
  const newBlog = {
    author: 'Otavio',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length)
}, 100000)


test('delete successfully a blog by the id', async () => {
  const response = await helper.blogsInDb()
  const blogToDelete = response[0]
  console.log(blogToDelete)

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length-1)
}, 100000)


test('update blog info from id', async () => {
  const updateBlog = {
    likes:10
  }

  const response = await helper.blogsInDb()
  const blogToUpdate = response[0]
  await api.
    put(`/api/blogs/${blogToUpdate.id}`)
    .send(updateBlog)
    .expect(204)

  const blogs= await helper.blogsInDb()
  const blogUpdated = blogs[0]
  expect(blogUpdated.likes).toBe(updateBlog.likes)
  expect(blogs).toHaveLength(helper.initialBlogs.length)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})