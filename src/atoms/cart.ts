import { atom, selector } from 'recoil';
import { CartItem } from '../types/jamma';
import { sessionStorageEffect, log } from './atoms';
import { calculateTotalPrice, countCart } from '../utils/cart';
import { cartProductsAtom } from './checkout';

// remove items here, and the states in checkout and hooks will follow
// for example, removing a product here, will also remove it in the checkout page
export const cartAtom = atom<CartItem[] | []>({
  key: 'cart',
  default: [],
  effects_UNSTABLE: [
    sessionStorageEffect<CartItem[] | []>('cart'),
    ({ onSet }) => onSet((cart) => log("cart", cart))
  ]
});

export const cartPriceAtom = selector<string>({
  key: 'cart/price',
  get: ({ get }) => {
    return calculateTotalPrice(get(cartProductsAtom), get(cartAtom)).totalPriceFormatted
  },
});

export const cartCountAtom = selector<number>({
  key: 'cart/count',
  get: ({ get }) => {
    return countCart(get(cartAtom), true)
  },
});
