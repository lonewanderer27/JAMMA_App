import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard";
import { useFetchProducts } from "../hooks/products";
import { Categories } from "../types/jamma";

export default function Earphone(){
  const { data: products, isLoading, error } = useFetchProducts(Categories.Earphone);

  return (
    <div>
      <Navbar/>
      <h1>Earphones</h1>
      {products !== undefined && products.map((product) => (
        <ProductCard 
          key={product.id} 
          brand_id={product.brand_id} 
          category_id={product.category_id} 
          description={product.description} 
          id={product.id} 
          image_url={product.image_url} 
          last_stock={product.last_stock} 
          name={product.name} 
          price={product.price} 
          stock={product.stock} 
          video_url={product.video_url}          
        />
      ))}
    </div>
  )
}