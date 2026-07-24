(function () {
  window.ChoogaDemo.startBridge();
  var listEl = document.getElementById('list');
  var formatEtb = window.ChoogaDemo.formatEtb;

  function statusLabel(group) {
    if (window.EqubStore.isPaid(group.id)) {
      return '<span class="badge ok">Paid this round</span>';
    }
    return '<span class="badge due">Contribution due</span>';
  }

  listEl.innerHTML = window.EQUB_DATA.groups
    .map(function (g) {
      return (
        '<a class="equb-card" href="./details.html?id=' +
        encodeURIComponent(g.id) +
        '">' +
        '<div class="equb-card-top">' +
        '<div><strong>' +
        g.name +
        '</strong><p class="muted">' +
        g.type +
        ' · round ' +
        g.round +
        '/' +
        g.totalRounds +
        '</p></div>' +
        statusLabel(g) +
        '</div>' +
        '<div class="equb-card-bottom">' +
        '<span>' +
        g.members +
        ' members</span>' +
        '<span class="fare">' +
        formatEtb(g.contribution) +
        '</span>' +
        '</div></a>'
      );
    })
    .join('');
})();
