(function () {
  window.ChoogaDemo.startBridge();
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var statusEl = document.getElementById('status');
  var detailEl = document.getElementById('detail');
  var formatEtb = window.ChoogaDemo.formatEtb;

  var group = window.EQUB_DATA.groups.find(function (g) {
    return g.id === id;
  });

  if (!group) {
    statusEl.className = 'error';
    statusEl.textContent = 'Equb not found';
    return;
  }

  var paid = window.EqubStore.isPaid(group.id);

  statusEl.hidden = true;
  detailEl.hidden = false;
  detailEl.innerHTML =
    '<div class="panel stack">' +
    '<p class="eyebrow">' +
    group.type +
    ' equb</p>' +
    '<h1>' +
    group.name +
    '</h1>' +
    '<p class="lede">' +
    group.description +
    '</p>' +
    '<div class="stat-row">' +
    '<div><span class="muted">Contribution</span><strong>' +
    formatEtb(group.contribution) +
    '</strong></div>' +
    '<div><span class="muted">Pot this round</span><strong>' +
    formatEtb(group.pot) +
    '</strong></div>' +
    '<div><span class="muted">Next due</span><strong>' +
    group.nextDue +
    '</strong></div>' +
    '<div><span class="muted">Round</span><strong>' +
    group.round +
    ' / ' +
    group.totalRounds +
    '</strong></div>' +
    '</div>' +
    (paid
      ? '<p class="badge ok">You are paid for this round</p>'
      : '<a class="button" href="./form.html?id=' +
        encodeURIComponent(group.id) +
        '">Contribute ' +
        formatEtb(group.contribution) +
        '</a>') +
    '</div>' +
    '<div class="panel stack">' +
    '<h2>Members</h2>' +
    group.membersPreview
      .map(function (m) {
        var memberPaid = m.name === 'You' ? paid : m.paid;
        return (
          '<div class="member-row">' +
          '<div><strong>' +
          m.name +
          '</strong><span class="muted"> · ' +
          m.role +
          '</span></div>' +
          '<span class="badge ' +
          (memberPaid ? 'ok' : 'due') +
          '">' +
          (memberPaid ? 'Paid' : 'Due') +
          '</span></div>'
        );
      })
      .join('') +
    '</div>';
})();
