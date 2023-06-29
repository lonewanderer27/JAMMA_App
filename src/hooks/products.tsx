import { useEffect, useRef } from "react"
import { client } from "../client";
import { useRecoilState, useRecoilValue } from "recoil";
import { errorState, loadingState } from "../atoms/atoms";
import { productState, productsState } from "../atoms/products";
import { Categories } from "../types/jamma";
import { fetchProduct } from "../utils/products";

export const useFetchProducts = (category: Categories = Categories.All) => {
  const [data, setData] = useRecoilState(productsState);
  const [error, setError] = useRecoilState(errorState)
  const [isLoading, setIsLoading] = useRecoilState(loadingState)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      let categoryId: number;

      if (category !== Categories.All) {
        const { data: categoryIdData, error: categoryIdError } = await client
          .from('categories')
          .select('id')
          .eq('name', category)
          .single();

        if (categoryIdError) {
          setError(categoryIdError);
        }

        categoryId = categoryIdData!.id;

        const { data: productsData, error: productsError } = await client
        .from('products')
        .select('*')
        .eq('category_id', categoryId);

        if (productsError) {
          setError(productsError);
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setData(productsData!);
        setError(null);
      } else {
        const { data: productsData, error: productsError } = await client
        .from('products')
        .select('*');

        if (productsError) {
          setError(productsError);
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setData(productsData!);
        setError(null);
      }
      setIsLoading(false);
    }

    fetchData()
  }, [])

  return {data, error, isLoading}
}

export const useFetchProduct = (id: string) => {
  const products = useRecoilValue(productsState);
  const [data, setData] = useRecoilState(productState);
  const [error, setError] = useRecoilState(errorState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  useEffect(() => {
    const fetchData = async () => {
      const product = products.find((product) => product.id === parseInt(id));
      
      // if we have the product in the products state, we can just set the data
      if (product != undefined) {
        console.log("product found in products collection")
        setData(product);
        return;
      } else if (data?.id == parseInt(id)) {
        // if the product is already in the data state, we don't need to fetch it again
        console.log("product found in product state")
        return;
      } else if (data?.id != parseInt(id)) {
        setIsLoading(true);
        const { data, error } = await fetchProduct(id);
        if (error) {
          setError(error);
        } else {
          setData(data);
        }
        setIsLoading(false);
      }
    }

    fetchData()
  }, [id, products])

  return {data, error, isLoading}
}