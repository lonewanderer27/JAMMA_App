import {
  CategoriesID,
  Category,
  Product,
  RecentlyViewed,
  Review,
} from "../types/jamma";
import { atom, selector, selectorFamily } from "recoil";
import {
  fetchCategories,
  fetchProducts,
  fetchRecentProducts,
  fetchRecentlyViewed,
  getReviews,
} from "../utils/products";
import { log, profileState } from "./atoms";

export const categoriesAtom = atom<Category[] | []>({
  key: "categories",
  default: selector({
    key: "categories/selector",
    get: async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data: categories } = await fetchCategories();
      return categories as Category[];
    },
  }),
});

export const productsAtom = selectorFamily<
  Product[] | [],
  CategoriesID | undefined
>({
  key: "products",
  get: (category) => async () => {
    const { data: products } = await fetchProducts(category);
    return (products as Product[]) || ([] as Product[]);
  },
});

export const productsState = atom<Product[] | []>({
  key: "products",
  default: [],
  effects: [
    ({ onSet }) => onSet((newProducts) => log("products", newProducts)),
  ],
});

export const productState = atom<Product | null>({
  key: "product",
  default: null,
  effects: [({ onSet }) => onSet((newProduct) => log("product", newProduct))],
});

export const productReviews = selector<Review[]>({
  key: "product/reviews",
  get: async ({ get }) => {
    const product = get(productState);
    if (product == null) return [] as Review[];

    const { data } = await getReviews(product?.id as number);
    return data as Review[];
  },
});

export const averageRating = selector<number>({
  key: "product/averageRating",
  get: async ({ get }) => {
    const pr = get(productReviews);
    if (pr.length == 0) return 0;

    const averageRating = Math.round(
      pr.reduce((acc, cur) => acc + cur.product_rating, 0) / pr.length
    );
    return averageRating;
  },
});

export const recentlyViewedAtom = selector<RecentlyViewed[] | []>({
  key: "recentlyViewed",
  get: async ({ get }) => {
    const profile = get(profileState);
    if (!profile) return [];

    const { data } = await fetchRecentlyViewed(profile!.id);
    return data as RecentlyViewed[];
  },
});

export const recentlyViewedProducts = selector<Product[] | []>({
  key: "products/recentlyViewed",
  get: async ({ get }) => {
    const rv = get(recentlyViewedAtom);
    if (rv.length == 0) return [] as Product[];

    const { data } = await fetchRecentProducts(
      rv.map((p) => p.product_id + "")
    );
    return data as Product[];
  },
});

// this atom is used to cache products
// so that we don't have to fetch them again from supabase every time
export const productsCache = atom<Product[] | []>({
  key: "products/cache",
  default: [],
});
