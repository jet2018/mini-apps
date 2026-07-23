(function (global) {
  var ChoogaBridge = global.ChoogaBridge;
  if (!ChoogaBridge) {
    throw new Error('Load @jetezra/bridge before bridge.js');
  }

  function isHosted() {
    return (
      typeof global !== 'undefined' &&
      !!global.ReactNativeWebView &&
      typeof global.ReactNativeWebView.postMessage === 'function'
    );
  }

  var started = false;

  function startBridge() {
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
          theme: { mode: 'light', primary_color: '#0369a1' },
          capabilities: ['host.progress', 'host.toast', 'host.confirm'],
          activities: ['host.confirm'],
          granted: ['host.progress', 'host.toast', 'user.identity'],
        },
      });
    }

    ChoogaBridge.init({ debug: false });
    return ChoogaBridge;
  }

  function displayNameFromUser(user) {
    if (!user) return 'there';
    return (
      user.display_name ||
      user.name ||
      user.username ||
      user.phone_number ||
      'there'
    );
  }

  global.ChoogaDemo = {
    startBridge: startBridge,
    displayNameFromUser: displayNameFromUser,
    bridge: ChoogaBridge,
  };
})(window);
