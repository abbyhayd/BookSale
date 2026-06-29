import type { CartBook } from "../Components/Books/CartBook"

const apiKey = import.meta.env.VITE_API_KEY;


export default{
    fetchPrices: async function fetchPrices(bookIds: string[], signal :AbortSignal){
        try{
            const response = await fetch(
                `https://nriav1zg4d.execute-api.us-west-2.amazonaws.com/v1/prices?ids=${bookIds}`,
                {
                    signal,
                    headers:{
                        'x-api-key': `${apiKey}`,
                    }
                }
            )

            if(!response.ok){
                throw new Error(`Receieved status ${response.status}`)
            }

            return response.json()
        }catch(error){
            if(error instanceof Error){
                console.log(error.message)
            }else{
                console.log(`Unknown error: ${error}`)
            }
        }
    },

    fetchStocks: async function fetchStocks(bookIds: string[], signal :AbortSignal){
        try{
            const response = await fetch(
                `https://nriav1zg4d.execute-api.us-west-2.amazonaws.com/v1/stock?ids=${bookIds}`,
                {
                    signal,
                    headers:{
                        'x-api-key': `${apiKey}`,
                    }
                }
            )
            if(!response.ok){
                throw new Error(`Receieved status ${response.status}: ${response.statusText}`)
            }
            return response.json()

        }catch(error){
            if(error instanceof Error){
                console.log(error.message)
            }else{
                console.log(`Unknown error: ${error}`)
            }
        }
    },

    submitOrder: async function submitOrder(books : CartBook[], signal: AbortSignal){
        const order = {"items": books.map(book => ({bookId: book.book.id.toString(), quantity : book.quantity}))}
        try{
            const response = await fetch(
                'https://nriav1zg4d.execute-api.us-west-2.amazonaws.com/v1/orders',
                {
                    method : 'post',
                    signal,
                    headers : {
                        'Content-Type' : 'application/json',
                        'x-api-key': `${apiKey}`
                    },
                    body : JSON.stringify(order)
                }
            )
            if(!response.ok){
                throw new Error(`Receieved status ${response.status}`)
            }
            return response.json()
        }catch(error){
            if(error instanceof Error){
                console.log(error.message)
            }else{
                console.log(`Unknown error: ${error}`)
            }
        }
    }
}