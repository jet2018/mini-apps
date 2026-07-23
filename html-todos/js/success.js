(function () {
  window.ChoogaDemo.startBridge();
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var formatEtb = window.ChoogaDemo.formatEtb;

  var group = window.EQUB_DATA.groups.find(function (g) {
    return g.id === id;
  });
  var saved = (window.EqubStore.load() || {})[id] || {};
  var payment = saved.payment || {};

  if (!group) {
    document.getElementById('group-name').textContent = 'Unknown equb';
    return;
  }

  document.getElementById('group-name').textContent = group.name;
  document.getElementById('amount').textContent = formatEtb(
    payment.amount != null ? payment.amount : group.contribution,
  );
  document.getElementById('reference').textContent = payment.reference || '—';
  document.getElementById('blurb').textContent =
    'Round ' +
    group.round +
    ' of ' +
    group.totalRounds +
    ' is marked paid on this device.';
  document.getElementById('details-link').href =
    './details.html?id=' + encodeURIComponent(group.id);
})();
