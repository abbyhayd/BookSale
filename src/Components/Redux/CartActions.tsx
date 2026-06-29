import type { CartBook } from "../Books/CartBook";

export type CartActions =
    | {type :'add_book', addedBook : CartBook}
    | {type: 'clear_books'}


export function addBookToCart(addedBook : CartBook){
    return {type: 'add_book', addedBook}
}
export function clearBooks(){
    return {type: 'clear_books'}
}