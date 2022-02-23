
export const FilterComponent = ({books, genre, setGenre, immutableBooks}) => {
    const genres = immutableBooks.data.allBooks.map(book=>book.genres)
    const array = Array.prototype.concat(...genres)
    const eachGenre = []
    array.forEach(a=>{
        if(!eachGenre.includes(a)){
            eachGenre.push(a)
        }
    })

    return(
        <div>
            {eachGenre.map(genre=><button key={genre} value={genre} onClick={e=>setGenre(e.target.value)} >{genre}</button>)}
            <button value={null} onClick={e=>setGenre(e.target.value)} >All genres</button>
        </div>
    )
}