import { Box, Button, Card, CardBody, CardFooter, Checkbox, Heading, Stack, Table, TableCaption, Tbody, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import CartItem from "../components/Checkout/CartItem";
import { useCart } from "../hooks/cart";
import { Link } from "react-router-dom";
import { checkAllItems, countCart } from "../utils/cart";
import { useState } from "react";
import { cartAtom } from "../atoms/cart";
import { useRecoilState } from "recoil";
import ProductItemList from "../components/Checkout/ProductListItem";

export default function Cart() {
  const { pathname } = location;
  const toast = useToast();

  const { 
    cart,
    products, 
    totalPrice, 
    totalCount, 
    isAllChecked,
    isLoading, 
    error
  } = useCart();
  const [localCart, setLocalCart] = useRecoilState(cartAtom);
  const [checkAll, setCheckAll] = useState(false);

  function handleToggleCheckAll() {
    setCheckAll(!checkAll);
    checkAllItems(localCart, setLocalCart, !checkAll);
  }

  if (error || (isLoading === true && products.length === 0)) {
    return (
      <Box>
        <Heading>Your Cart</Heading>
        {error && (
          <Text>There has been error!</Text>
        )}
        {(isLoading === true && products.length === 0)&& (
          <Text>Loading your cart items</Text>
        )}
        {(isLoading === false && cart.length === 0) && (
          <Text>There are no items in your cart</Text>
        )}
      </Box>
    )
  }

  function emptyCheckout() {
    if (totalCount === 0) {
      toast({
        title: "Please select items to checkout",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  document.title = `Cart: ${countCart(localCart, false)} Items`;

  return (
    <Box>
      <Table variant='striped'>
        <TableCaption>
          <Heading>
            {`Your cart ${cart.length == 0 ? "is empty" : ""}`}
          </Heading>
        </TableCaption>
        <Thead>
          <Tr>
            {pathname.includes("cart") &&
            <Th>
              <Checkbox 
                checked={isAllChecked}
                size='lg'
                colorScheme='green'
                onChange={() => handleToggleCheckAll()}
              />
            </Th>}
            <Th>
              <Text>
                Name
              </Text>
            </Th>
            <Th>
              <Text>Unit Price</Text>
            </Th>
            <Th>
              <Text>Amount</Text>
            </Th>
            <Th>
              <Text>Item Subtotal</Text>
            </Th>
            {pathname.includes("cart") &&
            <Th>
              <Text>
                Actions
              </Text>
            </Th>}
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <ProductItemList key={product.id} {...product} />
          ))}
          <Tr>
            <Th colSpan={4} textAlign={'end'}>
              <Text>
                Order Total: {totalCount}
              </Text>
            </Th>
            <Th colSpan={1}>
              <Text>
                {totalPrice}
              </Text>
            </Th>
            {pathname.includes("cart") && <Th colSpan={2}>
              <Link to={totalCount > 0 ? "/checkout" : ""}>
                <Button 
                  size='lg' 
                  variant='solid' 
                  colorScheme={totalCount === 0 ? "gray" : "green"} 
                  w="100%"
                  onClick={() => emptyCheckout()}
                >
                  Checkout
                </Button>
              </Link> 
            </Th>}
          </Tr>
        </Tbody>
      </Table>
      <Card
        direction={{base: 'column', sm: 'row'}}
        overflow={'hidden'}
        variant={'solid'}
      >
        <Stack>
          <CardFooter>
            
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  )
}