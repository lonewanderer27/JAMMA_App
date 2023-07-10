import { Database } from "./supabase";
import { ReactNode } from "react";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type CartItem = {
  product_id: number;
  quantity: number;
  created_at: string;
  checked: boolean;
};
export type Cart = Database["public"]["Tables"]["cart"]["Row"];
export type Brand = Database["public"]["Tables"]["brands"]["Row"];
export type User = Database["public"]["Tables"]["profiles"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Sales = Database["public"]["Tables"]["sales"]["Row"];
export type DeliveryAddress =
  Database["public"]["Tables"]["delivery_addresses"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Coupon = Database["public"]["Tables"]["coupons"]["Row"];
export type PaymentOption =
  Database["public"]["Tables"]["payment_options"]["Row"];
export type PaymentStatus =
  Database["public"]["Tables"]["payment_statuses"]["Row"];
export type DeliveryStatus =
  Database["public"]["Tables"]["delivery_statuses"]["Row"];
export type OrderStatus = Database["public"]["Tables"]["orders_status"]["Row"];
export type RecentlyViewed =
  Database["public"]["Tables"]["recently_viewed"]["Row"];

export type NewDeliveryAddress = {
  address_line2: string;
  barangay: string;
  city: string;
  country: string;
  label: string;
  name: string;
  phone_number: string;
  postal_code: string;
  province: string;
  region: string;
  user_id: string;
};

export type CredInput = {
  email: string;
  password: string;
  fullname: string;
};

export enum Categories {
  Earphone = "earphone",
  Smartwatch = "smartwatch",
  Headphone = "headphone",
  Storage = "storage",
  Accessory = "accessory",
  Subscription = "subscription",
  All = "",
}

export enum CategoriesID {
  Earphone = 1,
  Smartwatch = 2,
  Headphone = 3,
  Storage = 4,
  Accessory = 5,
  Subscription = 6,
}

export interface CartItemType extends Product {
  quantity: number;
  subprice: number;
}

export interface LoadingProps<T> {
  loading?: boolean;
  fullScreen?: boolean;
  component?: boolean;
  circle?: boolean;
  children: ReactNode;
}

export const PaymentOptions = new Map([
  ["cod", "Cash on Delivery"],
  ["gcash", "GCash"],
  ["paymaya", "PayMaya"],
  ["creditcard", "Credit Card"],
  ["debitcard", "Debit Card"],
  ["coinsph", "Coins.ph"],
  ["grabpay", "GrabPay"],
  ["lazadawallet", "Lazada Wallet"],
  ["shopeepay", "ShopeePay"],
  ["applepay", "Apple Pay"],
  ["googlepay", "Google Pay"],
]);

// For Order Class

export interface OrderedProduct {
  product_id: number;
  quantity: number;
}

export type ExcludeProducts = Omit<Order, "products">;

export interface OrderType extends ExcludeProducts {
  products: {
    products: OrderedProduct[];
  };
}
