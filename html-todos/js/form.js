(function () {
  var ChoogaBridge = window.ChoogaDemo.startBridge();
  var form = document.getElementById('todo-form');
  var errorEl = document.getElementById('error');
  var resultWrap = document.getElementById('result-wrap');
  var resultEl = document.getElementById('result');
  var authorEl = document.getElementById('author-name');
  var submitBtn = document.getElementById('submit-btn');
  var closeBtn = document.getElementById('btn-close');

  closeBtn.addEventListener('click', function () {
    ChoogaBridge.close();
  });

  function paintUser(state) {
    authorEl.textContent = window.ChoogaDemo.displayNameFromUser(state.user);
  }

  paintUser(ChoogaBridge.getState());
  ChoogaBridge.subscribe(paintUser);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.hidden = true;
    resultWrap.hidden = true;
    submitBtn.disabled = true;

    var payload = {
      title: document.getElementById('title').value,
      userId: 1,
      completed: document.getElementById('completed').checked,
    };

    ChoogaBridge.showProgress({ message: 'Creating todo…' });
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        resultEl.textContent = JSON.stringify(data, null, 2);
        resultWrap.hidden = false;
        ChoogaBridge.toast('Todo created', 'success');
      })
      .catch(function (err) {
        errorEl.textContent = 'Error: ' + (err.message || 'Failed to create');
        errorEl.hidden = false;
        ChoogaBridge.toast(errorEl.textContent, 'error');
      })
      .finally(function () {
        ChoogaBridge.dismissProgress();
        submitBtn.disabled = false;
      });
  });
})();
