(function () {
  var ChoogaBridge = window.ChoogaDemo.startBridge();
  var allTodos = [];
  var listEl = document.getElementById('list');
  var statusEl = document.getElementById('status');
  var filterEl = document.getElementById('filter');
  var closeBtn = document.getElementById('btn-close');

  closeBtn.addEventListener('click', function () {
    ChoogaBridge.close();
  });

  function render() {
    var filter = filterEl.value;
    var items = allTodos.filter(function (t) {
      if (filter === 'open') return !t.completed;
      if (filter === 'done') return t.completed;
      return true;
    });

    listEl.innerHTML = items
      .map(function (t) {
        return (
          '<a class="todo-item' +
          (t.completed ? ' done' : '') +
          '" href="./details.html?id=' +
          t.id +
          '">' +
          '<span class="badge ' +
          (t.completed ? 'ok' : 'no') +
          '">' +
          (t.completed ? 'done' : 'open') +
          '</span> ' +
          '#' +
          t.id +
          ' · ' +
          escapeHtml(t.title) +
          '</a>'
        );
      })
      .join('');

    statusEl.textContent = items.length + ' todos shown (of ' + allTodos.length + ')';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  filterEl.addEventListener('change', render);

  ChoogaBridge.showProgress({ message: 'Loading todos…' });
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=40')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      allTodos = data;
      render();
    })
    .catch(function (e) {
      statusEl.className = 'error';
      statusEl.textContent = 'Error: ' + (e.message || 'Failed to load');
      ChoogaBridge.toast(statusEl.textContent, 'error');
    })
    .finally(function () {
      ChoogaBridge.dismissProgress();
    });
})();
