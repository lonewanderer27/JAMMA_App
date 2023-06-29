import { Box,  Input, InputGroup, InputLeftElement, TabPanel } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { ordersAtom } from "../atoms/orders";
import OrdersItem from "./OrdersItem";
import Loading from "./Loading";

export default function AllOrders() {
  const orders = useRecoilValue(ordersAtom);

  if (orders.length != 0) {
    console.log("Orders: ")
    console.table(orders);
  }

  return (
    <TabPanel>
      <Box>
        <Loading loading={orders.length == 0}>
          <InputGroup>
            <InputLeftElement><SearchIcon/></InputLeftElement>
            <Input 
              variant="flushed" 
              placeholder="You can search by Order ID or Product Name"
            />
          </InputGroup>
          {orders.map(order => (
            <OrdersItem key={order.id} {...order}/>
          ))}
        </Loading>
      </Box>
    </TabPanel>
  )
}