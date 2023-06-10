import { supabase } from "../client";

export const fetchProducts = () => {
  return supabase.from('products').select('*');
}

export const fetchProduct = async (id: string) => {
  return supabase.from('products').select('*').eq('id', id).single();
} 