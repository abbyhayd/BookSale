import { useState } from "react"
import { AuthorSearch } from "../Components/AuthorSearch"
import { TagSearch } from "../Components/TagSearch"
import type { Book } from "../Components/Books/Book"
import { BooksList } from "../Components/Books/BooksList"

export function BookSearchPage(){
    const [searchType, setSearchType] = useState('tags')
    const [bookList, setBookList] = useState<Book[]>([])

    const handleChange = (event : any) =>{
        setSearchType(event.target.value)
    }

    const listBooks = (newBooks : Book[]) =>{
        setBookList(newBooks)
    }   

    return(
        <main>
            <div className="book-search">
                <h2>Book Search</h2>

                <p>Search: </p>
                <label>
                    <input type="radio" 
                        value="tags"
                        checked={searchType == 'tags'}
                        onChange={handleChange}/> By Tags
                </label>
                <br />
                <label>
                    <input type="radio" 
                        value="author"
                        checked={searchType == 'author'}
                        onChange={handleChange}/> By Author
                </label>
        
                <br/> <br/> 
            
                {searchType === "author" && <AuthorSearch listBooks={listBooks}/>}
                {searchType === "tags" && <TagSearch listBooks={listBooks}/>}
            </div>
            
            <div>
                
                {bookList?.length > 0 && <BooksList books={bookList} withAuthor={searchType !== "author"}/>}
            </div>


        </main>
    )
}