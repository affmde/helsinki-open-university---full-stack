const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouters = require('./controllers/blog')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
require('express-async-errors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => logger.info('Connected to Mongo database'))
  .catch(err => logger.error('Error connecting to database: ', err.message))


//Middlewares
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
//Routers
app.use('/api/blogs', blogRouters)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/tests')
  app.use('/api/testing', testingRouter)
}
//Custom middlewares
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
app.use(middleware.requestLogger)


module.exports = app