import ChoogaBridge from '@jetezra/bridge';

const isHosted = () =>
  typeof window !== 'undefined' &&
  !!window.ReactNativeWebView &&
  typeof window.ReactNativeWebView.postMessage === 'function';

let started = false;
const mockCart = {items: []};

const cartSnapshot = () => {
  const items = mockCart.items.map(row => ({...row}));
  const cartCount = items.reduce((sum, row) => sum + (Number(row.quantity) || 0), 0);
  const total = items.reduce(
    (sum, row) => sum + Number(row.price || 0) * Number(row.quantity || 0),
    0,
  );
  return {
    ok: true,
    items,
    cartCount,
    total: Number(total.toFixed(2)),
  };
};

export const startBridge = () => {
  if (started) {
    return ChoogaBridge;
  }
  started = true;

  if (!isHosted()) {
    ChoogaBridge.mockHost({
      context: {
        user: {
          id: 'demo-user',
          display_name: 'Ada Lovelace',
          name: 'Ada Lovelace',
        },
        theme: {mode: 'light', primary_color: '#0f766e'},
        capabilities: [
          'payments',
          'payments.initiate',
          'cart',
          'cart.add',
          'cart.get',
          'cart.clear',
          'host.progress',
          'host.toast',
          'wallet.pick',
          'host.confirm',
        ],
        activities: ['wallet.pick', 'host.confirm'],
        granted: [
          'payments.initiate',
          'cart',
          'host.progress',
          'host.toast',
          'wallet.pick',
          'user.identity',
        ],
      },
      onMessage: (msg, reply) => {
        if (msg.type === 'chooga.call' && String(msg.method || '').startsWith('cart.')) {
          if (msg.method === 'cart.add') {
            const item = msg.params || {};
            const id = String(item.id ?? `item_${Date.now()}`);
            const existing = mockCart.items.find(row => String(row.id) === id);
            if (existing) {
              existing.quantity += Number(item.quantity) || 1;
            } else {
              mockCart.items.push({
                id,
                title: item.title || id,
                price: item.price,
                currency: item.currency || 'ETB',
                quantity: Number(item.quantity) || 1,
                image: item.image,
              });
            }
          } else if (msg.method === 'cart.clear') {
            mockCart.items = [];
          }
          const snapshot = cartSnapshot();
          reply({
            type: 'chooga.callResult',
            requestId: msg.requestId,
            method: msg.method,
            ...snapshot,
          });
          reply({
            type: 'chooga.event',
            name: 'cart.updated',
            detail: snapshot,
          });
          return;
        }

        // Fall back to built-in mock responses for everything else.
        if (msg.type === 'chooga.ready') {
          reply({
            type: 'chooga.session',
            token: 'mock-token',
            expires_at: null,
          });
          reply({
            type: 'chooga.user',
            user: {
              id: 'demo-user',
              display_name: 'Ada Lovelace',
              name: 'Ada Lovelace',
            },
          });
          reply({
            type: 'chooga.theme',
            mode: 'light',
            primary_color: '#0f766e',
          });
          reply({
            type: 'chooga.hostInfo',
            version: '0.0.2',
            host_version: '0.0.2',
            activities: ['wallet.pick', 'host.confirm'],
            capabilities: [
              'payments',
              'payments.initiate',
              'cart',
              'cart.add',
              'cart.get',
              'cart.clear',
              'host.progress',
              'host.toast',
            ],
            granted: [
              'payments.initiate',
              'cart',
              'host.progress',
              'host.toast',
              'user.identity',
            ],
          });
          return;
        }
        if (msg.type === 'chooga.payments.initiate') {
          reply({
            type: 'chooga.payments.result',
            requestId: msg.requestId,
            ok: true,
            status: 'success',
            reference: msg.reference || 'mock_ref',
            amount: msg.amount,
            currency: msg.currency,
            mock: true,
          });
          return;
        }
        if (msg.type === 'chooga.call') {
          reply({
            type: 'chooga.callResult',
            requestId: msg.requestId,
            ok: true,
            method: msg.method,
            mock: true,
            ...(msg.params || {}),
          });
          return;
        }
        if (msg.type === 'chooga.progress.show' || msg.type === 'chooga.progress.dismiss' || msg.type === 'chooga.toast') {
          return;
        }
      },
    });
  }

  ChoogaBridge.init({debug: false});
  return ChoogaBridge;
};

export const displayNameFromUser = user =>
  user?.display_name ||
  user?.name ||
  user?.username ||
  user?.phone_number ||
  'there';

export default ChoogaBridge;
