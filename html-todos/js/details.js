(function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var statusEl = document.getElementById('status');
  var detailEl = document.getElementById('detail');

  if (!id) {
    statusEl.className = 'error';
    statusEl.textContent = 'Missing ?id= query parameter';
    return;
  }

  Promise.all([
    fetch('https://jsonplaceholder.typicode.com/todos/' + id).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }),
  ])
    .then(function (results) {
      var todo = results[0];
      return fetch('https://jsonplaceholder.typicode.com/users/' + todo.userId)
        .then(function (res) {
          return res.ok ? res.json() : null;
        })
        .then(function (user) {
          return { todo: todo, user: user };
        });
    })
    .then(function (payload) {
      var todo = payload.todo;
      var user = payload.user;
      statusEl.hidden = true;
      detailEl.hidden = false;
      detailEl.innerHTML =
        '<h1>#' +
        todo.id +
        ' · ' +
        escapeHtml(todo.title) +
        '</h1>' +
        '<p><span class="badge ' +
        (todo.completed ? 'ok' : 'no') +
        '">' +
        (todo.completed ? 'completed' : 'incomplete') +
        '</span></p>' +
        '<p class="muted">User #' +
        todo.userId +
        (user ? ' · ' + escapeHtml(user.name) + ' (' + escapeHtml(user.email) + ')' : '') +
        '</p>' +
        '<pre>' +
        escapeHtml(JSON.stringify(todo, null, 2)) +
        '</pre>';
    })
    .catch(function (e) {
      statusEl.className = 'error';
      statusEl.textContent = 'Error: ' + (e.message || 'Failed to load');
    });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
