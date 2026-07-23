(function () {
  var ChoogaBridge = window.ChoogaDemo.startBridge();
  var nameEl = document.getElementById('welcome-name');
  var subtitleEl = document.getElementById('welcome-subtitle');

  function paint(state) {
    nameEl.textContent = window.ChoogaDemo.displayNameFromUser(state.user);
    subtitleEl.textContent = state.hostConnected
      ? 'You are signed in through Awash. Contribute to your equb with PIN.'
      : 'Demo mode — contribute to staged equb circles with mock PIN.';
  }

  paint(ChoogaBridge.getState());
  ChoogaBridge.subscribe(paint);
})();
