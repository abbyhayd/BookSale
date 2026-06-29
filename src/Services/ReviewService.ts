
export default {
    fetchReviews : async function fetchReviews(bookId : string, signal :AbortSignal){
        const response = await fetch(`/reviews?book=${bookId}`, {signal})

        if(response.status != 200){
            throw new Error(`Received status ${response.status}: ${response.statusText}`)
        }
        return response.json()
    }
}