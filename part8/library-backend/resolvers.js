const {UserInputError, AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./Models/author')
const Book = require('./Models/book')
const User = require('./Models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = process.env.SECRET


const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount:  async () => Author.collection.countDocuments(),
      allBooks: async (root, args)=> {

        if(args.author && args.genres){
          const author = await Author.findOne({name: args.author})
          const books = await Book.find({
            $and: [
              {author: {$in: author._id}},
              {genres: {$in: args.genres}}
            ],
          }).populate('author')
          return books
        }
        if(args.author){
          const author = await Author.findOne({name: args.author})
          return await Book.find({author: {$in: [author._id]}}).populate("author")
        }
        
        if(args.genres){
          const books = await Book.find({genres: {$in: [args.genres]}}).populate('author')
          return books
        }
        
    
        return Book.find({}).populate('author')
      },
  
      allAuthors: async ()=> Author.find({}),
      
      me: (root, args, context) =>{
        return context.currentUser
      }
    },
    Book:{
      author: async (root) =>{
        const author = await Author.findById(root._id)
        return {
          name: root.author.name,
          born: root.author.born
        }
      }
    },
    Author:{
      bookCount: async (root) =>{
        const array = []
        const books = await Book.find({}).populate('author')
        books.forEach(book =>{
          if(book.author.name=== root.name){
            array.push(book.author)
          }
        })
        return array.length
      }
    },
  
    Mutation:{
      addBook: async (root, args, context) => {
        let newAuthor
        const currentUser = context.currentUser
  
        if(!currentUser){
          throw new AuthenticationError('You must log in')
        }
        let writer = await Author.findOne({name: args.author})
        if(!writer){
          newAuthor = new Author({
            name: args.author,
            born: args.born || null,
            bookCount: 1
          })
        }
  
        const newBook = new Book ({
          ...args, author: !writer ? newAuthor : writer
        })
  
          try{
            !writer && await newAuthor.save()
            await newBook.save()
          }catch(error){
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }

          pubsub.publish('Book_Added', {bookAdded: newBook})
          return newBook
      },
  
      editAuthorAge: async (root, args, context) =>{
  
        const currentUser = context.currentUser
        if(!currentUser){
          throw new AuthenticationError('you must log in first')
        }
        const person = await Author.findOne({name: args.name})
        if(!person) return null
        if(person)person.born = args.born
        try{
          const response = await Author.findByIdAndUpdate(person._id, person)
        }catch(error){
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return person
      },
  
      createUser: async (root, args) =>{
        const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
        return user.save().catch(error =>{
          throw new UserInputError(error.message, {invalidArgs: args})
        })
      },
  
      login: async (root, args) => {
        const user = await User.findOne({username: args.username})
        if(!user || args.password !== 'affm'){
          throw new UserInputError('Wrong username or password')
        }
  
        const userForToken = {
          username: user.username,
          id: user._id
        }
  
        return {value: jwt.sign(userForToken, process.env.SECRET)}
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: ()=>pubsub.asyncIterator(['Book_Added'])
      }
    }
  }

  module.exports = resolvers