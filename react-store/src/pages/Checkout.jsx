import {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import ChoogaBridge, {displayNameFromUser, startBridge} from '../bridge.js';

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
      if (detail?.items) {
        setCart(detail);
      }
    });
    (async () => {
      try {
        const snapshot = await ChoogaBridge.call('cart.get', {});
        if (snapshot?.items) {
          setCart(snapshot);
        }
      } catch (_) {
        /* host may not grant cart in browser mock until call resolves */
      }
    })();
    return () => {
      unsub();
      stopCart();
    };
  }, []);

  const totalLabel = useMemo(() => {
    if (cart.total != null) {
      return Number(cart.total).toFixed(2);
    }
    return cart.items
      .reduce(
        (sum, row) => sum + Number(row.price || 0) * Number(row.quantity || 0),
        0,
      )
      .toFixed(2);
  }, [cart]);

  const pay = async () => {
    if (paying) return;
    if (!cart.items.length) {
      ChoogaBridge.toast('Your cart is empty', 'error');
      return;
    }
    setPaying(true);
    setResult(null);
    ChoogaBridge.showProgress({message: 'Preparing payment…'});
    try {
      const payment = await ChoogaBridge.payments.initiate({
        amount: totalLabel,
        currency: 'ETB',
        reference: `store_${Date.now().toString(36)}`,
        description: `Checkout for ${name}`,
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
      ChoogaBridge.dismissProgress();
      setPaying(false);
    }
  };

  return (
    <div className="stack">
      <Link to="/products">← Continue shopping</Link>
      <div className="panel stack">
        <h1>Checkout</h1>
        <p className="muted">
          Paying as <strong>{name}</strong>. Host will ask for your PIN to
          authorize.
        </p>

        {!cart.items.length ? (
          <p className="muted">Cart is empty. Add a product first.</p>
        ) : (
          <ul className="cart-list">
            {cart.items.map(item => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span className="muted">
                  ×{item.quantity} · $
                  {Number(item.price || 0).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="price">Total ${totalLabel}</p>

        <div className="row">
          <button type="button" disabled={paying || !cart.items.length} onClick={pay}>
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
