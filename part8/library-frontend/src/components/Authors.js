import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'


export const All_Authors = gql`
query{
    allAuthors{
        name,
        born,
        bookCount
    }
}`

const Set_Author_Age = gql`
mutation setAuthorAge($name: String! $born: Int!){
  editAuthorAge(
    name: $name
    born: $born
  ) {
    name,
    born
    bookCount
  }
}
`

const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authors= useQuery(All_Authors)
  const [setNewAge] = useMutation(Set_Author_Age, {
    refetchQueries: [{query: All_Authors}]
  })
  

  const handleAgeChange = (e) => {
    e.preventDefault()
    const ageParsed = parseInt(born)
    setNewAge({variables: {name: name, born: ageParsed}})
    document.getElementById('editAgeForm').reset()
    setName('')
    setBorn('')
  }

 
  if (!props.show) {
    return null
  }

  if(authors.loading){
    return <div>loading...</div>
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token &&(<div>
        <h4>Change author age</h4>
        <form onSubmit={handleAgeChange} id="editAgeForm">
          <div>
            <select onChange={(e)=>setName(e.target.value)}>
              <option value="">--Choose one--</option>
              {authors.data.allAuthors.map(author=><option key={author.name} value={author.name}>{author.name}</option>)}
            </select>
          </div>
          <div><input type="number" onChange={e=>setBorn(e.target.value)}/></div>
          <button type="submit">Save</button>
        </form>
        
      </div>)}
    </div>
  )
}

export default Authors
