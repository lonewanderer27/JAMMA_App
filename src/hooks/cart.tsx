import { useEffect, useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { errorState, loadingState } from "../atoms/atoms";
import { cartAtom, cartPriceAtom, cartCountAtom } from "../atoms/cart";
import { isAllCheckedAtom, cartProductsAtom } from "../atoms/checkout";
import { getProductsFromCart } from "../utils/cart";


export const useCart = () => {
  const cart = useRecoilValue(cartAtom);
  const cartPrice = useRecoilValue(cartPriceAtom);
  const cartCount = useRecoilValue(cartCountAtom);
  const isAllChecked = useRecoilValue(isAllCheckedAtom);
  const [products, setProducts] = useRecoilState(cartProductsAtom);
  const [error, setError] = useRecoilState(errorState)
  const [isLoading, setIsLoading] = useRecoilState(loadingState)
  const prevCartLength = useRef(0);
  
  useEffect(() => {
    // only refetch the products data
    // if the cart length has changed
    if (cart.length > 0 && cart.length !== prevCartLength.current) {
      console.log("Refetching cart data...")

      const fetchData = async () => {
        setIsLoading(true);
  
        const { data: productsData, error: productsError } = await getProductsFromCart(cart)
  
        if (productsError) {
          setError(productsError);
        }
  
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setProducts(productsData!);
        setError(null);
      };
  
      fetchData();
      setIsLoading(false);
    }

    prevCartLength.current = cart.length;
  }, [cart.length, cart, setProducts, setError, setIsLoading])

  return { 
    cart,
    products, 
    totalPrice: cartPrice,
    totalCount: cartCount, 
    isAllChecked,
    error, 
    isLoading 
  };
}