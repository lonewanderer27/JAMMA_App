import { atom, selector } from "recoil";
import { Order, OrderType } from "../types/jamma";
import { getOrders } from "../utils/order";
import { profileState } from "./atoms";

export const ordersAtom = selector<OrderType[] | []>({
  key: 'orders',
  get: async ({get}) => {
    const profile = get(profileState);
    if (profile != null) {
      const { data: orders } = await getOrders(profile!.id);
      return orders as unknown as OrderType[];
    } else {
      return [];
    }
  }
})