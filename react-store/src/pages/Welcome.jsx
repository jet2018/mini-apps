import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ChoogaBridge, {displayNameFromUser, startBridge} from '../bridge.js';

export default function Welcome() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => ChoogaBridge.getState());

  useEffect(() => {
    startBridge();
    return ChoogaBridge.subscribe(setState);
  }, []);

  const name = displayNameFromUser(state.user);

  return (
    <div className="stack welcome-panel">
      <div className="panel stack">
        <p className="eyebrow">Chooga Store</p>
        <h1>Welcome, {name}</h1>
        <p className="muted">
          {state.hostConnected
            ? 'You are signed in through Awash. Choose how you want to continue.'
            : 'Running in demo mode. Choose how you want to continue.'}
        </p>
        <div className="choice-grid">
          <button type="button" onClick={() => navigate('/products')}>
            Browse products
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => navigate('/checkout')}>
            View cart / checkout
          </button>
        </div>
        {state.hostConnected ? (
          <button
            type="button"
            className="secondary"
            onClick={() => ChoogaBridge.close()}>
            Close mini-app
          </button>
        ) : null}
      </div>
      <p className="muted">
        Or jump ahead: <Link to="/products">products</Link>
      </p>
    </div>
  );
}
