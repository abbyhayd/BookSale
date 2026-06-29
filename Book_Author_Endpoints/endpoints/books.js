import {Router} from 'express'
import * as books from '../repositories/booksRepository.js'
import * as authors from '../repositories/authorRepository.js'
import * as z from 'zod'

const router = Router()
const stringSchema = z.coerce.string()

const bookEdition = z.object({
        editionNumber : z.number(),
        edPublicationDate : z.string()
})

const Book = z.strictObject({
    title : z.string(),
    subtitle : z.string().optional(),
    ogPublicationDate : z.string(),
    tags : z.array(z.string()),  
    primaryAuthor : z.string(),
    editions : z.array(bookEdition)
})

//GET - List all books
router.get('/', (req, res)=>{
    res.status(200).send(books.getBooks())
})

//GET - List all books that match a given list of tags
router.get('/filter', (req, res)=> {
    const filters = req.query.tags

    if(req.query.tags !== undefined){
        const cleaned = filters.replaceAll('%20', ' ').replaceAll('+', ' ').split(', ')
        console.log(cleaned)
        const result = books.getBooksByFilter(cleaned)
        res.status(200).send(result)
    }else{
        res.status(400).end('Tags not specified')
    }
})

//GET - Get the details of a specific book
router.get('/:id', (req, res)=>{
    const bookID = parseInt(req.params.id)
    if(bookID !== undefined && books.checkBookExists(bookID)){
        res.status(200).send(books.getBook(bookID))
    }else{
        res.status(400).end('Invalid book ID')
    }
})

//GET - List editions of a specific book
router.get('/:id/editions', (req, res) =>{
    const bookID = parseInt(req.params.id)

    if(bookID !== undefined && books.checkBookExists(bookID)){
        const result = books.getBookEditions(bookID)
        res.status(200).send(result)
    }else{
        res.status(400).end('Invalid book ID')
    }
})

//POST - Add a book
router.post('/', (req, res)=>{
    const newBook = req.body
    const result = Book.safeParse(newBook)

    if(result.success){

        if(authors.checkAuthorExists(newBook.primaryAuthor)){
            const newBookID = books.createBook(newBook)
            res.status(200).send(`/books/${newBookID}`)

        }else{
            res.status(404).end('Author not in collection')
        }

    }else{
        res.status(400).end('Invalid type')
    }

})

//POST - Add an edition of a specific book
router.post('/:id', (req, res) => {
    const bookID = parseInt(req.params.id)
    const newEdition = JSON.parse(req.body)
    const result = bookEdition.safeParse(newEdition)

    if(result && bookID !== undefined && books.checkBookExists(bookID)){
        books.addEdition(bookID, newEdition)
        res.status(200).send(`/books/${bookID}`)
    }else{
        res.status(400).end('Invalid book ID')
    }
})

//PATCH - Update any of the attributes of a specific book 
router.patch('/:id', (req, res) => {
    const bookID = parseInt(req.params.id)
    const updatedAttribute = req.body
    const result = stringSchema.safeParse(updatedAttribute)

    if(bookID !== undefined && result){
        const property = Object.keys(updatedAttribute)
        const newValue = updatedAttribute[property]
        books.updateBook(bookID, property, newValue)
        res.status(200).end('Updated successfully')
    }else{
        res.status(400).end('Invalid entry')
    }
})

//DELETE - Remove a book (and by extension all its editions)
router.delete('/:id', (req,res)=>{
    const bookID = parseInt(req.params.id)
    if(bookID !== undefined && books.checkBookExists(bookID)){
        books.removeBook(bookID)
        res.status(200).end('Deleted successfully')
    }else{
        res.status(404).end('Book not in collection')
    }
})

//DELETE Remove an edition of a specific book
router.delete('/:id/:editionNumber', (req,res)=>{
    const bookID = parseInt(req.params.id)
    const editionToDelete = parseInt(req.params.editionNumber)

    if(bookID !== undefined && books.checkBookExists(bookID)){
        if(books.checkBookEditionExists(bookID, editionToDelete)){
            books.removeEdition(bookID, editionToDelete)
            res.status(200).end("Deleted successfully")
        }else{
            res.status(404).end('Book edition not in collection')
        }
    }else{
        res.status(404).end('Book not in collection')
    }
})

export default router