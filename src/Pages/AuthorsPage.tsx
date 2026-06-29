import { useContext} from "react"
import { AuthorServiceContext } from "../Services/AuthorServiceContext"
import {useQuery } from "@tanstack/react-query"
import { AuthorsList } from "../Components/Author/AuthorsList"


export function AuthorsPage(){

    const authorService = useContext(AuthorServiceContext)

    const {data : allAuthors, isLoading, error} = useQuery({
        queryKey : ["allAuthors"],
        queryFn : ({signal}) => authorService.fetchAllAuthors(signal)
    })
    if(isLoading) return <div>Loading authors&hellip;</div>
    if(error)return <div>{error.message}</div>

    return (
        <main>
            <h1>List of All Authors</h1>
            <div>
                <AuthorsList authors={allAuthors}/>
            </div>
        </main>
    )
}