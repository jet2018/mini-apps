(function () {
  var ChoogaBridge = window.ChoogaDemo.startBridge();
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var formatEtb = window.ChoogaDemo.formatEtb;
  var payBtn = document.getElementById('pay-btn');
  var msg = document.getElementById('msg');
  var back = document.getElementById('back-link');

  var group = window.EQUB_DATA.groups.find(function (g) {
    return g.id === id;
  });

  if (!group) {
    document.getElementById('title').textContent = 'Equb not found';
    payBtn.disabled = true;
    return;
  }

  back.href = './details.html?id=' + encodeURIComponent(group.id);
  document.getElementById('title').textContent = group.name;
  document.getElementById('blurb').textContent =
    'Round ' + group.round + ' of ' + group.totalRounds + ' · due ' + group.nextDue;
  document.getElementById('amount').textContent = formatEtb(group.contribution);

  if (window.EqubStore.isPaid(group.id)) {
    payBtn.disabled = true;
    payBtn.textContent = 'Already paid';
    msg.textContent = 'This round is settled on this device.';
  }

  payBtn.addEventListener('click', function () {
    if (payBtn.disabled) return;
    payBtn.disabled = true;
    payBtn.textContent = 'Waiting for PIN…';
    msg.textContent = '';

    ChoogaBridge.payments
      .initiate({
        amount: group.contribution,
        currency: 'ETB',
        reference: 'EQUB_' + group.id + '_' + Date.now().toString(36),
        description: group.name + ' · round ' + group.round,
        metadata: {equbId: group.id, round: group.round},
      })
      .then(function (payment) {
        if (payment && payment.ok === false) {
          msg.textContent = payment.reason || 'Payment cancelled';
          ChoogaBridge.toast(msg.textContent, 'error');
          payBtn.disabled = false;
          payBtn.textContent = 'Pay with Awash PIN';
          return;
        }
        window.EqubStore.markPaid(group.id, {
          at: new Date().toISOString(),
          payment: payment,
        });
        window.location.href =
          './success.html?id=' + encodeURIComponent(group.id);
      })
      .catch(function (e) {
        msg.textContent = (e && e.message) || 'Payment failed';
        ChoogaBridge.toast(msg.textContent, 'error');
        payBtn.disabled = false;
        payBtn.textContent = 'Pay with Awash PIN';
      });
  });
})();
