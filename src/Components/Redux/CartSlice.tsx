import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartBook } from "../Books/CartBook"

interface CartState{
    chosenBooks : CartBook[]
}

const initialBookState: CartState = {
    chosenBooks : [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialBookState,
    reducers: {
        addBook: (state, action: PayloadAction<CartBook>)=>{
            state.chosenBooks = [...state.chosenBooks, action.payload]
        },
        clearBooks: () => initialBookState
    }
})

export const {addBook, clearBooks} = cartSlice.actions

export default cartSlice.reducer