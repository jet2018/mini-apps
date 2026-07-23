import {NavLink} from 'react-router-dom';
import ChoogaBridge from '../bridge.js';
import {House, ShoppingCart, Store, X} from '../icons.jsx';

export default function AppNav({cartCount = 0}) {
  return (
    <nav className="app-nav" aria-label="Main">
      <NavLink to="/" end className={({isActive}) => (isActive ? 'nav-item on' : 'nav-item')}>
        <House size={22} strokeWidth={2.1} />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/products"
        className={({isActive}) => (isActive ? 'nav-item on' : 'nav-item')}>
        <Store size={22} strokeWidth={2.1} />
        <span>Market</span>
      </NavLink>
      <NavLink
        to="/checkout"
        className={({isActive}) => (isActive ? 'nav-item on' : 'nav-item')}>
        <span className="nav-icon-wrap">
          <ShoppingCart size={22} strokeWidth={2.1} />
          {cartCount > 0 ? <span className="nav-badge">{cartCount}</span> : null}
        </span>
        <span>Cart</span>
      </NavLink>
      <button
        type="button"
        className="nav-item"
        onClick={() => ChoogaBridge.close()}>
        <X size={22} strokeWidth={2.1} />
        <span>Close</span>
      </button>
    </nav>
  );
}
