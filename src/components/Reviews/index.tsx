import { Box } from "@chakra-ui/react";
import { Review } from "../../types/jamma";
import ReviewItem from "./ReviewItem";

export default function Reviews(props: {
  reviews: Review[]
}) {
  return (
    <Box>
      {props.reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </Box>
  )
}