import { Database } from "./supabase";

export type Product = Database["public"]["Tables"]["products"]["Row"]
export type LocalCart = {
  product_id: number,
  quantity: number,
  created_at: string
}
export type Cart = Database["public"]["Tables"]["cart"]["Row"]
export type Brand = Database["public"]["Tables"]["brands"]["Row"]
export type User = Database["public"]["Tables"]["profiles"]["Row"]
export type Order = Database["public"]["Tables"]["orders"]["Row"]
export type Category = Database["public"]["Tables"]["categories"]["Row"]
export type Review = Database["public"]["Tables"]["reviews"]["Row"]
export type Sales = Database["public"]["Tables"]["sales"]["Row"]
export type ShippingInfo = Database["public"]["Tables"]["shipping_info"]["Row"]

export type CredInput = {
  email: string,
  password: string,
  fullname: string
}

export enum Categories {
  Earphone = 'earphone',
  Smartwatch = 'smartwatch',
  All = ''
}

export interface CartItemType extends Product {
  quantity: number,
  subprice: number
}