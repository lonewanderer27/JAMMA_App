import { Avatar, AvatarGroup, Box, Card, HStack, VStack, Skeleton, Stack, Text, CardBody, Flex, SkeletonText, CardHeader, CardFooter, Button } from "@chakra-ui/react";
import { OrderType, Product } from "../types/jamma";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderedProducts } from "../utils/order";
import { phpString } from "../utils/phpString";

export default function OrdersItem(props: OrderType) {
  const nav = useNavigate();

  const [products, setProducts] = useState<Product[]>(() => [])

  useEffect(() => {
    const getProducts = async () => {
      if (props.products.products.length > 0) {
        const {data} = await getOrderedProducts(props.products.products.map(product => product.product_id).slice(0, 3));
        setProducts(data ?? []);
      }
    }
    getProducts();
  }, [])

  if (products.length != 0) {
    return (
      <Card 
        onClick={() => nav(`/my_orders/${props.id}`)}
        marginY={5}
        borderRadius={0}
      >
        <CardHeader paddingBottom={0}>
          
        </CardHeader>
        <CardBody paddingBottom={0}>
          <AvatarGroup size='xl' spacing={1}>
            {products.map(product => (
              <Avatar 
                borderRadius={0}
                key={product.id+"img"} 
                src={product.image_url} 
                backgroundColor={'gray.200'}
              />)
            )}
            {props.products.products.length > 3 && (
              <Flex 
                alignItems={'center'} 
                justifyContent={'center'} 
                height="92px" 
                width="92px"
                bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
                marginLeft={0.5}
              >
                <Text>+ {products.length - 2}</Text>
              </Flex>
            )}
          </AvatarGroup>
          <Stack marginY={5}>
            <Text>{products[0].name} x{props.products.products[0].quantity}</Text>
            {props.products.products.length > 1 && (
              <Text>and {products.length - 2} more</Text>
            )}
            <Text>Order Total: {phpString.format(props.total_payment_discounted)}</Text>
          </Stack>
        </CardBody>
        <CardFooter 
          paddingTop={0} 
          display='flex' 
          alignItems={'center'} 
          justifyContent={'space-between'}
        >
          <Text>ID: {props.id} | Ordered on: {new Date(props.order_date).toDateString()}</Text>
          <HStack>
            <Button borderRadius={0} colorScheme='blue'>View Order</Button>
          </HStack>
        </CardFooter>
      </Card>
    )
  }

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