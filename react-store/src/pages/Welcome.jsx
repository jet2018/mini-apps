import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
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
    <div className="welcome-hero">
      <div className="welcome-card stack">
        <p className="eyebrow">Bole Mart</p>
        <h1>Welcome, {name}</h1>
        <p className="lede">
          Shop coffee, spices, and everyday staples from Addis sellers — checkout
          with your Awash PIN.
        </p>
        <div className="choice-grid">
          <button type="button" onClick={() => navigate('/products')}>
            Browse market
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => navigate('/checkout')}>
            Cart &amp; checkout
          </button>
        </div>
        {state.hostConnected ? (
          <button
            type="button"
            className="ghost"
            onClick={() => ChoogaBridge.close()}>
            Close mini-app
          </button>
        ) : null}
      </div>
    </div>
  );
}
