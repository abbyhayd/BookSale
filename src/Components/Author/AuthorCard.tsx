import { Link } from "react-router";
import type { Author } from "./Author";
import { AuthorCardStyle } from "../../Styling/AuthorCardStyle";

interface AuthorCardProps{
    author: Author
}

export function AuthorCard({author} : AuthorCardProps){
    return(
        <AuthorCardStyle>
            <Link to={`/author/${author.name}`}>
                <h2>{author.name}</h2>
            </Link>
        </AuthorCardStyle>
    )
}