import { atom, selector } from "recoil";
import { Coupon } from "../types/jamma";
import { fetchVouchers } from "../utils/vouchers";

export const vouchersAtom = atom<Coupon[] | []>({
  key: 'vouchers',
  default: selector({
    key: 'vouchers/selector',
    get: async () => {
      const { data: vouchers } = await fetchVouchers();
      return vouchers as Coupon[];
    }
  }),
})