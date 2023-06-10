import { Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Image, Stack, Text, IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { CartItemType } from "../types/jamma";
import { phpString } from "../utils/phpString";
import { useNavigate } from "react-router-dom";
import { addQuantity, removeFromCart } from "../utils/cart";
import { useRecoilState } from "recoil";
import { localCartState } from "../atoms";

export default function CartItem(props: CartItemType) {
  const [localCart, setLocalCart] = useRecoilState(localCartState);
  const cartItem = localCart.find(item => item.product_id === props.id);

  const navigate = useNavigate();

  function handleRemove() {
    removeFromCart(localCart, setLocalCart, props.id);
  }

  function handleAdd() {
    addQuantity(localCart, setLocalCart, props.id, 1)
  }

  function handleMinus(){
    if (cartItem!.quantity > 1) {
      addQuantity(localCart, setLocalCart, props.id, -1)
    }
  }

  if (cartItem !== undefined) {
    return (
      <Card
        direction={{base: 'column', sm: 'row'}}
        overflow={'hidden'}
        variant={'outline'}
      >
        <Image
          objectFit='cover'
          maxW={{base:'100%', sm:'200px'}}
          src={props.image_url}
        />
  
        <Stack>
          <CardBody>
            <Heading size='md'>{props.name}</Heading>
            <Text py='2'>
              {props.description}
            </Text>
            <ButtonGroup size='sm'>
              <Text>Qty: </Text>
              <IconButton 
                aria-label="Minus"
                variant='solid' 
                colorScheme="blue"
                onClick={() => handleMinus()}
                icon={<MinusIcon/>}
              />
              <Text py='1'>{cartItem.quantity}</Text>
              <IconButton 
                aria-label="Add"
                variant='solid' 
                colorScheme="blue"
                onClick={() => handleAdd()}
                icon={<AddIcon/>}
              />
            </ButtonGroup>
            <Text py='1'>
              Subtotal Price: {phpString.format(props.subprice * cartItem.quantity)}
            </Text>
          </CardBody>
  
          <CardFooter>
            <ButtonGroup>
              <Button 
                variant='solid' 
                colorScheme="red"
                onClick={() => handleRemove()}>
                Remove from Cart
              </Button>
              <Button 
                variant='solid' 
                colorScheme="green"
                onClick={() => navigate(`/product/${props.id}`)}
              >
                View Product
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>
    )
  } else {
    return <></>
  }
}