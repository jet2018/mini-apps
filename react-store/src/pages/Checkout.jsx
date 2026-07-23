import {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import ChoogaBridge, {displayNameFromUser, startBridge} from '../bridge.js';
import {formatEtb} from '../data/catalog.js';

export default function Checkout() {
  const [bridge, setBridge] = useState(() => ChoogaBridge.getState());
  const [cart, setCart] = useState({items: [], cartCount: 0, total: 0});
  const [paying, setPaying] = useState(false);
  const [result, setResult] = useState(null);

  const name = displayNameFromUser(bridge.user);

  useEffect(() => {
    startBridge();
    const unsub = ChoogaBridge.subscribe(setBridge);
    const stopCart = ChoogaBridge.on('cart.updated', detail => {
      if (detail?.items) setCart(detail);
    });
    ChoogaBridge.call('cart.get', {})
      .then(snapshot => {
        if (snapshot?.items) setCart(snapshot);
      })
      .catch(() => {});
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
    setResult(null);
    try {
      const payment = await ChoogaBridge.payments.initiate({
        amount: totalLabel,
        currency: 'ETB',
        reference: `bole_${Date.now().toString(36)}`,
        description: `Bole Mart · ${name}`,
        metadata: {itemCount: cart.cartCount || cart.items.length},
      });
      setResult(payment);
      if (payment?.ok !== false) {
        await ChoogaBridge.call('cart.clear', {}).catch(() => {});
        setCart({items: [], cartCount: 0, total: 0});
        ChoogaBridge.toast('Payment authorized', 'success');
      } else {
        ChoogaBridge.toast(payment?.reason || 'Payment cancelled', 'error');
      }
    } catch (e) {
      const payload = e?.result || {ok: false, reason: e?.message || 'failed'};
      setResult(payload);
      ChoogaBridge.toast(payload.reason || 'Payment failed', 'error');
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

        <div className="row">
          <button
            type="button"
            disabled={paying || !cart.items.length}
            onClick={pay}>
            {paying ? 'Waiting for PIN…' : 'Pay with Awash'}
          </button>
          <button
            type="button"
            className="secondary"
            disabled={!cart.items.length}
            onClick={async () => {
              await ChoogaBridge.call('cart.clear', {});
              setCart({items: [], cartCount: 0, total: 0});
              ChoogaBridge.toast('Cart cleared');
            }}>
            Clear cart
          </button>
        </div>

        {result ? (
          <div>
            <h3>Payment result</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}
