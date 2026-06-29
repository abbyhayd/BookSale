import { ListStyle } from "../../Styling/ListStyle";
import type { CartBook } from "./CartBook";
import { CartBookCard } from "./CartBookCard";

interface CartBookListProps{
    books : CartBook[]
}

export function CartBookList({books} : CartBookListProps){
    return(
        <ListStyle>
            {
                books.map((book) =>(
                    <CartBookCard cartBook={book}/>
                ))
            }
        </ListStyle>
    )
}