(function () {
  var ChoogaBridge = window.ChoogaDemo.startBridge();
  var nameEl = document.getElementById('welcome-name');
  var subtitleEl = document.getElementById('welcome-subtitle');
  var closeBtn = document.getElementById('btn-close');

  function paint(state) {
    nameEl.textContent = window.ChoogaDemo.displayNameFromUser(state.user);
    subtitleEl.textContent = state.hostConnected
      ? 'You are signed in through Awash. Choose how you want to continue.'
      : 'Running in demo mode. Choose how you want to continue.';
    closeBtn.hidden = !state.hostConnected;
  }

  paint(ChoogaBridge.getState());
  ChoogaBridge.subscribe(paint);

  closeBtn.addEventListener('click', function () {
    ChoogaBridge.close();
  });
})();
