import { useContext, useState} from "react";
import { AuthorServiceContext } from "../Services/AuthorServiceContext";
import { useQuery } from "@tanstack/react-query";
import type { Author } from "./Author/Author";
import type { Book } from "./Books/Book";

interface AuthorSearchProps{
    listBooks : (newBooks : Book[]) => void
}


export function AuthorSearch({listBooks} : AuthorSearchProps){
    const authorService = useContext(AuthorServiceContext)
    const [selectedAuthor, setSelectedAuthor] = useState("")

    const {data : authors, isLoading : isAuthorsLoading, error : authorsError} = useQuery({
        queryKey : ["authors"],
        queryFn: ({signal}) => authorService.fetchAllAuthors(signal)
    })

    const {data : books, isLoading: isBooksLoading, error: booksError, refetch} = useQuery({
        queryKey : [selectedAuthor],    
        queryFn: ({signal}) => authorService.fetchAuthorBooks(authors, selectedAuthor, signal),
        enabled: false
    })

    if(isAuthorsLoading) return <div>Loading authors&hellip;</div>
    if(isBooksLoading) return <div>Loading books&hellip;</div>

    if(booksError) return <div>{booksError.message}</div>
    if(authorsError) return <div>{authorsError.message}</div>

    const handleChange = (event : any) =>{
        setSelectedAuthor(event.target.value)
    }

    const handleSubmit = async () => {
        if(selectedAuthor !== ""){
            await refetch()
            listBooks(books)
        }
    }

    return(
        <section>
            <div>
                <select id="authors" name="authors" value={selectedAuthor} onChange={handleChange}>
                    <option value="" disabled>
                        -- Select option --
                    </option>
                    {
                        authors.map((author: Author) => 
                            <option key={author.name} value={author.name}>
                                {author.name}
                            </option>
                        )
                    }   
                </select>
                <br/> <br/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </section>
        
    )
}