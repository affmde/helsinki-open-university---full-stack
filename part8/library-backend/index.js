const { ApolloServer } = require('apollo-server-express')
const {ApolloServerPluginDrainHttpServer} = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')

const mongoose = require('mongoose')

const User = require('./Models/user')
const jwt = require('jsonwebtoken')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const {execute, subscribe} = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

require('dotenv').config()


const MongoDB_URI = process.env.MongoDB_URI
console.log('connecting to ', MongoDB_URI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

mongoose.connect(MongoDB_URI).then(res=>{
  console.log('Connected to mongoDB')
}).catch(error => {
  console.log(error)
})


const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({typeDefs, resolvers})

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe
    },
    {
      server: httpServer,
      path: '',
    }
  )

  const server = new ApolloServer({
    schema,
    context: async ({req}) => {
      const auth = req ? req.headers.authorization : null
      if(auth && auth.toLowerCase().startsWith('bearer')){
        const decodenToken = jwt.verify(
          auth.substring(7), process.env.SECRET
        )
  
        const currentUser = await User.findById(decodenToken.id).populate('favoriteGenre')
        return{currentUser}
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({httpServer}),
    {
      async serverWillStart() {
        return {
          async drainServer(){
            SubscriptionServer.close()
          },
        }
      },
    },
    ],
  })
  await server.start()

  server.applyMiddleware({
    app,
    path: '/'
  })


  const PORT = 4000
  httpServer.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
  })
}

start()
