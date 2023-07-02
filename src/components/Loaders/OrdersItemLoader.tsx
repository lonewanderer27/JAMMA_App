import { Card, CardBody, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";
import { OrderType } from "../../types/jamma";

export default function OrdersItemLoader(props: OrderType) {
  return (
    <Card
      marginY={5}
      borderRadius={0}
    >
      <CardBody display="flex" flexDir="column">
        <HStack marginY={1}>
          {props.products.products.map(() => (
            <Skeleton borderRadius={0} height="100px" width="100px"/>
          )) }
        </HStack>

        <SkeletonText 
          noOfLines={3} 
          spacing={2} 
          skeletonHeight={'20px'}
          marginY={1}
        />
      </CardBody>
    </Card>
  )
}