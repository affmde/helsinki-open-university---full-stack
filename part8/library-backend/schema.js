const {gql} = require('apollo-server')

const typeDefs = gql`

  type Book {
    title: String!
    published: Int
    author: Author!
    genres: [String!]!
    
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    allAuthors: [Author!]!
    me: User!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token{
    value: String!
  }
  
  type Mutation {
    addBook (
      title: String!
      published: Int
      author: String!
      genres: [String!]!
    ) : Book!
    editAuthorAge(
      name: String!
      born: Int!
    ) : Author
    createUser(
      username: String!
      favoriteGenre: String!
    ) : User
    login(
      username: String!
      password: String!
    ) : Token
  }

  type Subscription{
      bookAdded: Book!
  }
`

module.exports = typeDefs