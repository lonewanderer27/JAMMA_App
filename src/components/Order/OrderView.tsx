import { Box, Heading, Text, Badge, Stack, Card, CardBody } from "@chakra-ui/react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { orderStatus, orderAtom, orderedProducts, paymentOption, paymentStatus } from "../../atoms/order";
import Skeletn from "../Loading2";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOrder } from "../../utils/order";
import { profileState } from "../../atoms/atoms";
import { OrderType } from "../../types/jamma";
import OrderedProducts from "./OrderedProducts";
import NotFound from "../../pages/NotFound";
import OrderStatus from "./OrderStatus";

export default function OrderView() {
  const { order_id } = useParams();
  const [order, setOrder] = useRecoilState(orderAtom);
  const profile = useRecoilValueLoadable(profileState);
  const ds = useRecoilValueLoadable(orderStatus);
  const po = useRecoilValueLoadable(paymentOption);
  const ps = useRecoilValueLoadable(paymentStatus);
  const {contents: op, state: opState} = useRecoilValueLoadable(orderedProducts);

  useEffect(() => {
    if (order_id != null && 
        profile.contents.id != null
    ) {
      console.log("Order ID: ", order_id);
      (async () => {
        setOrder((await getOrder(Number(order_id), profile.contents.id)).data as unknown as OrderType)
      })();
      document.title = `Order Id. ${order_id}`;
    }
  }, [order_id, profile])

  console.log("Order: ", order);

  if (order) {
    return (
      <Box>
        <Card>
          <CardBody>
            <Heading size='md'>
              Order Id. {order.id}
            </Heading>
          </CardBody>
        </Card>
        <OrderStatus/>
        <Skeletn state={opState}>
          <OrderedProducts order={order} orderedProducts={op} />
        </Skeletn>
      </Box>
    )
  } else {
    return (
      <NotFound/>
    )
  }
}