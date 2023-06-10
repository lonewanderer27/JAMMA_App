import { useEffect } from "react"
import { supabase } from "../client";
import { useRecoilState } from "recoil";
import { errorState, loadingState, productState, productsState } from "../atoms";
import { Categories } from "../types/jamma";

export const useFetchProducts = (category: Categories = Categories.All) => {
  const [data, setData] = useRecoilState(productsState);
  const [error, setError] = useRecoilState(errorState)
  const [isLoading, setIsLoading] = useRecoilState(loadingState)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      let categoryId: number;

      if (category !== Categories.All) {
        const { data: categoryIdData, error: categoryIdError } = await supabase
          .from('categories')
          .select('id')
          .eq('name', category)
          .single();

        if (categoryIdError) {
          setError(categoryIdError);
        }

        categoryId = categoryIdData!.id;

        const { data: productsData, error: productsError } = await supabase
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
        const { data: productsData, error: productsError } = await supabase
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
  const [data, setData] = useRecoilState(productState);
  const [error, setError] = useRecoilState(errorState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) {
        setError(error);
      } else {
        setData(data);
      }
      setIsLoading(false);
    }

    fetchData()
  }, [id])

  return {data, error, isLoading}
}