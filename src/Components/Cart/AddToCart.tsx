import type { Book } from "../Books/Book"
import type { CartBook } from "../Books/CartBook"
import {addBook} from '../Redux/CartSlice'
import { useState, type ChangeEvent } from "react"
import { useAppDispatch } from "../Redux/Hooks.tsx"
import { AddToCartStyle } from "../../Styling/AddToCartStyle.tsx"

interface AddToCartProps{
    book : Book
    price : number
}

export function AddToCart({book, price} : AddToCartProps){
    const [bookQuantity, setBookQuantity] = useState(0)
    const dispatch = useAppDispatch()

    const addBookToCart = () =>{
        const newBook : CartBook = {
            book : book,
            price : (price * bookQuantity),
            quantity : bookQuantity
        }
        dispatch(addBook(newBook))
    }
    const handleChange = (event : ChangeEvent)=>{
        setBookQuantity(parseInt((event.target as HTMLInputElement).value))
    }

    return (
        <AddToCartStyle onSubmit={e => e.preventDefault()}>
            <fieldset>
                <legend>Add to Cart:</legend>
                <div className="form-fields">
                    <input type="number" name="quantity" 
                            onChange={handleChange} min="1" inputMode="numeric"/>
                    <button onClick={addBookToCart}>Add</button>
                </div>
            </fieldset>
        </AddToCartStyle >
    )
}