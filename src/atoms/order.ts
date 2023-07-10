import {
  Coupon,
  DeliveryAddress,
  OrderStatus,
  OrderType,
  PaymentOption,
  PaymentStatus,
  Product,
} from "../types/jamma";
import { atom, selector } from "recoil";
import {
  getCoupon,
  getDeliveryAddress,
  getOrderStatus,
  getOrderedProducts,
  getPaymentOption,
  getPaymentStatus,
} from "../utils/order";

export const orderAtom = atom<OrderType | null>({
  key: "my_order",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        console.log("orderAtom", newValue);
      });
    },
  ],
});

export const orderedProducts = selector<Product[] | null>({
  key: "my_order/orderedProducts",
  get: async ({ get }) => {
    const order = get(orderAtom);
    if (order == null) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { data } = await getOrderedProducts(
      order.products.products.map((p) => p.product_id)
    );
    return data;
  },
});

export const orderStatus = selector<OrderStatus | null>({
  key: "my_order/status",
  get: async ({ get }) => {
    const order = get(orderAtom);

    if (order == null) {
      return null;
    }
    const { data } = await getOrderStatus(order.id);
    return data;
  },
});

export const orderAddress = selector<DeliveryAddress | null>({
  key: "my_order/address",
  get: async ({ get }) => {
    const order = get(orderAtom);
    if (order == null) {
      return null;
    }

    const { data } = await getDeliveryAddress(order.delivery_address);
    return data;
  },
});

export const paymentOption = selector<PaymentOption | null>({
  key: "my_order/paymentOption",
  get: async ({ get }) => {
    const order = get(orderAtom);
    if (order == null) {
      return null;
    }

    const { data } = await getPaymentOption(order.payment_option);
    return data;
  },
});

export const paymentStatus = selector<PaymentStatus | null>({
  key: "my_order/paymentStatus",
  get: async ({ get }) => {
    const order = get(orderAtom);
    if (order == null) {
      return null;
    }

    const { data } = await getPaymentStatus(order.payment_status);
    return data;
  },
});

export const voucher = selector<Coupon | null>({
  key: "my_order/voucher",
  get: async ({ get }) => {
    const order = get(orderAtom);
    if (order == null) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (order!.voucher == null) {
      return null;
    }

    const { data } = await getCoupon(order.voucher);
    return data;
  },
});
