/** Staged eQUB-style rotating savings groups (demo only). */

window.EQUB_DATA = {
  groups: [
    {
      id: 'eq-bole-office',
      name: 'Bole Office Circle',
      type: 'monthly',
      contribution: 5000,
      currency: 'ETB',
      members: 12,
      round: 4,
      totalRounds: 12,
      nextDue: '2026-08-01',
      pot: 60000,
      status: 'active',
      yourStatus: 'due',
      description:
        'Workplace equb among colleagues near Bole Atlas. Lottery draw on the 1st.',
      membersPreview: [
        {name: 'Sara Tadesse', role: 'Sebabi', paid: true},
        {name: 'Yonatan Bekele', role: 'Member', paid: true},
        {name: 'Hanna Alemu', role: 'Member', paid: false},
        {name: 'You', role: 'Member', paid: false},
      ],
    },
    {
      id: 'eq-merkato-traders',
      name: 'Merkato Traders',
      type: 'weekly',
      contribution: 2500,
      currency: 'ETB',
      members: 20,
      round: 9,
      totalRounds: 20,
      nextDue: '2026-07-26',
      pot: 50000,
      status: 'active',
      yourStatus: 'paid',
      description:
        'Weekly equb for shop owners around Addis Merkato. Cash-out via Awash.',
      membersPreview: [
        {name: 'Abdi Mohammed', role: 'Sebabi', paid: true},
        {name: 'You', role: 'Member', paid: true},
        {name: 'Liya Getachew', role: 'Member', paid: true},
      ],
    },
    {
      id: 'eq-family-meskel',
      name: 'Family Meskel Fund',
      type: 'monthly',
      contribution: 10000,
      currency: 'ETB',
      members: 8,
      round: 2,
      totalRounds: 8,
      nextDue: '2026-08-12',
      pot: 80000,
      status: 'active',
      yourStatus: 'due',
      description:
        'Family equb saving toward Meskel and Timket travel. Business cabin optional.',
      membersPreview: [
        {name: 'Ato Mulugeta', role: 'Sebabi', paid: true},
        {name: 'You', role: 'Member', paid: false},
      ],
    },
  ],
};

window.EqubStore = {
  KEY: 'chooga_equb_payments_v1',
  load: function () {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '{}');
    } catch (e) {
      return {};
    }
  },
  markPaid: function (groupId, payload) {
    var map = this.load();
    map[groupId] = payload;
    localStorage.setItem(this.KEY, JSON.stringify(map));
    return map;
  },
  isPaid: function (groupId) {
    return !!this.load()[groupId];
  },
};
