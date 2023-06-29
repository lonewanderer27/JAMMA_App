import { SetterOrUpdater } from "recoil";
import { client } from "../client";
import { CartItem, NewDeliveryAddress, Product } from "../types/jamma";

export function addNewAddress(addressData: NewDeliveryAddress) {
  return client.from("delivery_addresses").insert([
    {
      ...addressData,
      _default: false,
    }
  ]);
}

export function setDefaultAddress(user_id: string, address_id: number) {
  // reset all addresses to false
  // then set one as the default
  return client
          .from("delivery_addresses")
          .update({
            _default: false
          })
          .eq("user_id", user_id)
          .then(() => {
            return client
                    .from("delivery_addresses")
                    .update({
                      _default: true
                    })
                    .eq("user_id", user_id)
                    .eq("id", address_id)
                    .single()})
}

export function getDefaultAddress(user_id: string) {
  return client
          .from("delivery_addresses")
          .select("*")
          .eq("user_id", user_id)
          .eq("_default", true)
          .single();
}

export function getUserAddresses(user_id: string) {
  return client
          .from("delivery_addresses")
          .select("*")
          .eq("user_id", user_id)
          .order("created_at", { ascending: true });
}

export function deleteOrderedProducts(
  checkoutProducts: Product[],
  cart: CartItem[],
  setCart: SetterOrUpdater<[] | CartItem[]>
)
{
  const updatedCart = cart.filter((cartItem) => {
    if (checkoutProducts.find((checkoutProduct) => {
      return checkoutProduct.id === cartItem.product_id;
    })) {
      return false;
    }
    return true;
  });
  setCart(updatedCart);
}