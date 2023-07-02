import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { client } from "../client";
import { CategoriesID } from "../types/jamma";
import { getSession } from "./user";

export const fetchRecentlyViewed = (user_id: string) => {
  return client.from('recently_viewed').select('*').eq('user_id', user_id);
}

export const fetchCategories = () => {
  return client.from('categories').select('*');
}

export const fetchRecentProducts = (ids: string[]) => {
  return client
          .from('products')
          .select('*')
          .in('id', ids)
}

export const fetchProducts = (
  category?: CategoriesID, 
  ids?: string[] | number[],
  ascending?: boolean
) =>
 {
  // user provided a list of product ids
  if (ids != undefined && ids.length > 0) {
    return client
            .from('products')
            .select('*')
            .in('id', ids)
            .order('name', { ascending: ascending });
  }

  // user selected a category
  if (category) {
    return client
            .from('products')
            .select('*')
            .eq('category_id', category)
            .order('name', { ascending: ascending });
  } 
  // get all products
  return client
          .from('products')
          .select('*')
          .order('name', { ascending: ascending });
}

export const fetchProduct = async (product_id: string) => {
  const session = getSession();
  const id = Number(product_id);
  const uid = session ? JSON.parse(session).user.id : null;
  if (session) {
    console.log("user_id is present, logging...")
    return client.rpc('get_product', { user_id:uid, product_id:id }).single() ;
  }
  console.log("user_id is not present, logging...")
  return client.from('products').select('*').eq('id', product_id).single();
}

// contains all reviews
export const getReviews = (product_id: number | string) => {
  return client.from('reviews').select('*').eq('product_id', product_id);
}

// the following are for fine grained data fetching
export const getAverageRating = (product_id: number) => {
  return client.rpc('get_average_rating', { product_id });
}
