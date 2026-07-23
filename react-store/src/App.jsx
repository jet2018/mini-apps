import {useEffect, useState} from 'react';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import ChoogaBridge, {startBridge} from './bridge.js';
import Welcome from './pages/Welcome.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Checkout from './pages/Checkout.jsx';
import './index.css';

export default function App() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const showChrome = location.pathname !== '/';

  useEffect(() => {
    startBridge();
    const unsub = ChoogaBridge.subscribe(state => {
      const count = state.params?.cartCount;
      if (typeof count === 'number') setCartCount(count);
    });
    const stopCart = ChoogaBridge.on('cart.updated', detail => {
      if (detail?.cartCount != null) setCartCount(detail.cartCount);
    });
    ChoogaBridge.call('cart.get', {})
      .then(res => {
        if (res?.cartCount != null) setCartCount(res.cartCount);
      })
      .catch(() => {});
    return () => {
      unsub();
      stopCart();
    };
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
      </Routes>
    </div>
  );
}
