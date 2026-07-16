import { useEffect, useState } from 'react';
import { ChoogaBridge } from '../chooga-bridge.js';

const EXTERNAL_DOCS = 'https://fakestoreapi.com/docs';

export default function HostPanel() {
  const [bridge, setBridge] = useState(() => ChoogaBridge.getState());

  useEffect(() => {
    ChoogaBridge.init();
    return ChoogaBridge.subscribe(setBridge);
  }, []);

  const tokenPreview = bridge.session?.token
    ? `${bridge.session.token.slice(0, 28)}…`
    : '—';

  return (
    <section className="host-panel">
      <details open>
        <summary>
          Host bridge{' '}
          <span className={`status-pill ${bridge.hostConnected ? '' : 'off'}`}>
            {bridge.hostConnected ? 'connected' : 'standalone'}
          </span>
        </summary>

        <div className="stack" style={{ marginTop: '0.75rem' }}>
          <div className="muted">
            Ready sent: {bridge.readySent ? 'yes' : 'no'} · Theme:{' '}
            {bridge.theme?.mode || '—'} / {bridge.theme?.primary_color || 'default'}
          </div>

          <div>
            <strong>Session</strong>
            <pre>{JSON.stringify({ token: tokenPreview, expires_at: bridge.session?.expires_at || null }, null, 2)}</pre>
          </div>

          <div>
            <strong>User</strong>
            <pre>{JSON.stringify(bridge.user || null, null, 2)}</pre>
          </div>

          <div>
            <strong>Safe area</strong>
            <pre>{JSON.stringify(bridge.safeArea || null, null, 2)}</pre>
          </div>

          <div>
            <strong>Last capability</strong>
            <pre>{JSON.stringify(bridge.lastCapability || null, null, 2)}</pre>
          </div>

          <div className="row">
            <button type="button" onClick={() => ChoogaBridge.requestCapability('user.identity')}>
              Request identity
            </button>
            <button type="button" onClick={() => ChoogaBridge.requestCapability('user.phone')}>
              Request phone
            </button>
            <button type="button" className="secondary" onClick={() => ChoogaBridge.openExternal(EXTERNAL_DOCS)}>
              Open docs
            </button>
            <button type="button" className="secondary" onClick={() => ChoogaBridge.close()}>
              Close mini-app
            </button>
          </div>
        </div>
      </details>
    </section>
  );
}
