import {Router} from 'express'
import * as books from '../repositories/booksRepository.js'
import * as authors from '../repositories/authorRepository.js'
import * as z from 'zod'

const router = Router()

const stringSchema = z.coerce.string()

const Author = z.strictObject({
    name : z.string(),
    bio : z.string(),
    birthDate : z.string(),
    primaryGenre : z.string()
})

//GET - List all authors
router.get('/', (req, res) =>{
    res.status(200).send(authors.getAuthors())
})

//GET - Get specific author
router.get('/:name', (req, res) =>{
    const authorName = req.params.name

    if(authorName && authors.checkAuthorExists(authorName)){
        res.status(200).send(authors.getAuthorByName(authorName))
    }else{
        res.status(400).end('Invalid author')
    }
})

//GET - List all books by a specific author id
router.get('/:id/books', (req, res)=>{
    const authorID = parseInt(req.params.id)
    if(authorID !== undefined && authors.checkExists(authorID)){
        const authorName = authors.getName(authorID)
        res.status(200).send(books.getBooksByAuthor(authorName))
    }else{
        res.status(400).end('Invalid author ID')
    }
})

//POST - Add an author
router.post('/', (req, res) =>{
    const newAuthor = req.body
    const result = Author.safeParse(newAuthor)

    if(result.success){
        const authorID = authors.createAuthor(newAuthor)
        res.status(200).send(authorID)
    }else{
        res.status(400).end('Invalid type')
    }
})

//PATCH - Update a specific author's bio
router.patch('/:id', (req, res) => {
    const authorID = parseInt(req.params.id)
    const updatedBio = stringSchema.parse(req.body)

    if(authors.checkExists(authorID)){
        authors.getAuthor(authorID).bio = updatedBio
        res.status(200).end()
    }else{
        res.status(404).send('Author not found')
    }
})

export default router
