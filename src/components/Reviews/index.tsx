import { Box, Stack } from "@chakra-ui/react";
import { Review } from "../../types/jamma";
import ReviewItem from "./ReviewItem";

export default function Reviews(props: {
  reviews: Review[]
}) {
  return (
    <Stack>
      {props.reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </Stack>
  )
}