import { client } from "../client";
import { Database } from "../types/supabase";

export function fetchPaymentOpts(){
  return client
          .from('payment_options')
          .select('*')
          // .eq('enabled', true)
}

export function fetchCOD(){
  return client
          .from('payment_options')
          .select('*')
          .eq('enabled', true)
          .eq('short_name', 'cod')
          .single()
}

export function addOrder(order: Database['public']['Tables']['orders']['Insert']){
  return client
          .from('orders')
          .insert(order)
          .select()
          .single()
}

export function getOrder(order_id: number, user_id?: string){
  if (user_id) {
    return client
            .from('orders')
            .select('*')
            .eq('id', order_id)
            .eq('user_id', user_id)
            .single()
  } else {
    return client
            .from('orders')
            .select('*')
            .eq('id', order_id)
            .single()
  }
}

export function getOrders(user_id: string){
  return client
          .from('orders')
          .select('*')
          .eq('user_id', user_id)
          .not('products', 'is', 'null')
          .order('order_date', { ascending: false })
}

export function getOrdersStatus(id: number){
  return client
          .from('orders_status')
          .select('*')
          .eq('id', id)
          .single()
}

export function getOrderStatus(id: number) {
  return client
          .from('orders_status')
          .select('*')
          .eq('id', id)
          .single()
}

export function getDeliveryAddress(id: number) {
  return client
          .from("delivery_addresses")
          .select("*")
          .eq("id", id)
          .single()
}

export function getPaymentOption(id: number){
  return client
          .from('payment_options')
          .select('*')
          .eq('id', id)
          .single()
}

export function getPaymentStatus(id: number){
  return client
          .from('payment_statuses')
          .select('*')
          .eq('id', id)
          .single()
}

export function getCoupon(id: number){
  return client
          .from('coupons')
          .select('*')
          .eq('id', id)
          .single()
}

export function getOrderedProducts(ids: number[]){
  return client
          .from('products')
          .select('*')
          .in('id', ids)
}