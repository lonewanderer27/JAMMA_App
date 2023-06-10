import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import About from "./pages/About";
import Earphone from './pages/Earphone';
import Home from './pages/Home';
import Login from './pages/Login';
import Me from './pages/Me';
import Messages from './pages/Messages';
import Orders from './pages/Orders';
import Signup from "./pages/Signup";
import Smartwatch from './pages/Smartwatch';
import { sessionState } from './atoms';
import { useRecoilValue } from 'recoil';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  const session = useRecoilValue(sessionState);

  return (
    <BrowserRouter>
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
        <Route 
          path="/messages" 
          element={!session ? <Navigate to="/login"/> : <Messages/>}
        />
        <Route 
          path="/orders" 
          element={!session ? <Navigate to="/login"/> : <Orders/>}
        />
        <Route 
          path="/me" 
          element={!session ? <Navigate to="/login"/> : <Me/>}
        />
        <Route 
          path="/earphone" 
          element={<Earphone/>}
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
