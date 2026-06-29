import type { Review } from "./Review"
import {ReviewCardStyle} from '../../Styling/ReviewCardStyle'

interface ReviewCardProps{
    review : Review
}

export function ReviewCard({review} : ReviewCardProps){
    return (
        <ReviewCardStyle>
            <label>
                <h4>User: {review.user}</h4>
                <p>Rating: {review.rating}</p>
                <p>{review.text}</p>
            </label>
        </ReviewCardStyle>
    )
}