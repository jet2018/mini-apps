import {useEffect, useState} from 'react';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import ChoogaBridge, {startBridge} from './bridge.js';
import {getCart, subscribeCart} from './cart.js';
import Welcome from './pages/Welcome.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Checkout from './pages/Checkout.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import './index.css';

export default function App() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(() => getCart().cartCount);
  const showChrome = location.pathname !== '/';

  useEffect(() => {
    startBridge();
    setCartCount(getCart().cartCount);
    return subscribeCart(snap => setCartCount(snap.cartCount));
  }, []);

  return (
    <div className="app-shell">
      {showChrome ? (
        <header className="topnav">
          <Link to="/" className="brand">
            <span className="mark">BM</span>
            Bole Mart
          </Link>
          <nav className="nav-links">
            <Link to="/products">Market</Link>
            <Link to="/checkout">Cart ({cartCount})</Link>
            <button
              type="button"
              className="ghost"
              onClick={() => ChoogaBridge.close()}>
              Close
            </button>
          </nav>
        </header>
      ) : null}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/paid" element={<PaymentSuccess />} />
      </Routes>
    </div>
  );
}
