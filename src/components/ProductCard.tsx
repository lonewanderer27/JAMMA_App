import { Database } from "../types/supabase"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { phpString } from "../utils/phpString";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { localCartState } from "../atoms";
import { addToCart } from "../utils/cart";

export default function ProductCard(props: Database["public"]["Tables"]["products"]["Row"]){
  const [localCart, setLocalCart] = useRecoilState(localCartState);

  return (
    <Card maxW='sm'>
      <CardBody>
        <Image src={props.image_url} alt={props.name} borderRadius='lg' />
        <Stack spacing={3} mt='6'>
          <Heading size='md'>{props.name}</Heading>
          <Text>{props.description}</Text>
          <Text>Price: {phpString.format(props.price)}</Text>
        </Stack>
        <Divider/>
        <CardFooter>
          <ButtonGroup>
            <Link to={`/product/${props.id}`}>
              <Button colorScheme='blue' variant='solid'>
                View
              </Button>
            </Link>
            <Button colorScheme='green' variant='solid'>Buy Now</Button>
            <Button 
              colorScheme='blue' 
              variant='outline'
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