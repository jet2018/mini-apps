import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {startBridge} from './bridge.js';
import {getCart, subscribeCart} from './cart.js';
import AppNav from './components/AppNav.jsx';
import Welcome from './pages/Welcome.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Checkout from './pages/Checkout.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import './index.css';

export default function App() {
  const [cartCount, setCartCount] = useState(() => getCart().cartCount);

  useEffect(() => {
    startBridge();
    setCartCount(getCart().cartCount);
    return subscribeCart(snap => setCartCount(snap.cartCount));
  }, []);

  return (
    <div className="app-shell">
      <div className="app-main">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/paid" element={<PaymentSuccess />} />
        </Routes>
      </div>
      <AppNav cartCount={cartCount} />
    </div>
  );
}
