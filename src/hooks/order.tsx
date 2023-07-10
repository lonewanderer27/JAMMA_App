import { OrderType, Profile } from "../types/jamma";
import {
  addOrder,
  getDeliveryAddress,
  getOrder,
  getOrderStatus,
  getOrders,
} from "../utils/order";
import {
  cartProductsAtom,
  checkoutItemsAtom,
  noteAtom,
  paymentOptionAtom,
  selectedVoucherAtom,
} from "../atoms/checkout";
import { checkoutPricesAtom, defaultAddressAtom } from "../atoms/checkout";
import { errorState, loadingState, profileState } from "../atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRef, useState } from "react";

import { cartAtom } from "../atoms/cart";
import { deleteOrderedProducts } from "../utils/checkout";
import { orderAtom } from "../atoms/order";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { useToast } from "@chakra-ui/react";

export function useOrders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const profile = useRecoilValue(profileState);

  const {
    count,
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useQuery(getOrders(profile!.id), {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData as unknown as OrderType[]);
    }
  }, [ordersData]);

  return {
    orders: {
      data: orders,
      count,
      isLoading: ordersLoading,
      error: ordersError,
    },
  };
}

export function useOrder(order_id: string, profile: Profile) {
  const [orderAtomData, setOrderAtomData] = useRecoilState(orderAtom);

  const {
    data: order,
    isLoading: orderLoading,
    error: orderError,
  } = useQuery(getOrder(Number(order_id), profile.id), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: deliveryAddress,
    isLoading: deliveryAddressLoading,
    error: deliveryAddressError,
  } = useQuery(getDeliveryAddress(order?.delivery_address ?? -1), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: status,
    isLoading: statusLoading,
    error: statusError,
  } = useQuery(getOrderStatus(Number(order_id)), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (order) {
      setOrderAtomData(order as unknown as OrderType);
    }
  }, [order]);

  return {
    order: {
      data: order,
      isLoading: orderLoading,
      error: orderError,
    },
    status: {
      data: status,
      isLoading: statusLoading,
      error: statusError,
    },
    deliveryAddress: {
      data: deliveryAddress,
      isLoading: deliveryAddressLoading,
      error: deliveryAddressError,
    },
  };
}

export function usePlaceOrder() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useRecoilState(errorState);
  const message = useRecoilValue(noteAtom);
  const deliveryAddress = useRecoilValue(defaultAddressAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductsAtom);
  const { checkoutProducts } = useRecoilValue(checkoutItemsAtom);
  const [selectedVoucher, setSelectedVoucher] =
    useRecoilState(selectedVoucherAtom);
  const paymentOption = useRecoilValue(paymentOptionAtom);
  const checkoutPrices = useRecoilValue(checkoutPricesAtom);
  const profile = useRecoilValue(profileState);

  const toast = useToast();
  const toastIdRef = useRef();
  const navigate = useNavigate();

  const [order, setOrder] = useRecoilState(orderAtom);

  function handlePlaceOrder() {
    toast({
      title: "Placing Order",
      description: "Please wait while we are placing your order",
      status: "info",
      duration: 1000,
      isClosable: true,
    });

    console.log("Placed Order Info: ");
    console.log("Message: \n", message);
    console.log("Delivery Address: \n", deliveryAddress);
    console.log("Products: \n", checkoutProducts);
    console.log("Selected Voucher: \n", selectedVoucher);
    console.log("Payment Option \n", paymentOption);
    console.log("Checkout Prices: \n", checkoutPrices);

    setError(null);
    setSuccess(false);

    setLoading(true);
    (async () => {
      try {
        const { data, error } = await addOrder({
          note: message,
          delivery_address: deliveryAddress!.id,
          products: {
            products: checkoutProducts.map((product) => {
              return {
                product_id: product.id,
                quantity: cart.find((item) => item.product_id === product.id)!
                  .quantity,
              };
            }),
          },
          voucher: selectedVoucher ? selectedVoucher.id : null,
          total_payment: checkoutPrices!.totalPayment,
          total_payment_discounted: checkoutPrices?.totalPaymentWithVoucher,
          merchandise_subtotal: checkoutPrices.merchandise_subtotal,
          payment_option: paymentOption!.id,
          shipping_fee: 0,
          user_id: profile!.id,
        });

        if (error) {
          setSuccess(false);
          setError(error);

          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });

          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setOrder(data as unknown as OrderType);
          setSuccess(true);

          // clear ordered products from the cart
          deleteOrderedProducts(checkoutProducts, cart, setCart);
          // clear selected voucher
          setSelectedVoucher(null);

          toast({
            title: "Order Placed",
            description: "Your order has been placed",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate(`/my_orders/${data.id}`);
        }
      } catch (error: any) {
        setError(error);
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    })();
    setLoading(false);
  }

  console.log("Rerendering");

  return {
    handlePlaceOrder,
    loading,
    error,
    success,
    order,
  };
}
