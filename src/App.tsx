import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Accessories from "./pages/Accessories";
import AllProducts from "./pages/AllProducts";
import { AuthWrapper } from "./components/ProtectedRoute";
import { Box } from "@chakra-ui/react";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Earphone from "./pages/Earphone";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Me from "./pages/Me";
import Messages from "./pages/Messages";
import MyOrders from "./pages/MyOrders";
import Navbar from "./components/Navbar";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import OrderView from "./components/Order/OrderView";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProductDetail from "./pages/ProductDetail";
import RecentlyViewed from "./pages/RecentlyViewed";
import Signup from "./pages/Signup";
import Smartwatch from "./pages/Smartwatch";
import ToC from "./pages/ToC";
import { sessionState } from "./atoms/atoms";
import { useRecoilValue } from "recoil";

function App() {
  const session = useRecoilValue(sessionState);

  return (
    <Box bg="gray.50" height="100%">
      <BrowserRouter>
        <Navbar />
        <Box padding={5}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<AllProducts />} />
            <Route
              path="/login"
              element={session ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={session ? <Navigate to="/" /> : <Signup />}
            />

            {/* Protected Routes */}
            <Route element={<AuthWrapper />}>
              <Route path="/messages" element={<Messages />} />
              <Route path="/my_orders" element={<MyOrders />} />
              <Route path="/me" element={<Me />} />
              <Route path="/my_orders/:order_id" element={<OrderView />} />
              <Route path="/recently_viewed" element={<RecentlyViewed />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route path="/earphone" element={<Earphone />} />
            <Route path="/accessory" element={<Accessories />} />
            <Route path="/Smartwatch" element={<Smartwatch />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:product_id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy_policy" element={<PrivacyPolicy />} />
            <Route path="/news" element={<News />} />
            <Route path="/toc" element={<ToC />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <Box padding={5}>
          <Footer />
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
