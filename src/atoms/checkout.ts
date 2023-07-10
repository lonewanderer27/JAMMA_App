import {
  Coupon,
  DeliveryAddress,
  PaymentOption,
  Product,
} from "../types/jamma";
import { atom, selector } from "recoil";
import {
  calculateTotalPrice,
  countCart,
  getCheckedProducts,
  isAllChecked,
} from "../utils/cart";
import { fetchCOD, fetchPaymentOpts } from "../utils/order";
import { log, sessionState, sessionStorageEffect } from "./atoms";

import { cartAtom } from "./cart";
import { getUserAddresses } from "../utils/checkout";

export const deliveryAddressesAtom = selector<DeliveryAddress[] | []>({
  key: "deliveryAddresses",
  get: async ({ get }) => {
    const session = get(sessionState);
    if (session) {
      const { data: addresses } = await getUserAddresses(session.user.id);
      return addresses as DeliveryAddress[];
    } else {
      return [] as DeliveryAddress[];
    }
  },
});

export const defaultAddressAtom = selector<DeliveryAddress | null>({
  key: "defaultDeliveryAddress",
  get: async ({ get }) => {
    const deliveryAddresses = get(deliveryAddressesAtom);
    if (deliveryAddresses.length > 0) {
      const defaultAddress = deliveryAddresses.find(
        (address) => address._default
      );
      if (defaultAddress) {
        return defaultAddress;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
});

// stores the products item that exists in the cart
export const cartProductsAtom = atom<Product[] | []>({
  key: "localCartProducts",
  default: [],
});

export const isAllCheckedAtom = selector<boolean>({
  key: "isAllChecked",
  get: ({ get }) => {
    const localCart = get(cartAtom);
    return isAllChecked(localCart);
  },
});

type cartCheckedProductsAtom = {
  checkoutProducts: Product[] | [];
  totalPrice: number;
  totalPriceFormatted: string;
  totalCount: number;
};

// stores the products item that has been checked in the cart
// as well as their total price and total count
export const checkoutItemsAtom = selector<cartCheckedProductsAtom>({
  key: "cartCheckedProducts",
  get: ({ get }) => {
    const cart = get(cartAtom);
    const products = get(cartProductsAtom);
    const checkoutProducts = getCheckedProducts(cart, products);
    const { totalPrice, totalPriceFormatted } = calculateTotalPrice(
      products,
      cart
    );
    return {
      checkoutProducts,
      totalCount: countCart(cart, true),
      totalPrice,
      totalPriceFormatted,
    };
  },
});

export const checkoutPricesAtom = selector({
  key: "checkoutPrices",
  get: ({ get }) => {
    const { totalPrice: merchandise_subtotal, totalCount } =
      get(checkoutItemsAtom);
    const voucher = get(selectedVoucherAtom);

    console.log(totalCount);

    let shippingFee;
    if (merchandise_subtotal < 1000) {
      shippingFee = 38 + 2 * totalCount;
    } else if (merchandise_subtotal < 2000) {
      shippingFee = 100 + 5 * totalCount; // Adjusted base rate and unit rate
    } else if (merchandise_subtotal < 5000) {
      shippingFee = 200 + 15 * totalCount; // Adjusted base rate and unit rate
    } else if (merchandise_subtotal < 10000) {
      shippingFee = 400 + 10 * totalCount; // Adjusted base rate and unit rate
    } else {
      shippingFee = 800 + 5 * totalCount; // Adjusted base rate and unit rate
    }

    const totalPayment = merchandise_subtotal + shippingFee;

    return {
      merchandise_subtotal,
      shippingFee,
      totalPayment,
      totalPaymentWithVoucher: totalPayment - (voucher?.discount || 0),
    };
  },
});

export const selectedVoucherAtom = atom<Coupon | null>({
  key: "order/voucher",
  default: null,
  effects_UNSTABLE: [
    sessionStorageEffect<Coupon | null>("order/voucher"),
    ({ onSet }) =>
      onSet((newVoucher) => console.log("applied voucher", newVoucher)),
  ],
});

export const noteAtom = atom<string | null>({
  key: "order/note",
  default: null,
  effects: [
    ({ onSet }) =>
      onSet((newMessage) => console.log("delivery message: \n", newMessage)),
  ],
});

export const paymentOptionAtom = atom<PaymentOption | null>({
  key: "order/paymentOption",
  default: selector<PaymentOption | null>({
    key: "order/paymentOption/default",
    get: async () => {
      const { data } = await fetchCOD();
      return (data as PaymentOption) || null;
    },
  }),
  effects: [
    ({ onSet }) =>
      onSet((newPaymentOption) => log("New Payment Option", newPaymentOption)),
  ],
});

export const paymentOptionsAtom = selector<PaymentOption[] | []>({
  key: "order/paymentOptions",
  get: async () => {
    const { data } = await fetchPaymentOpts();
    return (data as PaymentOption[]) || ([] as PaymentOption[]);
  },
});
