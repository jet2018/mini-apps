(function () {
  var form = document.getElementById('todo-form');
  var errorEl = document.getElementById('error');
  var resultWrap = document.getElementById('result-wrap');
  var resultEl = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.hidden = true;
    resultWrap.hidden = true;

    var payload = {
      title: document.getElementById('title').value,
      userId: Number(document.getElementById('userId').value) || 1,
      completed: document.getElementById('completed').checked,
    };

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
      })
      .catch(function (err) {
        errorEl.textContent = 'Error: ' + (err.message || 'Failed to create');
        errorEl.hidden = false;
      });
  });
})();
