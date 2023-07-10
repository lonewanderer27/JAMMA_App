import { Review } from "../../types/jamma";
import ReviewItem from "./ReviewItem";
import { Stack } from "@chakra-ui/react";

export default function Reviews(props: { reviews: Review[] }) {
  return (
    <Stack>
      {props.reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </Stack>
  );
}
