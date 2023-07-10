import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

import { OrderType } from "../../types/jamma";
import OrdersItemLoader from "../Loaders/OrdersItemLoader";
import Skeletn from "../Loading2";
import { phpString } from "../../utils/phpString";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/products";

export default function OrdersItem(props: OrderType) {
  const nav = useNavigate();

  const { data: products, isLoading } = useProducts(
    props.products.products.map((product) => product.product_id).slice(0, 3)
  );

  return (
    <Skeletn loading={isLoading} loader={<OrdersItemLoader {...props} />}>
      {products != undefined && (
        <Card
          onClick={() => nav(`/my_orders/${props.id}`)}
          marginY={5}
          borderRadius={0}
        >
          <CardHeader paddingBottom={0}></CardHeader>
          <CardBody paddingBottom={0}>
            <AvatarGroup size="xl" spacing={1}>
              {products.map((product) => (
                <Avatar
                  borderRadius={0}
                  key={product.id + "img"}
                  src={product.image_url}
                  backgroundColor={"gray.200"}
                />
              ))}
              {props.products.products.length > 3 && (
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  height="92px"
                  width="92px"
                  bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
                  marginLeft={0.5}
                >
                  <Text>+ {products.length - 2}</Text>
                </Flex>
              )}
            </AvatarGroup>
            <Stack marginY={5}>
              <Text>
                {products[0].name} x{props.products.products[0].quantity}
              </Text>
              {props.products.products.length > 1 && (
                <Text>and {props.products.products.length - 1} more</Text>
              )}
              <Text>
                Order Total: {phpString.format(props.total_payment_discounted)}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter
            paddingTop={0}
            display="flex"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text>
              ID: {props.id} | Ordered on:{" "}
              {new Date(props.order_date).toDateString()}
            </Text>
            <HStack>
              <Button borderRadius={0} colorScheme="blue">
                View Order
              </Button>
            </HStack>
          </CardFooter>
        </Card>
      )}
    </Skeletn>
  );
}
