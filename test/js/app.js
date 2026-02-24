(function () {
  'use strict';

  var menuBtn = document.getElementById('menu-btn');
  var mobileOverlay = document.getElementById('mobile-overlay');
  var mobileDrawer = document.getElementById('mobile-drawer');
  var drawerClose = document.getElementById('drawer-close');

  function openMenu() {
    if (mobileDrawer) mobileDrawer.classList.add('is-open');
    if (mobileOverlay) {
      mobileOverlay.style.display = 'block';
      mobileOverlay.setAttribute('aria-hidden', 'false');
    }
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('is-open');
    if (mobileOverlay) {
      mobileOverlay.style.display = 'none';
      mobileOverlay.setAttribute('aria-hidden', 'true');
    }
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  // بستن منو با کلیک بیرون (منوی خدمات در دسکتاپ)
  document.addEventListener('mousedown', function (e) {
    var detailsTablet = document.getElementById('services-dropdown-tablet');
    var detailsDesktop = document.getElementById('services-dropdown-desktop');
    [detailsTablet, detailsDesktop].forEach(function (el) {
      if (!el || !el.hasAttribute('open')) return;
      if (el.contains(e.target)) return;
      el.removeAttribute('open');
    });
  });

  // بستن منو موبایل با کلیک روی لینک (صفحه بعدی خودش می‌بندد؛ برای SPA نیست)
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('nav a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
})();
