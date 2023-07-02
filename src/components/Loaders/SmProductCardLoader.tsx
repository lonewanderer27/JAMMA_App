import { Card, CardBody, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function SmProductCardLoader() {
  return (
    <Card borderRadius='none'>
      <Skeleton height="200px" width='100%' margin="auto" />
      <CardBody padding="3" minH="80px" bg='gray.200'>
        <SkeletonText noOfLines={1} skeletonHeight={'20px'} />
        <Flex justifyContent={'space-between'} marginTop={5}>
          <SkeletonText noOfLines={1} skeletonHeight={'20px'} />
          <SkeletonText noOfLines={1} skeletonHeight={'20px'} />
        </Flex>
      </CardBody>
    </Card>
  )
}