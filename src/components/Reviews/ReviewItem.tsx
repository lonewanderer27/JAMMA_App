import { Box, Flex, Text } from "@chakra-ui/react";
import { Review } from "../../types/jamma";
import { useProfile } from "../../hooks/profiles";
import Skeletn from "../Loading2";

export default function ReviewItem(props: Review) {
  const { data, isLoading, error } = useProfile(props.user_id);

  return (
    <Skeletn loading={isLoading} skeletonProps={{width: '100%'}}>
      <Box>
        <Flex><Text fontWeight={'bold'}>{data?.username}</Text> <Text>  -  </Text> <Text>{new Date(props.review_date).toDateString()}</Text></Flex>
        <Text>{'⭐'.repeat(props.product_rating)}{'☆'.repeat(5-props.product_rating)}</Text>
        <Text>{props.comment}</Text>
      </Box>
    </Skeletn>
  )
}