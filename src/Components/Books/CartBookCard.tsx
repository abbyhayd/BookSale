import { CartBookCardStyle } from "../../Styling/CartBookCardStyle";
import type { CartBook } from "./CartBook";

interface CartBookCardProps{
    cartBook : CartBook
}

export function CartBookCard({cartBook} : CartBookCardProps){
    return(
        <CartBookCardStyle>
            <p>{cartBook.book.title}</p>
            <p>Price: {cartBook.price}</p>
            <p>Quantity: {cartBook.quantity}</p>
        </CartBookCardStyle>
    )
}