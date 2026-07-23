/**
 * Shared bottom nav for Tena Equb (Lucide via CDN createIcons).
 * Usage: include lucide CDN, then this file, call ChoogaNav.mount('home'|'list'|'join'|…).
 */
(function (global) {
  var PAGES = {
    home: {href: './index.html', icon: 'home', label: 'Home'},
    list: {href: './list.html', icon: 'users', label: 'My equbs'},
    join: {href: './join.html', icon: 'compass', label: 'Browse'},
    close: {icon: 'x', label: 'Close', action: 'close'},
  };

  function mount(activeKey) {
    var nav = document.createElement('nav');
    nav.className = 'app-nav';
    nav.setAttribute('aria-label', 'Main');

    ['home', 'list', 'join', 'close'].forEach(function (key) {
      var item = PAGES[key];
      var el;
      if (item.action === 'close') {
        el = document.createElement('button');
        el.type = 'button';
        el.className = 'nav-item';
        el.addEventListener('click', function () {
          if (global.ChoogaDemo && global.ChoogaDemo.bridge) {
            global.ChoogaDemo.bridge.close();
          }
        });
      } else {
        el = document.createElement('a');
        el.href = item.href;
        el.className = 'nav-item' + (key === activeKey ? ' on' : '');
      }
      el.innerHTML =
        '<i data-lucide="' +
        item.icon +
        '"></i><span>' +
        item.label +
        '</span>';
      nav.appendChild(el);
    });

    document.body.appendChild(nav);
    if (global.lucide && typeof global.lucide.createIcons === 'function') {
      global.lucide.createIcons({
        attrs: {
          'stroke-width': 2.1,
          width: 22,
          height: 22,
        },
      });
    }
  }

  global.ChoogaNav = {mount: mount};
})(window);
