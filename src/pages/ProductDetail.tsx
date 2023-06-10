/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Product from "../components/ProductCard";
import { useFetchProduct } from "../hooks/products";

export default function ProductDetail(){
  const { product_id } = useParams();
  const { data: ProductData, error, isLoading } = useFetchProduct(product_id!);

  
  if (error || isLoading || ProductData === null) {
    return (
      <div>
        <Navbar/>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error</h1>}
      </div>
    )
  } else {
    return (
      <div>
        <Navbar/>
        <Product
          key={ProductData!.id}
          brand_id={ProductData!.brand_id}
          category_id={ProductData!.category_id}
          description={ProductData!.description}
          id={ProductData!.id}
          image_url={ProductData!.image_url}
          last_stock={ProductData!.last_stock}
          name={ProductData!.name}
          price={ProductData!.price}
          stock={ProductData!.stock}
          video_url={ProductData!.video_url}
        />
      </div>
    )
  }  
}