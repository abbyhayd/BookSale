import { Link } from "react-router"
import type { Book } from "./Book"
import { BookCardStyle } from "../../Styling/BookCardStyle"
import { AddToCart } from "../Cart/AddToCart"

interface BookCardProps{
    book : Book
    price : number
    stock : number
    withAuthor : boolean
}

export function BookCard({book, price, stock, withAuthor} : BookCardProps){
    const string_tags = book.tags.join(", ")
    return(
        <BookCardStyle>
            <div>
                
                <Link to={`/book/${book.id}`}>
                    <h4>{book.title}</h4>
                </Link>
                <p><b>Subtitle:</b> {book.subtitle}</p>
                <p><b>Publication date:</b> {book.ogPublicationDate}</p>
                {withAuthor && <p><b>Author:</b> {book.primaryAuthor}</p>}
                <p><b>Tags:</b> {string_tags}</p>
            </div>
            <div>
                <p><b>Price:</b> ${price}</p>
                <p><b>Stock:</b> {stock}</p>
            </div>
            <AddToCart book={book} price={price}/>
        </BookCardStyle>
    )
}