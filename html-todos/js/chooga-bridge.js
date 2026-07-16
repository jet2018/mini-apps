/**
 * Chooga bridge v1 client for mini-apps running inside the Awash / Chooga host WebView.
 *
 * Works standalone in a normal browser (hostConnected === false) so demos still render.
 *
 * Usage (browser script):
 *   <script src="./chooga-bridge.js"></script>
 *   const unsub = ChoogaBridge.subscribe(state => { ... });
 *
 * Usage (ESM / Vite):
 *   import { ChoogaBridge } from '../shared/chooga-bridge.js';
 *   ChoogaBridge.init();
 */

const BRIDGE = {
  SESSION: 'chooga.session',
  USER: 'chooga.user',
  THEME: 'chooga.theme',
  SAFE_AREA: 'chooga.safeArea',
  READY: 'chooga.ready',
  CLOSE: 'chooga.close',
  OPEN_EXTERNAL: 'chooga.openExternal',
  REQUEST_CAPABILITY: 'chooga.requestCapability',
  CAPABILITY_RESULT: 'chooga.capabilityResult',
};

const state = {
  hostConnected: false,
  readySent: false,
  session: null,
  user: null,
  theme: null,
  safeArea: null,
  lastCapability: null,
  lastMessage: null,
};

const listeners = new Set();

function notify() {
  const snapshot = getState();
  listeners.forEach(fn => {
    try {
      fn(snapshot);
    } catch (e) {
      /* ignore subscriber errors */
    }
  });
}

function getState() {
  return {
    hostConnected: state.hostConnected,
    readySent: state.readySent,
    session: state.session,
    user: state.user,
    theme: state.theme,
    safeArea: state.safeArea,
    lastCapability: state.lastCapability,
    lastMessage: state.lastMessage,
  };
}

function detectHost() {
  return !!(
    typeof window !== 'undefined' &&
    window.ReactNativeWebView &&
    typeof window.ReactNativeWebView.postMessage === 'function'
  );
}

function ensureChoogaHostShim() {
  if (typeof window === 'undefined') {
    return;
  }
  if (!window.ChoogaHost) {
    window.ChoogaHost = {
      postToHost(msg) {
        try {
          const payload = typeof msg === 'string' ? msg : JSON.stringify(msg);
          if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(payload);
          }
        } catch (e) {
          /* ignore */
        }
      },
      getTheme() {
        return window.ChoogaTheme || {};
      },
    };
  }
  window.ChoogaTheme = window.ChoogaTheme || {};
}

function postToHost(msg) {
  ensureChoogaHostShim();
  if (window.ChoogaHost && typeof window.ChoogaHost.postToHost === 'function') {
    window.ChoogaHost.postToHost(msg);
  }
}

function applyTheme(theme) {
  if (typeof document === 'undefined' || !theme) {
    return;
  }
  const primary = theme.primary_color;
  const mode = theme.mode || 'light';
  if (primary) {
    document.documentElement.style.setProperty('--chooga-primary', primary);
    document.documentElement.style.setProperty('--chooga-color-primary', primary);
  }
  document.documentElement.setAttribute('data-chooga-theme', mode);
  window.ChoogaTheme = Object.assign({}, window.ChoogaTheme || {}, {
    primary_color: primary || undefined,
    mode,
  });
}

function handleHostMessage(raw) {
  let msg = raw;
  if (typeof raw === 'string') {
    try {
      msg = JSON.parse(raw);
    } catch (e) {
      return;
    }
  }
  if (!msg || typeof msg !== 'object' || !msg.type) {
    return;
  }

  state.hostConnected = true;
  state.lastMessage = msg;

  switch (msg.type) {
    case BRIDGE.SESSION:
      state.session = {
        token: msg.token || null,
        expires_at: msg.expires_at || null,
      };
      break;
    case BRIDGE.USER:
      state.user = msg.user || null;
      break;
    case BRIDGE.THEME:
      state.theme = {
        mode: msg.mode || 'light',
        primary_color: msg.primary_color || null,
      };
      applyTheme(state.theme);
      break;
    case BRIDGE.SAFE_AREA:
      state.safeArea = msg.insets || null;
      break;
    case BRIDGE.CAPABILITY_RESULT:
      state.lastCapability = {
        key: msg.key,
        granted: !!msg.granted,
        reason: msg.reason || null,
      };
      break;
    default:
      break;
  }

  notify();
}

function onWindowMessage(event) {
  handleHostMessage(event && event.data);
}

let initialized = false;

function init(options = {}) {
  if (initialized) {
    return ChoogaBridge;
  }
  initialized = true;

  ensureChoogaHostShim();
  state.hostConnected = detectHost();

  window.ChoogaMiniApp = window.ChoogaMiniApp || {};
  window.ChoogaMiniApp.onHostMessage = handleHostMessage;

  window.addEventListener('message', onWindowMessage);
  if (typeof document !== 'undefined') {
    document.addEventListener('message', onWindowMessage);
  }

  const autoReady = options.autoReady !== false;
  if (autoReady) {
    ready();
  }

  notify();
  return ChoogaBridge;
}

function ready() {
  postToHost({ type: BRIDGE.READY });
  state.readySent = true;
  notify();
}

function close() {
  postToHost({ type: BRIDGE.CLOSE });
}

function openExternal(url) {
  postToHost({ type: BRIDGE.OPEN_EXTERNAL, url });
}

function requestCapability(key) {
  postToHost({ type: BRIDGE.REQUEST_CAPABILITY, key });
}

function subscribe(listener) {
  if (typeof listener !== 'function') {
    return () => {};
  }
  listeners.add(listener);
  listener(getState());
  return () => listeners.delete(listener);
}

const ChoogaBridge = {
  BRIDGE,
  init,
  ready,
  close,
  openExternal,
  requestCapability,
  subscribe,
  getState,
  /** @deprecated use getState */
  get state() {
    return getState();
  },
};

if (typeof window !== 'undefined') {
  window.ChoogaBridge = ChoogaBridge;
}

