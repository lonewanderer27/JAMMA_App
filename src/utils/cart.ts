import { SetterOrUpdater } from "recoil";
import { CartItem, Product } from "../types/jamma";
import { phpString } from "./phpString";
import { client } from "../client";

export function getProductsFromCart(localCart: CartItem[]){
  return client
          .from('products')
          .select('*')
          .in('id', localCart.map((item) => item.product_id))
}

export function isAllChecked(localCart: CartItem[]) {
  return localCart.every((item) => item.checked === true);
}

export function getCheckedProducts(
  cart: CartItem[], 
  products: Product[]) {
  return products.filter((product) => {
    return cart.find((item) => {
      return item.product_id === product.id && item.checked === true;
    });
  });
}

export function checkAllItems(
  localCart: CartItem[],
  setLocalCart: SetterOrUpdater<[] | CartItem[]>,
  checked: boolean
) {
  const updatedCart = localCart.map((item) => {
    return {
      ...item,
      checked: checked
    };
  });
  setLocalCart(updatedCart);
  return updatedCart;
}

export function checkItem(
  localCart: CartItem[],
  setLocalCart: SetterOrUpdater<[] | CartItem[]>,
  product_id: number){
  const updatedCart = localCart.map((item) => {
    if (item.product_id === product_id) {
      return {
        ...item,
        checked: !item.checked
      };
    }
    return item;
  });
  setLocalCart(updatedCart);
  return updatedCart;
}

export function findCartItem(localCart: CartItem[], product_id: number) {
  return localCart.find((item) => item.product_id === product_id);
}

export function calculateTotalPrice(products: Product[], localCart: CartItem[]): {
  totalPrice: number,
  totalPriceFormatted: string
} {
  const totalPrice = localCart.reduce((acc, item) => {
    const product = products.find((product) => 
    (product.id === item.product_id && item.checked === true));
    if (product) {
      return acc + (product.price * item.quantity);
    } else {
      return acc;
    }
  }
  , 0);
  const totalPriceFormatted = phpString.format(totalPrice);
  return { totalPrice, totalPriceFormatted };
}

export function countCart(localCart: CartItem[], checked = true) {
  return localCart.reduce((acc, item) => {

    // navbar cart counter
    if (checked === false) {
      return acc + item.quantity
    } else {
      // cart page counter
      if (item.checked === true) {
        return acc + item.quantity
      }
      return acc;
    }
    
  }, 0);
}

export function addQuantity(
  localCart: CartItem[], 
  setLocalCart: SetterOrUpdater<[] | CartItem[]>, 
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

export function setQuantity(
  localCart: CartItem[],
  setLocalCart: SetterOrUpdater<[] | CartItem[]>,
  product_id: number,
  quantity: number
) {
  const updatedCart = localCart.map((item) => {
    if (item.product_id === product_id) {
      return {
        ...item,
        quantity: quantity
      };
    }
    return item;
  });
  setLocalCart(updatedCart);
  return updatedCart;
}

export function removeFromCart(
  localCart: CartItem[], 
  setLocalCart: SetterOrUpdater<[] | CartItem[]>, 
  product_id: number
) {
  const updatedCart = localCart.filter((item) => item.product_id !== product_id);
  setLocalCart(updatedCart);
  return updatedCart;
}

export function addToCart(
  localCart: CartItem[], 
  setLocalCart: SetterOrUpdater<[] | CartItem[]>, 
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
      product_id: product_id,
      checked: false
    }];
    setLocalCart(newCart);
    return newCart;
  }
}