import { SetterOrUpdater } from "recoil";
import { LocalCart, Product } from "../types/jamma";
import { phpString } from "./phpString";

export function findInCart(localCart: LocalCart[], product_id: number) {
  return localCart.find((item) => item.product_id === product_id);
}

export function calculateTotalPrice(products: Product[]) {
  return phpString.format(products.reduce((acc, product) => acc + product.price, 0))
}

export function addQuantity(
  localCart: LocalCart[], 
  setLocalCart: SetterOrUpdater<[] | LocalCart[]>, 
  product_id: number,
  quantity: number
) {
  const updatedCart = localCart.map((item) => {
    if (item.product_id === product_id) {
      return {
        ...item,
        quantity: item.quantity + quantity
      };
    }
    return item;
  });
  setLocalCart(updatedCart);
  return updatedCart;
}

export function removeFromCart(
  localCart: LocalCart[], 
  setLocalCart: SetterOrUpdater<[] | LocalCart[]>, 
  product_id: number
) {
  const updatedCart = localCart.filter((item) => item.product_id !== product_id);
  setLocalCart(updatedCart);
  return updatedCart;
}

export function countCart(localCart: LocalCart[]) {
  return localCart.reduce((acc, item) => acc + item.quantity, 0);
}

export function addToCart(
  localCart: LocalCart[], 
  setLocalCart: SetterOrUpdater<[] | LocalCart[]>, 
  product_id: number) 
{
  let existingItem = false;
  const updatedCart = localCart.map((item) => {
    if (item.product_id === product_id) {
      existingItem = true;
      return {
        ...item,
        created_at: (Date.now() / 1000).toString(),
        quantity: item.quantity + 1
      };
    }
    return item;
  });

  if (existingItem) {
    setLocalCart(updatedCart);
    return updatedCart;
  } else {
    const newCart = [...updatedCart, {
      created_at: (Date.now() / 1000).toString(),
      quantity: 1,
      product_id: product_id
    }];
    setLocalCart(newCart);
    return newCart;
  }
}