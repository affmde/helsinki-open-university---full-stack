import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useApolloClient, useQuery, useSubscription } from '@apollo/client'
import {LoginComponent} from './components/login'
import { RecommendComponent } from './components/recommendComponent'



export const All_Books = gql`
query AllBooks($genres: String, $author: String) {
  allBooks(genres: $genres, author: $author){
      title
      published
      author{
          name
      }
      genres
  }
}
`
export const Login = gql`
mutation login ($username: String!, $password: String!) {
  login(
    username: $username
    password: $password
  ) {
    value
  }
}
`

export const Book_Added = gql`
  subscription {
    bookAdded {
      title
      published
      author{
          name
      }
      genres
    }
  }
`


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState(null)
  const books = useQuery(All_Books, {variables: {genres: genre}})
  const immutableBooks = useQuery(All_Books)
  const client = useApolloClient()
  useSubscription(Book_Added, {
    onSubscriptionData: ({subscriptionData}) => {
      const addedBook = subscriptionData.data.bookAdded
      alert(`${addedBook.title} added`)

      client.cache.updateQuery({query: All_Books}, ({allBooks})=> {
        return{
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  }) 

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(books.loading){
    return <div>loading...</div>
  }
  

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&(<button onClick={() => setPage('add')}>add book</button>)}
        {token && (<button onClick={()=> setPage('recommend')}>Recommended</button>)}
        {!token ? (<button onClick={() => setPage('login')}>Login</button>) : <button onClick={logout}>Logout</button>}
        
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} books={books.data.allBooks} genre={genre} setGenre={setGenre} immutableBooks={immutableBooks}/>

      <NewBook show={page === 'add'} token={token}/>

      {token && (<RecommendComponent show={page==='recommend'} immutableBooks={immutableBooks}/>)}

      <LoginComponent show={page === "login"}setToken={setToken} token={token}/>
      
    </div>
  )
}

export default App
