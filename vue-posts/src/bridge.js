import ChoogaBridge from '@jetezra/bridge';

const isHosted = () =>
  typeof window !== 'undefined' &&
  !!window.ReactNativeWebView &&
  typeof window.ReactNativeWebView.postMessage === 'function';

let started = false;

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
        capabilities: ['host.progress', 'host.toast', 'host.confirm'],
        activities: ['host.confirm'],
        granted: ['host.progress', 'host.toast', 'user.identity'],
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
