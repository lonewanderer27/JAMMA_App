import { Flex, Td, Tr, Image, Text, Button } from "@chakra-ui/react";
import { Product } from "../../types/jamma";
import { phpString } from "../../utils/phpString";
import { useNavigate } from "react-router-dom";

export default function OrderedProduct(props: {
  product: Product,
  quantity: number,
}) {
  const navigate = useNavigate();
  return (
    <Tr>
      <Td>
        <Flex alignItems='center'>
          <Image 
            boxSize="50px"
            objectFit='contain'
            src={props.product.image_url}
            mr={5}
          />
          <Text>{props.product.name}</Text>
        </Flex>
      </Td>
      <Td>
        <Text>{phpString.format(props.product.price)}</Text>
      </Td>
      <Td>
        <Text>{props.quantity}</Text>
      </Td>
      <Td>
        <Text>{phpString.format(props.product.price * props.quantity)}</Text>
      </Td>
      <Td>
        <Flex display='flex' flexDir='column' w='100%'>
          <Button 
            size='sm'
            width="100%"
            variant='link' 
            colorScheme="blue"
            onClick={() => navigate(`/product/${props.product.id}`)}
          >
            View Product
          </Button>
        </Flex>
      </Td>
    </Tr>
  )
}