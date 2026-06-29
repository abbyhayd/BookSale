import type { Book } from "./Book";

export interface CartBook {
    book: Book,
    price : number,
    quantity : number
}