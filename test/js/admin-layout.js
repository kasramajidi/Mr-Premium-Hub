/**
 * سایدبار و چیدمان پنل ادمین — مطابق raitx-platform
 */
(function () {
  'use strict';

  var NAV_ITEMS = [
    { name: 'داشبورد', href: 'index.html', icon: '📊' },
    { name: 'مقالات', href: 'articles.html', icon: '📝' },
    { name: 'محصولات', href: 'products.html', icon: '🛍️' },
    { name: 'سفارشات', href: 'orders.html', icon: '📦' },
    { name: 'کاربران', href: 'users.html', icon: '👥' },
    { name: 'انتقادات و پیشنهادات', href: 'comments.html', icon: '💬' },
    { name: 'کامنت فروشگاه', href: 'shop-comments.html', icon: '🛒' },
    { name: 'کامنت مقاله‌ها', href: 'article-comments.html', icon: '📄' },
    { name: 'پشتیبانی', href: 'support.html', icon: '💬' },
    { name: 'تنظیمات', href: 'settings.html', icon: '⚙️' }
  ];

  function getCurrentPage() {
    var path = window.location.pathname || '';
    var base = path.split('/').pop() || 'index.html';
    base = base.split('?')[0];
    return base;
  }

  function renderSidebar(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var current = getCurrentPage();
    var html = '<nav aria-label="منوی ادمین">';
    NAV_ITEMS.forEach(function (item) {
      var cls = (current === item.href) ? ' class="active"' : '';
      html += '<a href="' + item.href + '"' + cls + '><span class="nav-icon">' + item.icon + '</span>' + item.name + '</a>';
    });
    html += '</nav>';
    html += '<div class="sidebar-footer">';
    html += '<a href="../index.html">بازگشت به سایت</a>';
    html += '<button type="button" id="admin-logout">خروج</button>';
    html += '</div>';
    container.innerHTML = html;
    var logoutBtn = document.getElementById('admin-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        try { window.sessionStorage.removeItem('admin_logged_in'); } catch (e) {}
        window.location.href = 'login.html';
      });
    }
  }

  window.adminLayout = {
    renderSidebar: renderSidebar,
    getCurrentPage: getCurrentPage,
    isLoggedIn: function () {
      try { return window.sessionStorage.getItem('admin_logged_in') === '1'; } catch (e) { return false; }
    },
    ensureLogin: function () {
      if (!this.isLoggedIn()) {
        window.location.href = 'login.html?next=' + encodeURIComponent(window.location.pathname + window.location.search);
        return false;
      }
      return true;
    }
  };
})();
