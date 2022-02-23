import { FilterComponent } from "./filter"

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={Math.floor(Math.random()*10000000000)}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <FilterComponent books={books} genre={props.genre} setGenre={props.setGenre} immutableBooks={props.immutableBooks}/>
    </div>
  )
}

export default Books
