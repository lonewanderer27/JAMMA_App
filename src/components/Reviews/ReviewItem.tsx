import { Box, Card, CardBody, CardHeader, Flex, HStack, Text, Icon } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Review } from "../../types/jamma";
import { useProfile } from "../../hooks/profiles";
import Skeletn from "../Loading2";

export default function ReviewItem(props: Review) {
  const { data, isLoading, error } = useProfile(props.user_id);

  return (
    <Skeletn loading={isLoading} skeletonProps={{width: '100%'}}>
      <Card boxShadow={'none'}>
        <CardHeader display='flex' pb={0} px={0}>
          <Text fontWeight={'bold'}>{data?.username}</Text> 
          <Text marginX={2}>·</Text>
          <Text>{new Date(props.review_date).toDateString()}</Text>
          <Flex ml={'auto'}>
            <Flex alignItems={'center'}>
              <Icon as={TriangleUpIcon} />
              <Text ml={1}>{props.upvote}</Text>
            </Flex>
            <Flex alignItems={'center'} ml={5}>
              <Icon as={TriangleDownIcon} />
              <Text ml={1}>{props.downvote}</Text>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody pt={0} px={0}>
          <Text>{'⭐'.repeat(props.product_rating)}{'☆'.repeat(5-props.product_rating)}</Text>
          <Text>{props.comment}</Text>
        </CardBody>
      </Card>
    </Skeletn>
  )
}