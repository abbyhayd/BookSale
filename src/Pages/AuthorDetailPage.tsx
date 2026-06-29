import { useContext} from "react"
import { useParams } from "react-router"
import { BooksList } from "../Components/Books/BooksList"
import { ReviewsList } from "../Components/Reviews/ReviewsList"
import { AuthorServiceContext } from "../Services/AuthorServiceContext"
import {useQuery } from "@tanstack/react-query"

export function AuthorDetailPage(){
    const {authorName} = useParams()

    const authorService = useContext(AuthorServiceContext)

    const {data : author, isLoading : isAuthorLoading, error : authorError} = useQuery({
        queryKey : ["author", authorName],
        queryFn : ({signal}) => authorService.fetchAuthor(authorName!, signal)
    })

    const {data: authorBooks, isLoading: isBooksLoading, error : booksError,} = useQuery ({
        queryKey: ["books", author?.id],
        queryFn: ({signal}) => authorService.fetchAuthorBooksByID(author?.id!, signal),
        enabled : !(author === undefined)
    })

    const {data : authorReviews, isLoading : isReviewsLoading, error : reviewsError} = useQuery({
        queryKey : ["reviews", authorName],
        queryFn : ({signal}) => authorService.fetchAuthorReviews(authorName!, signal)
    })
    
    if(isAuthorLoading) return <div>Loading author&hellip;</div>
    if(isBooksLoading) return <div>Loading books&hellip;</div>
    if(isReviewsLoading) return <div>Loading reviews&hellip;</div>

    if (authorError) return <div>{authorError.message}</div>
    if (booksError) return <div>{booksError.message}</div>
    if(reviewsError) return <div>{reviewsError.message}</div>

    return(
        <main>
            <div>
                <h1>Author detail page</h1>
                <p><b>Name:</b> {author?.name}</p>
                <p><b>Bio:</b> {author?.bio}</p>

                <h2>Reviews of their work</h2>
                <div>
                    <ReviewsList reviews={authorReviews}/>
                </div>
            </div>

            <div>
                <h2>By the Author</h2>
                <BooksList books={authorBooks} withAuthor={false}/>
            </div>

            
        </main>
    )
}