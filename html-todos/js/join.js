(function () {
  var ChoogaBridge = window.ChoogaDemo.startBridge();
  var listEl = document.getElementById('list');
  var closeBtn = document.getElementById('btn-close');
  var formatEtb = window.ChoogaDemo.formatEtb;

  closeBtn.addEventListener('click', function () {
    ChoogaBridge.close();
  });

  listEl.innerHTML = window.EQUB_DATA.groups
    .map(function (g) {
      return (
        '<div class="panel stack">' +
        '<h2>' +
        g.name +
        '</h2>' +
        '<p class="muted">' +
        g.description +
        '</p>' +
        '<p><strong>' +
        formatEtb(g.contribution) +
        '</strong> · ' +
        g.members +
        ' members · ' +
        g.type +
        '</p>' +
        '<a class="button secondary" href="./details.html?id=' +
        encodeURIComponent(g.id) +
        '">View circle</a>' +
        '</div>'
      );
    })
    .join('');
})();
