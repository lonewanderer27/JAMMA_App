import { Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Image, Stack, Text, IconButton, Checkbox } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { CartItemType } from "../../types/jamma";
import { phpString } from "../../utils/phpString";
import { useNavigate } from "react-router-dom";
import { addQuantity, checkItem, findCartItem, removeFromCart } from "../../utils/cart";
import { useRecoilState } from "recoil";
import { cartAtom } from "../../atoms/cart";

export default function CartItem(props: CartItemType) {
  const [localCart, setLocalCart] = useRecoilState(cartAtom);
  const cartItem = findCartItem(localCart, props.id);

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

  function handleCheck() {
    checkItem(localCart, setLocalCart, props.id);
  }

  if (cartItem !== undefined) {
    return (
      <>
        <Card
          direction={{base: 'column', sm: 'row'}}
          overflow={'hidden'}
          variant={'outline'}
          size='sm'
        >
          
          <Checkbox
            size='lg'
            colorScheme='green'
            isChecked={cartItem.checked}
            margin={3}
            onChange={() => handleCheck()}
            checked={cartItem.checked}
          />

          <Image
            objectFit='fill'
            maxW={{sm:'150px'}}
            maxH={{base:'50%', sm:'100px'}}
            src={props.image_url}
          />
    
          <Stack>
            <CardBody>
              <Heading size='md'>{props.name}</Heading>
              <Text>
                Unit Price: {phpString.format(props.price)}
              </Text>
              <ButtonGroup 
                size='xs' 
                display="flex" 
                alignItems={'center'}
                marginTop={5}
              >
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
              
            </CardFooter>
          </Stack>
        </Card>
        <Card>

        </Card>
      </>
    )
  } else {
    return <></>
  }
}