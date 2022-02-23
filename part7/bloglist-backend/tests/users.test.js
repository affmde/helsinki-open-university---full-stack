const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt= require('bcrypt')

beforeEach(async () => {
  await User.deleteMany({})

  const password = await bcrypt.hash('gloriosolauro', 10)
  const newUser = {
    name: 'Lauro',
    username: 'lauroSLB',
    password
  }

  const userToSave = new User(newUser)
  await userToSave.save()
})


describe('having one user in the database', () => {
  test('User is not created if name is shorter than 3 letters', async () => {
    const usersAtStart = await helper.usersInDb()

    const userToAdd = {
      username: 'Tu',
      password: 'jfjfjfjfjfjf'
    }

    const result= await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)

    expect(result.body.error).toContain('username and password must have more than 3 characters')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('User is not created if password is shorter than 3 letters', async () => {
    const usersAtStart = await helper.usersInDb()

    const userToAdd = {
      username: 'John',
      password: 'aa'
    }

    const result= await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)

    expect(result.body.error).toContain('username and password must have more than 3 characters')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => mongoose.connection.close())