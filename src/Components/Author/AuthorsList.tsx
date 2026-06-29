import { ListStyle } from "../../Styling/ListStyle"
import type {Author} from "./Author"
import { AuthorCard } from "./AuthorCard"

interface AuthorListProps{
    authors : Author[]
}

export function AuthorsList({authors} : AuthorListProps){
        return(
            <ListStyle>
                {
                    authors.map((author) => (
                        <AuthorCard author={author} />
                    ))
                }
            </ListStyle>
        )
}