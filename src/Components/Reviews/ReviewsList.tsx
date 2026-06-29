import { ReviewCard } from "./ReviewCard"
import type { Review } from "./Review"
import { ListStyle } from "../../Styling/ListStyle"

interface ReviewsListProps{
    reviews : Review[]
}

export function ReviewsList({reviews}: ReviewsListProps){
    return(
        <ListStyle>
            {
                reviews.map((review) => (
                    <ReviewCard review={review} />
                ))
            }
        </ListStyle>
    )
}