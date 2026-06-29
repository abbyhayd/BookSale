import { MongoClient, ObjectId} from 'mongodb'

const url = 'mongodb://localhost:27017'
let client

async function getReviews(){
  if(!client){
    client = new MongoClient(url)
    await client.connect()
  }
  return client.db('HW2').collection('reviews')
}

export async function addReview(newReview){
    const reviews = await getReviews()
    const response = await reviews.insertOne(newReview)
    return response.insertedId.toString()
}

export async function checkReviewExists(review){
    const reviews = await getReviews()
    const result = await reviews.findOne({
            bookID : review.bookID, 
            user : review.user})
    return result
}

export async function checkReviewUser(reviewID, username){
    const reviews = await getReviews()
    const result = await reviews.findOne({
        "_id" : new ObjectId(reviewID)
    })
    return result.user == username
}

export async function updateReviewRating(reviewID, updated){
    const reviews = await getReviews()
    const result = await reviews.updateOne(
        {"_id" : {$eq : new ObjectId(reviewID)} },
        {"$set": {"rating" : updated}}
    )
    return result
}

export async function updateReviewText(reviewID, updated){
    const reviews = await getReviews()
    const result = await reviews.updateOne(
        {"_id" : {$eq : new ObjectId(reviewID)} },
        {"$set": {"text" : updated}}
    )
    return result
}

export async function createComment(reviewID, commentText, username){
    const reviews = await getReviews()
    const newID = new ObjectId()

    const newComment = {
        _id : newID,
        text : commentText,
        user : username
    }

    const result = await reviews.updateOne(
        {"_id" : new ObjectId(reviewID)},
        {"$push" : {"comments" : newComment}}
    )
    return newID
}

export async function deleteComment(reviewID, commentID, username) {
    const reviews = await getReviews()
    const result = await reviews.updateOne(
        {"_id" : new ObjectId(reviewID)},
        {"$pull" : {
            "comments" : {
                "_id" : new ObjectId(commentID),
                "user" : username
            }
        }}
    )
    return result.modifiedCount == 1
}

export async function getReviewsByAuthor(authorName){
    const reviews = await getReviews()
    const cursor =  reviews.find({"bookAuthor" : authorName})
                .project({rating: 1, text: 1, user: 1, _id: 0})
    return cursor.toArray()
}

export async function getReviewsByBook(bookID){
    const reviews = await getReviews()
    const cursor =  reviews.find({"bookID" : bookID})
                .project({rating: 1, text: 1, user: 1, _id: 0})
    return cursor.toArray()
}

export async function getCommentsForReview(reviewID){
    const reviews = await getReviews()
    const cursor =  reviews.find({"_id" : new ObjectId(reviewID)})
                .project({comments: 1, _id: 0})
    return cursor.toArray()
}