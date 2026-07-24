import {Link, useLocation, Navigate} from 'react-router-dom';
import {formatEtb} from '../data/catalog.js';
import {startBridge} from '../bridge.js';

startBridge();

export default function PaymentSuccess() {
  const {state} = useLocation();
  const payment = state?.payment;
  const amount = state?.amount;
  const itemCount = state?.itemCount;

  if (!payment || payment.ok === false) {
    return <Navigate to="/checkout" replace />;
  }

  const reference = payment.reference || '—';
  const paidAmount = payment.amount ?? amount;

  return (
    <div className="stack success-page">
      <div className="panel success-card stack">
        <div className="success-icon" aria-hidden="true">
          ✓
        </div>
        <p className="eyebrow">Bole Mart</p>
        <h1>Payment successful</h1>
        <p className="lede">
          Your Awash PIN authorized this order. A receipt reference is below.
        </p>

        <dl className="success-facts">
          {paidAmount != null ? (
            <div>
              <dt>Amount</dt>
              <dd>{formatEtb(paidAmount)}</dd>
            </div>
          ) : null}
          <div>
            <dt>Reference</dt>
            <dd className="mono">{reference}</dd>
          </div>
          {itemCount ? (
            <div>
              <dt>Items</dt>
              <dd>{itemCount}</dd>
            </div>
          ) : null}
          <div>
            <dt>Status</dt>
            <dd className="ok-text">Paid</dd>
          </div>
        </dl>

        <div className="success-actions">
          <Link className="button" to="/products">
            Continue shopping
          </Link>
          <Link className="button secondary" to="/">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
