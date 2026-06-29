const books = []

function getNextID(){
    if(books.length === 0) return books.length
    if(books.at(-1).id >= books.length){
        return books.at(-1).id + 1
    }else{
        return books.length
    }
}

export function getBooks(){
    return books
}

export function getBook(id){
    const bookIndex = books.findIndex((book) => book.id === id)
    return books[bookIndex]
}

export function getBooksByFilter(tags){
    console.log(tags)
    return books.filter((book) =>{
        return book.tags.some(tag => tags.includes(tag.toLowerCase()))
    })
}

export function getBooksByAuthor(name){
    return books.filter((book) => book.primaryAuthor === name)
}

export function checkBookExists(id){
    return (id >= 0 && id < books.length)
}

export function checkBookEditionExists(id, editionToCheck){
    const bookIndex = books.findIndex((book) => book.id === id)
    return books[bookIndex].editions.some(edition => edition.editionNumber === editionToCheck)
}

export function createBook(newBook){
    newBook.id = getNextID()
    books.push(newBook)
    return newBook.id
}

export function removeBook(id){
    const bookIndex = books.findIndex((book) => book.id === id)
    books.splice(bookIndex, 1)
}

export function removeEdition(id, editionToDelete){
    const bookIndex = books.findIndex((book) => book.id === id)
    const editionIndex = books[bookIndex].editions.findIndex(
        (edition) => edition.editionNumber === editionToDelete)
    
    books[bookIndex].editions.splice(editionIndex, 1)
}

export function addEdition(id, newEdition){
    const bookIndex = books.findIndex((book) => book.id === id)
    books[bookIndex].editions.push(newEdition)
    return bookIndex
}

export function getBookEditions(id){
    const bookIndex = books.findIndex((book) => book.id === id)
    return books[bookIndex].editions
}

export function updateBook(id, property, newValue){
    const bookIndex = books.findIndex((book) => book.id === id)
    books[bookIndex][property] = newValue
}