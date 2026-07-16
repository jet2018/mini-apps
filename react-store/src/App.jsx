import { Link, Route, Routes } from 'react-router-dom';
import HostPanel from './components/HostPanel.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Checkout from './pages/Checkout.jsx';
import './index.css';

export default function App() {
  return (
    <div className="app-shell">
      <header className="topnav">
        <div className="brand">Chooga · React Store</div>
        <nav className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>

      <HostPanel />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}
