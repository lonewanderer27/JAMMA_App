import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Product } from "../../types/jamma";
import { phpString } from "../../utils/phpString";

export default function OrderListItem(props: {
  product: Product,
  quantity: number,
}) {
  return (
    <Box>
      <Image
        boxSize="50px"
        objectFit='contain'
        src={props.product.image_url}
        mr={5}
      />
      <Box mr="auto">
        <Text>{props.product.name}</Text>
        <Text>x{props.quantity}</Text>
      </Box>
      <Flex alignContent={'center'}>
        <Text>{phpString.format(props.product.price)}</Text>
      </Flex>
    </Box>
  )
}