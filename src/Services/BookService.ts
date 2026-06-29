

export default {
    fetchBook: async function fetchBook(bookId: string, signal : AbortSignal){
        const response = await fetch(`/books/${bookId}`, {signal})

        if(response.status != 200){
            throw new Error(`Received status ${response.status}: ${response.statusText}`)
        }
        return response.json()
    },

    fetchBooksByTags: async function fetchBooksByTags(tags: string[], signal : AbortSignal){
        const response = await fetch(`/books/filter?tags=${tags.join(", ")}`, {signal})

        if(response.status != 200){
            throw new Error(`Received status ${response.status}: ${response.statusText}`)
        }
        return response.json()
    }
}