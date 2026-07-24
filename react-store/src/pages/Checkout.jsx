import {useEffect, useMemo, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ChoogaBridge, {displayNameFromUser, startBridge} from '../bridge.js';
import {clearCart, getCart, subscribeCart} from '../cart.js';
import {formatEtb} from '../data/catalog.js';

export default function Checkout() {
  const navigate = useNavigate();
  const [bridge, setBridge] = useState(() => ChoogaBridge.getState());
  const [cart, setCart] = useState(() => getCart());
  const [paying, setPaying] = useState(false);

  const name = displayNameFromUser(bridge.user);

  useEffect(() => {
    startBridge();
    const unsub = ChoogaBridge.subscribe(setBridge);
    setCart(getCart());
    const stopCart = subscribeCart(setCart);
    return () => {
      unsub();
      stopCart();
    };
  }, []);

  const totalLabel = useMemo(() => {
    if (cart.total != null) return Number(cart.total);
    return cart.items.reduce(
      (sum, row) => sum + Number(row.price || 0) * Number(row.quantity || 0),
      0,
    );
  }, [cart]);

  const pay = async () => {
    if (paying) return;
    if (!cart.items.length) {
      ChoogaBridge.toast('Your cart is empty', 'error');
      return;
    }
    setPaying(true);
    const itemCount = cart.cartCount || cart.items.length;
    const amount = totalLabel;
    try {
      const payment = await ChoogaBridge.payments.initiate({
        amount,
        currency: 'ETB',
        reference: `bole_${Date.now().toString(36)}`,
        description: `Bole Mart · ${name}`,
        metadata: {itemCount},
      });
      if (payment?.ok === false) {
        ChoogaBridge.toast(payment?.reason || 'Payment cancelled', 'error');
        return;
      }
      clearCart();
      navigate('/paid', {
        replace: true,
        state: {payment, amount, itemCount},
      });
    } catch (e) {
      const reason = e?.result?.reason || e?.message || 'Payment failed';
      ChoogaBridge.toast(reason, 'error');
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="stack">
      <Link to="/products">← Continue shopping</Link>
      <div className="panel stack">
        <h1>Checkout</h1>
        <p className="muted">
          Paying as <strong>{name}</strong>. Awash will ask for your PIN.
        </p>

        {!cart.items.length ? (
          <p className="muted">Cart is empty. Add something from the market.</p>
        ) : (
          <ul className="cart-list">
            {cart.items.map(item => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span className="muted">
                  ×{item.quantity} · {formatEtb(item.price)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="price">{formatEtb(totalLabel)}</p>

        <div className="checkout-actions">
          <button
            type="button"
            disabled={paying || !cart.items.length}
            onClick={pay}>
            {paying ? 'Waiting for PIN…' : 'Pay with Awash'}
          </button>
          <button
            type="button"
            className="secondary"
            disabled={paying || !cart.items.length}
            onClick={() => {
              clearCart();
              ChoogaBridge.toast('Cart cleared');
            }}>
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
