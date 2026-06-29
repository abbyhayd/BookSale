import type { Author } from "../Components/Author/Author"

export default {
    fetchAuthor : async function fetchAuthor (name : string, signal : AbortSignal){
        const response = await fetch(`/authors/${name}`, {signal})

        if(response.status != 200){
            throw new Error(`Received status ${response.status}: ${response.statusText}`)
        }
        return response.json()
    },
    
    fetchAllAuthors : async function fetchAllAuthors (signal : AbortSignal){
        const response = await fetch(`/authors`, {signal})

        if(response.status != 200){
            throw new Error(`Received status ${response.status}: ${response.statusText}`)
        }
        return response.json()
    },

    fetchAuthorBooks : async function fetchAuthorBooks(authors: Author[], name : string, signal :AbortSignal){
        const id = authors.findIndex(author => author.name == name)
        const response = await fetch(`/authors/${id}/books`, {signal})

        if(response.status != 200){
            throw new Error(`Received status ${response.status}: ${response.statusText}`)
        }
        return response.json()
    },

    fetchAuthorBooksByID : async function fetchAuthorBooksByID(id : string, signal :AbortSignal){
        const response = await fetch(`/authors/${id}/books`, {signal})

        if(response.status != 200){
            throw new Error(`Received status ${response.status}: ${response.statusText}`)
        }
        return response.json()
    },

    fetchAuthorReviews : async function fetchAuthorReviews(name: string, signal : AbortSignal){
        const response = await fetch(`/reviews?author=${name}`, {signal})

        if(response.status != 200){
            throw new Error(`Received status ${response.status}: ${response.statusText}`)
        }
        return response.json()
    }
}