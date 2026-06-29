import {Router} from 'express'
import * as z from 'zod'
import * as review_model from '../models/reviews_mongodb.js'
import {auth} from '../app.js'

const router = Router()

const reviewSchema = z.object({
    bookID : z.int(),
    rating: z.coerce.number().int().gte(1).lte(5),
    text : z.string(),
})
const ratingSchema = z.coerce.number().int().gte(1).lte(5)
const stringSchema = z.coerce.string()

// - Post a review for a book, consisting of a rating and some text commenting on the book. 
//   A user can only post a review if the book exists in the service from homework 1, the user is logged in,
//   and the user has not already written a review for the book.
// POST /reviews
router.post('/', auth, async (req, res) =>{
    const newReview = req.body
    const result = reviewSchema.safeParse(newReview)
    newReview.user = req.user.username

    if(result){
        const bookExists = await fetch(`http://localhost:3000/books/${newReview.bookID}`)
        const reviewExists = await review_model.checkReviewExists(newReview)

        if(bookExists.status == 400) {
            res.status(400).send("Book doesn't exist")
            return
        }
        if(reviewExists){
            res.status(400).send("Review already exists")
            return
        }
        const bookData = await bookExists.json()

        newReview.bookAuthor = bookData.primaryAuthor
        newReview.comments = []
        const id = await review_model.addReview(newReview)
        res.status(201).send(`${req.baseUrl}/${id}`)

    }else{
        console.log(result.error.issues)
        res.status(400).send("Invalid review format")
    }
})

// - Edit the rating and/or text of an existing review. 
//    A user can only edit a review that they posted.
// PATCH /reviews/reviewID
router.patch('/:reviewID', auth, async (req, res) =>{
    const reviewID = req.params.reviewID
    const updatedRating = req.body.rating
    const updatedText = req.body.text
    const user = req.user.username

    if(reviewID == undefined){
        res.status(400).send("Invalid review")
    }
    if(!await review_model.checkReviewUser(reviewID, user)){
        res.status(400).send("Can only edit reviews user has posted")
    }

    if(updatedRating !== undefined){
        const result = ratingSchema.safeParse(updatedRating)

        if(result){
            await review_model.updateReviewRating(reviewID, updatedRating)
            res.status(200).send("Update successful")
        }
    }
    if(updatedText !== undefined){
        const result = stringSchema.safeParse(updatedText)
        if(result){
            await review_model.updateReviewText(reviewID, updatedText)
            res.status(200).send("Update successful")
        }
    }
    res.status(400).send("Invalid update")
})

// - Post a plain text comment about a review. 
//   A user can only post a comment if the user is logged in.
// POST /reviews/reviewID/comments
router.post('/:reviewID/comments', auth, async (req, res)=>{
    const username = req.user.username
    const reviewID = req.params.reviewID
    const commentText = req.body
    const result = stringSchema.safeParse(commentText)

    if(reviewID == undefined){
        res.status(400).send("Invalid review")
    }

    if(result){
        const commentID = await review_model.createComment(reviewID, commentText, username)
        res.status(200).send(`${req.baseUrl}/${reviewID}/comments/${commentID}`)
    }else{
        res.status(400).send("Invalid comment text")
    }
})

// - Delete a comment. A user can only delete a comment they made.
// DELETE /reviews/reviewID/comments/commentID
router.delete("/:reviewID/comments/:commentID", auth, async (req, res)=>{
    const reviewID = req.params.reviewID
    const commentID = req.params.commentID
    const username = req.user.username

    if(reviewID == undefined || commentID == undefined){
        res.status(400).send("Invalid input")
    }

    const result = await review_model.deleteComment(reviewID, commentID, username)

    if(result){
        res.status(200).send("Deleted successfully")
    }else{
        res.status(400).send("Can only delete comments made by user")
    }
})

// - List all of the reviews for a specific book. 
//   Each entry in the list should contain the rating and 
//   text of the review as well as the username of the user who posted the review. 
//   The user does not need to be logged in to do this.
// GET /reviews?book=id

// - List all of the reviews for a specific author. 
//    This should return the same information as the previous 
//    endpoint except for all the books written by the author.
// GET /reviews?author=name

router.get('/', async (req, res)=>{
    //Spaces in author name should be replaced by +
    const authorName = req.query.author
    const bookID = parseInt(req.query.book)
    let results = []

    if(authorName !== undefined && Number.isNaN(bookID)){
        results = await review_model.getReviewsByAuthor(authorName.split("+").toString())
    }else if(bookID !== undefined && authorName === undefined){
        results = await review_model.getReviewsByBook(bookID)
    }else{
        res.status(400).send("Invalid input")
    }
    res.status(200).send(results)
})


// - List all of the comments for a specific review. The user does not need to be logged in to do this.
// GET /reviews/reviewID/comments
router.get('/:reviewID/comments', async (req, res)=>{
    const reviewID = req.params.reviewID
    if(reviewID == undefined){
        res.status(400).send("Invalid review")
    }
    const results = await review_model.getCommentsForReview(reviewID)
    res.status(200).send(results)
})

export default router