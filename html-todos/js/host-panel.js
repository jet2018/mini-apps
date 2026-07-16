(function () {
  var EXTERNAL_DOCS = 'https://jsonplaceholder.typicode.com';

  function el(id) {
    return document.getElementById(id);
  }

  function truncateToken(token) {
    if (!token) return '—';
    return token.slice(0, 28) + '…';
  }

  function render(state) {
    var status = el('host-status');
    if (status) {
      status.textContent = state.hostConnected ? 'connected' : 'standalone';
      status.className = 'status-pill' + (state.hostConnected ? '' : ' off');
    }
    var meta = el('host-meta');
    if (meta) {
      meta.textContent =
        'Ready sent: ' +
        (state.readySent ? 'yes' : 'no') +
        ' · Theme: ' +
        ((state.theme && state.theme.mode) || '—') +
        ' / ' +
        ((state.theme && state.theme.primary_color) || 'default');
    }
    var session = el('host-session');
    if (session) {
      session.textContent = JSON.stringify(
        {
          token: truncateToken(state.session && state.session.token),
          expires_at: (state.session && state.session.expires_at) || null,
        },
        null,
        2,
      );
    }
    var user = el('host-user');
    if (user) user.textContent = JSON.stringify(state.user || null, null, 2);
    var safe = el('host-safe');
    if (safe) safe.textContent = JSON.stringify(state.safeArea || null, null, 2);
    var cap = el('host-cap');
    if (cap) cap.textContent = JSON.stringify(state.lastCapability || null, null, 2);
  }

  function wireButtons() {
    var identity = el('btn-identity');
    var phone = el('btn-phone');
    var docs = el('btn-docs');
    var closeBtn = el('btn-close');
    if (identity) {
      identity.addEventListener('click', function () {
        window.ChoogaBridge.requestCapability('user.identity');
      });
    }
    if (phone) {
      phone.addEventListener('click', function () {
        window.ChoogaBridge.requestCapability('user.phone');
      });
    }
    if (docs) {
      docs.addEventListener('click', function () {
        window.ChoogaBridge.openExternal(EXTERNAL_DOCS);
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        window.ChoogaBridge.close();
      });
    }
  }

  function boot() {
    if (!window.ChoogaBridge) {
      console.warn('ChoogaBridge missing');
      return;
    }
    window.ChoogaBridge.init();
    window.ChoogaBridge.subscribe(render);
    wireButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
