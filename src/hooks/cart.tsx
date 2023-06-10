import { useEffect, useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { localCartState, productsState, errorState, loadingState } from "../atoms";
import { supabase } from "../client";

export const useFetchLocalCart = () => {
  console.log("useFetchLocalCart:")

  const cart = useRecoilValue(localCartState);
  const [data, setData] = useRecoilState(productsState);
  const [error, setError] = useRecoilState(errorState)
  const [isLoading, setIsLoading] = useRecoilState(loadingState)
  const prevCartLength = useRef(0);
  
  useEffect(() => {
    if (cart.length > 0 && cart.length > prevCartLength.current) {
      console.log("Refetching cart data...")

      const fetchData = async () => {
        setIsLoading(true);
  
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .in('id', cart.map((item) => item.product_id));
  
        if (productsError) {
          setError(productsError);
        }
  
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setData(productsData!);
        setError(null);
      };
  
      fetchData();
      setIsLoading(false);
    }

    prevCartLength.current = cart.length;
  }, [cart.length])

  return { data, error, isLoading };
}