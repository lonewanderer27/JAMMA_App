import { Card, CardBody, Heading } from "@chakra-ui/react";

import { OrderStatus2 } from "./OrderStatus";
import { OrderType } from "../../types/jamma";
import OrderedProducts from "./OrderedProducts";
import Skeletn from "../Loading2";
import { orderedProducts } from "../../atoms/order";
import { profileState } from "../../atoms/atoms";
import { useOrder } from "../../hooks/order";
import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

export default function OrderView() {
  const { order_id } = useParams<{ order_id: string }>();
  const profile = useRecoilValueLoadable(profileState);
  const { order } = useOrder(order_id!, profile.contents);
  const products = useRecoilValueLoadable(orderedProducts);

  return (
    <Skeletn loading={order.isLoading} skeletonProps={{ width: "100%" }}>
      <Card>
        <CardBody>
          <Heading size="md">Order Id. {order.data?.id}</Heading>
          <OrderStatus2 />
          <Skeletn state={products.state}>
            {products.contents != undefined && (
              <OrderedProducts
                order={order?.data as unknown as OrderType}
                orderedProducts={products.contents}
              />
            )}
          </Skeletn>
        </CardBody>
      </Card>
    </Skeletn>
  );
}

// export function OrderView() {
//   const { order_id } = useParams();
//   const [order, setOrder] = useRecoilState(orderAtom);
//   const profile = useRecoilValueLoadable(profileState);
//   const ds = useRecoilValueLoadable(orderStatus);
//   const po = useRecoilValueLoadable(paymentOption);
//   const ps = useRecoilValueLoadable(paymentStatus);
//   const {contents: op, state: opState} = useRecoilValueLoadable(orderedProducts);

//   useEffect(() => {
//     if (order_id != null &&
//         profile.contents.id != null
//     ) {
//       console.log("Order ID: ", order_id);
//       (async () => {
//         setOrder((await getOrder(Number(order_id), profile.contents.id)).data as unknown as OrderType)
//       })();
//       document.title = `Order Id. ${order_id}`;
//     }
//   }, [order_id, profile])

//   console.log("Order: ", order);

//   if (order) {
//     return (
//       <Box>
//         <Card>
//           <CardBody>
//             <Heading size='md'>
//               Order Id. {order.id}
//             </Heading>
//           </CardBody>
//         </Card>
//         <OrderStatus/>
//         <Skeletn state={opState}>
//           <OrderedProducts order={order} orderedProducts={op} />
//         </Skeletn>
//       </Box>
//     )
//   } else {
//     return (
//       <NotFound/>
//     )
//   }
// }
