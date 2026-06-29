import { useContext} from "react";
import { Link, useParams } from "react-router";
import type { Book } from "../Components/Books/Book";
import {ReviewsList} from "../Components/Reviews/ReviewsList"
import {useQuery} from "@tanstack/react-query";
import { BookServiceContext } from "../Services/BookServiceContext";
import { ReviewServiceContext } from "../Services/ReviewServiceContext";
import { BookSaleServiceContext } from "../Services/BookSaleContext";
import { AddToCart } from "../Components/Cart/AddToCart";
import styled from "styled-components";

const BookDetailPageStyle = styled.div`
display: flex;
justify-content:space-between;
gap: 2rem;
padding: 2rem;
`

export function BookDetailPage(){
    const {bookId} = useParams()
    
    const bookService = useContext(BookServiceContext)
    const reviewService = useContext(ReviewServiceContext)
    const bookSaleService = useContext(BookSaleServiceContext)

    const {data : book, isPending :isBookLoading, error : bookError} = useQuery({
        queryKey : ['book', bookId],
        queryFn: ({signal}) => bookService.fetchBook(bookId!, signal)
    })

    const {data : reviews, isPending : isReviewLoading, error : reviewError} = useQuery ({
        queryKey : ['reviews', bookId],
        queryFn: ({signal}) => reviewService.fetchReviews(bookId!, signal)
    })

    const {data : price, isLoading : isPriceLoading, error: priceError} = useQuery({
        queryKey : [book, "price"],
        queryFn: ({signal}) => bookSaleService.fetchPrices(book.id.toString(), signal),
        enabled : (book !== undefined)  
    })

    if(isPriceLoading) return <div>Loading prices&hellip;</div>
    if(isReviewLoading) return <div>Loading reviews&hellip;</div>
    if(isBookLoading) return <div>Loading books&hellip;</div>

    if(bookError) return <div>{bookError.message}</div>
    if(reviewError) return <div>{reviewError.message}</div>
    if(priceError) return <div>{priceError.message}</div>
    
    return(
        <BookDetailPageStyle>
            <div>
                <BookDetails book={book!} />
                <div>
                    <AddToCart book={book} price={price["prices"][book.id]}/>
                </div>
            </div>
            
            <br/>
            <div>
                <h2>Reviews</h2>
                <ReviewsList reviews={reviews}/>
            </div>
            
        </BookDetailPageStyle>
    )
}

interface BookDetails{
    book : Book
}
                
function BookDetails ({book} : BookDetails){

    return (
        <div>
            <h1>{book?.title}</h1>
            <p><b>Subtitle:</b> {book?.subtitle}</p>
            <p><b>Publication date:</b> {book?.ogPublicationDate}</p>
            <p><b>Author: </b> 
                <Link to={`/author/${book?.primaryAuthor}`}>{book?.primaryAuthor}</Link>
            </p>
            <p>
                <b>Tags: </b> 
                {
                book.tags.map((tag) =>
                    <Link to={`/search?tags=${tag}`}>{tag}, </Link>)
                }
            </p>
            
        </div>
    )
}
