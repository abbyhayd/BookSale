import { BookCard } from "./BookCard";
import type { Book } from "./Book";
import { ListStyle } from "../../Styling/ListStyle";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { BookSaleServiceContext } from "../../Services/BookSaleContext";

interface BooksListProps{
    books : Book[]
    withAuthor : boolean
}

export function BooksList({books, withAuthor} : BooksListProps){
    const bookSaleService = useContext(BookSaleServiceContext)

    const {data : prices, isLoading : isPricesLoading, error: pricesError} = useQuery({
        queryKey : [books, "prices"],
        queryFn: ({signal}) => bookSaleService.fetchPrices(books.map((book: { id: number; }) => book.id.toString()), signal),
        enabled : (books !== undefined && books.length !== 0)
    })

    const {data: stocks, isLoading: isStockLoading, error: stocksError} = useQuery({
        queryKey : [books, "stocks"],
        queryFn: ({signal}) => bookSaleService.fetchStocks(books.map((book: { id: number; }) => book.id.toString()), signal),
        enabled : (books !== undefined && books.length !== 0)
    })

    if(isPricesLoading) return <div>Loading prices&hellip;</div>
    if(isStockLoading) return <div>Loading stocks&hellip;</div>

    if(pricesError) return <div>{pricesError.message}</div>
    if(stocksError) return <div>{stocksError.message}</div>

    return (
        <ListStyle>
        {
            books.map((book) => (
                <BookCard book={book} 
                        price={prices["prices"][book.id]} 
                        stock={stocks["stock"][book.id]}
                        withAuthor={withAuthor}/>
            ))
        }   
        </ListStyle>
    )
}