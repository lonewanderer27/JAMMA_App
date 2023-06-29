import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { phpString } from "../../utils/phpString";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartAtom } from "../../atoms/cart";
import { addToCart } from "../../utils/cart";
import { Product } from "../../types/jamma";

export default function XlProductCard(props: Product){
  const [localCart, setLocalCart] = useRecoilState(cartAtom);

  return (
    <Card maxW='sm' boxShadow={'md'}>
      <CardBody>
        <Image
          margin="0 auto auto auto"
          maxH={{base: '200px', md: '300px'}} 
          src={props.image_url} 
          alt={props.name} 
          borderRadius='lg'
        />
        <Stack spacing={3} mt='6'>
          <Heading size='md'>{props.name}</Heading>
          <Text>{props.description}</Text>
          <Text>Price: {phpString.format(props.price)}</Text>
        </Stack>
        <Divider/>
        <CardFooter>
          <ButtonGroup margin="auto">
            <Link to={`/product/${props.id}`}>
              <Button colorScheme='blue' variant='solid'>
                View
              </Button>
            </Link>
            {/* <Button colorScheme='green' variant='solid'>Buy Now</Button> */}
            <Button 
              colorScheme='green' 
              variant='solid'
              onClick={() => addToCart(localCart, setLocalCart, props.id)}
              >
                Add to Cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </CardBody>
    </Card>
  )
}