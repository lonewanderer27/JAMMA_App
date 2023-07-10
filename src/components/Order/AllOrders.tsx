import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  TabPanel,
} from "@chakra-ui/react";

import Loading from "../Loading";
import OrdersItem from "./OrdersItem";
import { SearchIcon } from "@chakra-ui/icons";
import { useOrders } from "../../hooks/order";

export default function AllOrders() {
  const { orders } = useOrders();

  return (
    <TabPanel>
      <Box>
        <Loading loading={orders.isLoading}>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input
              variant="flushed"
              placeholder="You can search by Order ID or Product Name"
            />
          </InputGroup>
          {orders.data.map((order) => (
            <OrdersItem key={order.id} {...order} />
          ))}
        </Loading>
      </Box>
    </TabPanel>
  );
}
