import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ChoogaBridge, {displayNameFromUser, startBridge} from '../bridge.js';
import {getCart} from '../cart.js';
import {ShoppingCart, Store} from '../icons.jsx';

export default function Welcome() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => ChoogaBridge.getState());
  const [cartCount, setCartCount] = useState(() => getCart().cartCount);

  useEffect(() => {
    startBridge();
    setCartCount(getCart().cartCount);
    return ChoogaBridge.subscribe(setState);
  }, []);

  const name = displayNameFromUser(state.user);

  return (
    <div className="stack welcome-page">
      <div className="stack">
        <h1>Welcome, {name}</h1>
        <p className="lede">
          Shop coffee, spices, and staples — pay with your Awash PIN.
        </p>
      </div>

      <div className="menu-grid">
        <button type="button" className="menu-card" onClick={() => navigate('/products')}>
          <span className="menu-icon">
            <Store size={26} strokeWidth={2} />
          </span>
          <span className="menu-copy">
            <strong>Browse market</strong>
            <span className="muted">Coffee, spices, pantry</span>
          </span>
        </button>
        <button type="button" className="menu-card" onClick={() => navigate('/checkout')}>
          <span className="menu-icon">
            <ShoppingCart size={26} strokeWidth={2} />
          </span>
          <span className="menu-copy">
            <strong>Cart &amp; checkout</strong>
            <span className="muted">
              {cartCount ? `${cartCount} item${cartCount === 1 ? '' : 's'}` : 'Empty cart'}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
