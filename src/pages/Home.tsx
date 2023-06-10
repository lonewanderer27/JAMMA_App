import '../App.css'

import { sessionState, userState } from '../atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useFetchProducts }from '../hooks/products';

export default function Home() {
  const [session, setSession] = useRecoilState(sessionState);
  const { data: products, isLoading, error } = useFetchProducts();
  
  const setUser = useSetRecoilState(userState);

  function handleLogout() {
    setSession(undefined);
    setUser(undefined);
  }

  return (
    <>
      <Navbar/>
      {session !== undefined && <h1>Welcome User</h1>}
      {session === undefined && <h1>Homepage!</h1>}
      <div className="card">
        {session === undefined && <>
          <Link to="login">
            <button>
              Login
            </button>
          </Link>
          <Link to="signup">
            <button>
              Signup
            </button>
          </Link>
        </>}
        {session !== undefined && 
          <button onClick={() => handleLogout()}>
            Logout
          </button>}
      </div>
      {session === undefined && <p className="read-the-docs">
        It looks like you're not logged in yet. <br/>
        Click the button above to do so!
      </p>}
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
    </>
  )
}