import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';

import About from "./pages/About";
import Earphone from './pages/Earphone';
import Home from './pages/Home';
import Login from './pages/Login';
import Me from './pages/Me';
import Messages from './pages/Messages';
import MyOrders from './pages/MyOrders';
import Signup from "./pages/Signup";
import Smartwatch from './pages/Smartwatch';
import { sessionState } from './atoms/atoms';
import { useRecoilValue } from 'recoil';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Accessories from './pages/Accessories';
import Navbar from './components/Navbar';
import { Box } from '@chakra-ui/react';
import Footer from './components/Footer';
import OrderView from './components/Order/OrderView';
import NotFound from './pages/NotFound';
import RecentlyViewed from './pages/RecentlyViewed';
import { AuthWrapper } from './components/ProtectedRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import News from './pages/News';
import ToC from './pages/ToC';

function App() {
  const session = useRecoilValue(sessionState);

  return (
    <Box bg='gray.50' height="100%">
      <BrowserRouter>
        <Navbar/>
        <Box padding={5}>
          <Routes>
            <Route 
              path="/" 
              element={<Home/>}
            />
            <Route 
              path="/login" 
              element={session ? <Navigate to="/"/> : <Login/>}
            />
            <Route 
              path="/signup" 
              element={session ? <Navigate to="/"/> : <Signup/>}
            />
            
            {/* Protected Routes */}
            <Route element={<AuthWrapper/>}>
              <Route path="/messages" element={<Messages/>} />
              <Route path="/my_orders" element={<MyOrders/>} />
              <Route path="/me" element={<Me/>} />
              <Route path='/my_orders/:order_id' element={<OrderView/>}/>
              <Route path="/recently_viewed" element={<RecentlyViewed/>} />
              <Route path="/checkout" element={<Checkout/>} />
            </Route>
            <Route 
              path="/earphone" 
              element={<Earphone/>}
            />
            <Route
              path="/accessory"
              element={<Accessories/>}
            />
            <Route 
              path="/Smartwatch" 
              element={<Smartwatch/>}
            />
            <Route
              path="/cart"
              element={<Cart/>}
            />
            <Route 
              path="/product/:product_id"
              element={<ProductDetail/>}
            />
            <Route
              path="/about"
              element={<About/>}
            />
            <Route 
              path="/privacy_policy"
              element={<PrivacyPolicy/>}
            />
            <Route
              path="/news"
              element={<News/>}
            />
            <Route 
              path="/toc"
              element={<ToC/>}
            />
            <Route
              path="*"
              element={<NotFound/>}
            />
          </Routes>
        </Box>
        <Box padding={5}>
          <Footer/>
        </Box>
      </BrowserRouter>    
    </Box>
  )
}

export default App
