import { useContext } from "react"
import { CartBookList } from "../Books/CartBookList"
import { useAppDispatch, useAppSelector } from "../Redux/Hooks"
import type { RootState } from "../Redux/Store"
import { BookSaleServiceContext } from "../../Services/BookSaleContext"
import { clearBooks } from "../Redux/CartSlice"
import { CartPanelStyle } from "../../Styling/CartPanelStyle"

interface CartPanelProps{
    isCartOpen : boolean
    togglePanel : () => void
}

export function CartPanel({isCartOpen, togglePanel} : CartPanelProps){
    const books = useAppSelector((state : RootState) => state.chosenBooks)
    const dispatch = useAppDispatch()
    const bookSaleService = useContext(BookSaleServiceContext)

    const totalPrice = useAppSelector(
        (state: RootState) => state.chosenBooks.reduce(
            (acc, book) =>  {return acc + book.price }, 0
        )
    )
    const panelClass = isCartOpen ? 'cart-panel open' : 'cart-panel close'

    const checkOut = async () =>{
        const abortController = new AbortController()
        const response = await bookSaleService.submitOrder(books, abortController.signal)
        if(response != null){
            dispatch(clearBooks())
            togglePanel()
        }
    }

    return(
        <CartPanelStyle>
            <div className={panelClass}>
                <button className="closebtn" onClick={togglePanel}>Close</button>
                {books?.length > 0 && <CartBookList books={books}/>}
                <div className="row">
                    <div>Total Price: ${totalPrice.toFixed(2)}</div>
                    <button onClick={checkOut}>Checkout</button>
                </div>
            </div>
        </CartPanelStyle>
    )
}