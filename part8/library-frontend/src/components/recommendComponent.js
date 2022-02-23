import { gql, useQuery } from "@apollo/client"

const Get_User = gql`
query{
    me{
        username
        favoriteGenre
    }
}
`

export const RecommendComponent =({show, immutableBooks}) => {
    
    
    const user= useQuery(Get_User)

    if(user.loading || !user.data){
        return(
            <div>Loading...</div>
        )
    }
    if(!show){
        return null
    }
    
    const favUserGenre = user.data.me.favoriteGenre
    const recommendedBooks = immutableBooks.data.allBooks.filter(book => book.genres.includes(favUserGenre))

    return(
        <div>{recommendedBooks.map(book=><p key={book.title}>{book.title}</p>)}</div>
    )
}