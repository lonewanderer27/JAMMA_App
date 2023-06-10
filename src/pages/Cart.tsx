import CartItem from "../components/CartItem";
import Navbar from "../components/Navbar";
import { useFetchLocalCart } from "../hooks/cart";
import { calculateTotalPrice } from "../utils/cart";


export default function Cart() {
  const { data: products, isLoading, error } = useFetchLocalCart();

  if (isLoading || error) {
    return <>Loading...</>
  } else if (products.length === 0) {
    return (
      <div>
        <Navbar/>
        <h1>Your Cart</h1>
        <h2>There are no items in your cart</h2>
      </div>
    )
  } else {
    return (
      <div>
        <Navbar/>
        <h1>Your Cart</h1>
        {products.map((product) => (
          <CartItem 
            quantity={1}
            key={product.id} 
            brand_id={product.brand_id} 
            category_id={product.category_id} 
            description={product.description} 
            id={product.id} 
            image_url={product.image_url} 
            last_stock={product.last_stock} 
            name={product.name} 
            price={product.price} 
            subprice={1 * product.price}
            stock={product.stock} 
            video_url={product.video_url}          
          />
        ))}
        <div>
          <h2>Total: {calculateTotalPrice(products)}</h2>
        </div>
      </div>
    )
  }
}