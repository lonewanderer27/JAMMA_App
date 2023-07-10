import {
  Button,
  Checkbox,
  Flex,
  Image,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import {
  addQuantity,
  checkItem,
  findCartItem,
  removeFromCart,
  setQuantity,
} from "../../utils/cart";
import { useLocation, useNavigate } from "react-router-dom";

import MobileSpinner from "../MobileSpinner";
import { Product } from "../../types/jamma";
import { cartAtom } from "../../atoms/cart";
import { phpString } from "../../utils/phpString";
import { useRecoilState } from "recoil";

export default function ProductItemList(props: Product) {
  const { pathname } = useLocation();
  const [localCart, setLocalCart] = useRecoilState(cartAtom);
  const cartItem = findCartItem(localCart, props.id);

  const navigate = useNavigate();

  function handleRemove() {
    removeFromCart(localCart, setLocalCart, props.id);
  }

  function handleAdd() {
    addQuantity(localCart, setLocalCart, props.id, 1);
  }

  function handleMinus() {
    if (cartItem!.quantity > 1) {
      addQuantity(localCart, setLocalCart, props.id, -1);
    }
  }

  function handleSet(newQuantity: number) {
    if (newQuantity > 0) {
      setQuantity(localCart, setLocalCart, props.id, newQuantity);
    }
  }

  function handleCheck() {
    checkItem(localCart, setLocalCart, props.id);
  }

  if (cartItem !== undefined) {
    return (
      <Tr>
        {pathname.includes("cart") && (
          <Td>
            <Flex alignItems="center">
              <Checkbox
                size="lg"
                colorScheme="green"
                isChecked={cartItem!.checked}
                onChange={() => handleCheck()}
                checked={cartItem!.checked}
              />
            </Flex>
          </Td>
        )}
        <Td>
          <Flex alignItems="center">
            <Image
              boxSize="100px"
              objectFit="contain"
              src={props.image_url}
              mr={5}
            />
            <Text>{props.name}</Text>
          </Flex>
        </Td>
        <Td>
          <Text>{phpString.format(props.price)}</Text>
        </Td>
        <Td>
          {!pathname.includes("cart") && <Text>{cartItem?.quantity}</Text>}
          {pathname.includes("cart") && (
            <MobileSpinner
              value={cartItem?.quantity}
              onAdd={() => handleAdd()}
              onSubtract={() => handleMinus()}
              onSet={(newQuantity) => handleSet(newQuantity)}
              enableAdd
              enableSubtract
            />
          )}
        </Td>
        <Td>
          <Text>{phpString.format(props.price * cartItem!.quantity)}</Text>
        </Td>
        {pathname.includes("cart") && (
          <Td>
            <VStack display="flex" flexDir={"column"} w="100%">
              <Button
                size="sm"
                width="100%"
                variant="ghost"
                colorScheme="red"
                onClick={() => handleRemove()}
              >
                Remove from Cart
              </Button>
              <Button
                size="sm"
                width="100%"
                variant="link"
                colorScheme="blue"
                onClick={() => navigate(`/product/${props.id}`)}
              >
                View Product
              </Button>
            </VStack>
          </Td>
        )}
      </Tr>
    );
  } else {
    return <></>;
  }
}
