import { client } from "../client";

export const fetchVouchers = () => {
  return client
          .from('coupons')
          .select('*')
}