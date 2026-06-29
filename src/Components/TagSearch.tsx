import { useContext , useState, type ChangeEvent } from "react"
import { useSearchParams } from "react-router"
import { BookServiceContext } from "../Services/BookServiceContext"
import { useQuery } from "@tanstack/react-query"
import type { Book } from "./Books/Book"
import { AddTagStyle } from "../Styling/AddTagStyle"

interface TagSearchProps{
    listBooks : (newBooks : Book[]) => void
}

export function TagSearch({listBooks} : TagSearchProps){
    const [searchParams, setSearchParams] = useSearchParams()
    var initialTag = ""

    const filters = searchParams.get('tags')
    if (filters){
        initialTag = filters
    }

    const [newTag, setNewTag] = useState('')
    const [tags, setTags] = useState<string[]>(initialTag == "" ? [] : [initialTag])

    const bookService = useContext(BookServiceContext)

    const {data : books, isLoading, error, refetch} = useQuery ({
        queryKey : ['bookdata'],
        queryFn : ({signal}) => bookService.fetchBooksByTags(tags.map(tag => tag.toLowerCase()), signal),
        enabled : false
    })

    if(isLoading) return<div>Loading books&hellip;</div>
    if(error) return <div>{error.message}</div>

    const newTagChanged = (event : ChangeEvent) =>{
        setNewTag((event.target as HTMLInputElement).value)
    }

    const addTag = () =>{
        if(tags.length < 4){
            setTags([...tags, newTag])
        }
    }

    const handleSubmit = async() => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("tags", tags.join(", "))
        setSearchParams(newSearchParams)

        await refetch()
        listBooks(books)
    }
    const handleReset = () =>{
        setTags([])
        history.pushState({}, '/search')
    }
    
    return(
        <AddTagStyle>
            <div className="add-tag">
                <input type="text" onChange={newTagChanged} placeholder="Enter tags"/>
                <button onClick={addTag}>Add</button>
            </div>

            <ul>
                {
                    tags?.map((tag) =>
                        <li>{tag}</li>
                    )
                }
            </ul>
            
            <div className="button-row">
                <button type="button" onClick={handleReset}>Reset</button> <br/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>

        </AddTagStyle>
    )
}