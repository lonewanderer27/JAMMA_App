import { Heading, Text, Stack } from "@chakra-ui/react";
import { useCart } from "../hooks/cart";
import DeliveryAddress from "../components/Checkout/DeliveryAddress";
import ProductsOrdered from "../components/Checkout/ProductsOrdered";
import VoucherSelector from "../components/Checkout/VoucherSelector";
import Loading from "../components/Loading";
import { useResetNextParam } from "../hooks/misc";
import PaymentOptions from "../components/Checkout/PaymentOptions";
import Skeletn from "../components/Loading2";

export default function Checkout(){
  useResetNextParam()
  const {totalCount, isLoading} = useCart();
  document.title = `Checkout ${totalCount} Items`;

  return (
    <Loading>
      <Heading>Checkout</Heading>
      {totalCount === 0 && (
        <Text>
          There are no items to checkout
        </Text>
      )}
      {totalCount > 0 && (
        <Stack gap={3}>
          <Loading circle={true} loading={isLoading}>
            <DeliveryAddress/>
          </Loading>
          <Skeletn skeletonProps={{ height:"50px" }}>
            <ProductsOrdered/>
          </Skeletn>
          <Skeletn skeletonProps={{ height:"50px" }}>
            <VoucherSelector/>
          </Skeletn>
          <Skeletn skeletonProps={{ height:"50px" }}>
            <PaymentOptions />
          </Skeletn>
        </Stack>
      )}
    </Loading>
  )
}