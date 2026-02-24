/**
 * هدر و فوتر یکجا — فقط یک بار نمایش داده می‌شود.
 * هر صفحه باید دارای #site-header و #site-footer باشد و layout.init() را صدا بزند.
 */
(function () {
  'use strict';

  var NAV_LINKS = [
    { href: 'index.html', label: 'صفحه اصلی' },
    { href: null, label: 'خدمات', dropdown: [
      { href: 'valid-cards.html', label: 'کارت های اعتباری' },
      { href: 'currency-payment.html', label: 'پرداخت ارزی' }
    ]},
    { href: 'news.html', label: 'اخبار و مقالات' },
    { href: 'faq.html', label: 'سوالات متداول' },
    { href: 'about.html', label: 'درباره ما' },
    { href: 'contact.html', label: 'ارتباط با ما' }
  ];

  var SVG_MENU = '<svg class="icon-lg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>';
  var SVG_CLOSE = '<svg class="icon-lg" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
  var SVG_CHEVRON = '<svg class="icon-md" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
  var SVG_CART = '<svg class="icon-lg" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>';
  var SVG_LOGIN = '<svg class="icon-md" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>';
  var LOGO_PATH = 'Images/Logo/Raitx%20international%20payments%20logo%20design%20(1).png';

  /** پیشوند مسیر تصاویر (خالی یا '../') برای صفحات داخل زیرپوشه. */
  function getImagePrefix() {
    var base = document.querySelector('base');
    if (base && base.getAttribute('href')) return '';
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    if (path.indexOf('/currency-payment/') !== -1 || path.indexOf('/valid-cards/') !== -1 || path.indexOf('/news/') !== -1 || path.indexOf('/admin/') !== -1) return '../';
    return '';
  }
  function getLogoSrc() { return getImagePrefix() + LOGO_PATH; }
  var ENAMAD_IMG_PATH = 'Images/enamad-1star.png';
  function getEnamadSrc() { return getImagePrefix() + ENAMAD_IMG_PATH; }

  function buildNavLinks(activeHref, dropdownSuffix) {
    var suffix = dropdownSuffix || 'desktop';
    var html = '';
    NAV_LINKS.forEach(function (item) {
      if (item.dropdown) {
        var id = 'services-dropdown-' + suffix;
        html += '<details class="services-dropdown" id="' + id + '"><summary>خدمات ' + SVG_CHEVRON + '</summary><div class="dropdown-menu" role="menu">';
        item.dropdown.forEach(function (d) {
          html += '<a href="' + d.href + '" role="menuitem">' + d.label + '</a>';
        });
        html += '</div></details>';
      } else {
        var cls = (activeHref === item.href) ? ' class="active"' : '';
        html += '<a href="' + item.href + '"' + cls + '>' + item.label + '</a>';
      }
    });
    return html;
  }

  function buildDrawerNav(activeHref) {
    var active = function (href) { return isPageActive(href, activeHref) ? ' class="active"' : ''; };
    var html = '<a href="index.html"' + active('index.html') + '>صفحه اصلی</a>';
    html += '<a href="valid-cards.html"' + active('valid-cards.html') + '>کارت های اعتباری</a>';
    html += '<a href="currency-payment.html"' + active('currency-payment.html') + '>پرداخت ارزی</a>';
    html += '<a href="news.html"' + active('news.html') + '>اخبار و مقالات</a>';
    html += '<a href="faq.html"' + active('faq.html') + '>سوالات متداول</a>';
    html += '<a href="about.html"' + active('about.html') + '>درباره ما</a>';
    html += '<a href="contact.html"' + active('contact.html') + '>ارتباط با ما</a>';
    return html;
  }

  function getCurrentPage() {
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    var parts = path.split('/').filter(Boolean);
    var base = parts.pop() || 'index.html';
    if (!base || base === '' || !/\.html?$/i.test(base)) base = 'index.html';
    base = base.split('?')[0];
    return base;
  }

  function isPageActive(pageHref, currentPage) {
    if (currentPage === pageHref) return true;
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    var segment = pageHref.replace('.html', '');
    if (segment === 'index') return false;
    return path.indexOf(segment) !== -1;
  }

  function getHeaderHTML() {
    var active = getCurrentPage();
    var navLinksTablet = buildNavLinks(active, 'tablet');
    var navLinksDesktop = buildNavLinks(active, 'desktop');
    var drawerNav = buildDrawerNav(active);
    return '<header class="site-header">' +
      '<div class="header-inner">' +
        '<div class="header-row">' +
          '<div class="header-order-1">' +
            '<button type="button" class="menu-btn" id="menu-btn" aria-label="منو" aria-expanded="false">' + SVG_MENU + '</button>' +
            '<div class="mobile-overlay" id="mobile-overlay" aria-hidden="true"></div>' +
            '<div class="mobile-drawer" id="mobile-drawer">' +
              '<div class="drawer-header"><button type="button" class="drawer-close" id="drawer-close" aria-label="بستن منو">' + SVG_CLOSE + '</button></div>' +
              '<nav>' + drawerNav + '</nav>' +
              '<div class="drawer-footer">' +
                '<a href="cart.html" class="btn-cart" aria-label="سبد خرید">' + SVG_CART + '</a>' +
                '<a href="auth.html" class="btn-login" aria-label="ورود / ثبت نام">' + SVG_LOGIN + '<span>ورود / ثبت نام</span></a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="header-actions-tablet">' +
            '<a href="cart.html" class="btn-cart" aria-label="سبد خرید">' + SVG_CART + '</a>' +
          '</div>' +
          '<div class="header-actions-desktop actions-wrap">' +
            '<a href="cart.html" class="btn-cart" aria-label="سبد خرید">' + SVG_CART + '</a>' +
            '<a href="auth.html" class="btn-login" aria-label="ورود / ثبت نام">' + SVG_LOGIN + '<span>ورود / ثبت نام</span></a>' +
          '</div>' +
          '<div class="header-order-2">' +
            '<nav class="nav-tablet nav-links" aria-label="منوی اصلی">' + navLinksTablet + '</nav>' +
            '<nav class="nav-desktop nav-links" aria-label="منوی اصلی">' + navLinksDesktop + '</nav>' +
          '</div>' +
          '<div class="header-order-3 header-logo-wrap">' +
            '<a href="index.html" aria-label="صفحه اصلی" class="header-logo-link"><img src="' + getLogoSrc() + '" alt="لوگو شرکت ريتكس" width="720" height="200" class="header-logo-img"></a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</header>';
  }

  function getFooterHTML() {
    return '<footer class="site-footer">' +
      '<div class="footer-inner">' +
        '<div class="footer-grid">' +
          '<div class="footer-right">' +
            '<div class="footer-logo"><img src="' + getLogoSrc() + '" alt="لوگو شرکت ريتكس" class="footer-logo-img"></div>' +
            '<p class="footer-tag">ريتكس (RAITX) — خدمات ارزی و پرداخت ارزی</p>' +
            '<p class="footer-tag">تلفن: <a href="tel:02191320700">۰۲۱-۹۱۳۲۰۷۰۰</a> | ایمیل: <a href="mailto:support@mrpremiumhub.org">support@mrpremiumhub.org</a></p>' +
            '<p class="footer-tag">آدرس: تهران، خیابان کارگر شمالی، نبش بزرگراه جلال آل احمد، کوچه چهارم، پلاک ۴۰، طبقه سوم</p>' +
          '</div>' +
          '<nav class="footer-center" aria-label="لینک‌های فوتر">' +
            '<a href="index.html">صفحه اصلی</a>' +
            '<a href="valid-cards.html">کارت های اعتباری</a>' +
            '<a href="currency-payment.html">پرداخت ارزی</a>' +
            '<a href="news.html">اخبار و مقالات</a>' +
            '<a href="faq.html">سوالات متداول</a>' +
            '<a href="about.html">درباره ما</a>' +
            '<a href="contact.html">ارتباط با ما</a>' +
          '</nav>' +
          '<div class="footer-left">' +
            '<a href="https://www.enamad.ir" target="_blank" rel="noopener noreferrer" class="enamad-link"><img src="' + getEnamadSrc() + '" alt="نماد اعتماد الکترونیکی" class="enamad-img"></a>' +
            '<p class="enamad-title">نهاد اعتماد الکترونیکی</p>' +
            '<p class="enamad-sub">WWW.eNAMAD.ir</p>' +
            '<div class="stars">' +
              '<svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>' +
              '<svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>' +
              '<svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>' +
              '<svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>' +
              '<svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>' +
            '</div>' +
            '<p class="enamad-sub">جهت اطمینان کلیک نمایید</p>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom"><p>© ريتكس. تمامی حقوق محفوظ است.</p></div>' +
      '</div>' +
    '</footer>';
  }

  function applyDrawerActiveState() {
    var drawer = document.getElementById('mobile-drawer');
    if (!drawer) return;
    var nav = drawer.querySelector('nav');
    if (!nav) return;
    var current = getCurrentPage();
    var links = nav.querySelectorAll('a');
    links.forEach(function (a) {
      var raw = (a.getAttribute('href') || '').split('?')[0];
      var pageHref = raw.replace(/^.*\//, ''); // فقط نام فایل، مثلاً contact.html
      if (isPageActive(pageHref, current)) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  function init() {
    var headerEl = document.getElementById('site-header');
    var footerEl = document.getElementById('site-footer');
    if (headerEl) headerEl.innerHTML = getHeaderHTML();
    if (footerEl) footerEl.innerHTML = getFooterHTML();
    applyDrawerActiveState();
    var logoImg = headerEl && headerEl.querySelector('.header-logo-wrap .header-logo-img');
    if (logoImg) {
      logoImg.onerror = function () {
        this.style.display = 'none';
        var link = this.closest('.header-logo-link');
        if (link && !link.querySelector('.header-logo-fallback')) {
          var fallback = document.createElement('span');
          fallback.className = 'header-logo-fallback';
          fallback.setAttribute('aria-hidden', 'true');
          fallback.textContent = 'ريتكس';
          link.appendChild(fallback);
        }
      };
    }
    if (footerEl) {
      var footerLogo = footerEl.querySelector('.footer-logo-img');
      if (footerLogo) {
        footerLogo.onerror = function () {
          this.style.display = 'none';
          var wrap = this.closest('.footer-logo');
          if (wrap && !wrap.querySelector('.footer-logo-fallback')) {
            var fb = document.createElement('span');
            fb.className = 'footer-logo-fallback';
            fb.setAttribute('aria-hidden', 'true');
            fb.textContent = 'ريتكس';
            wrap.appendChild(fb);
          }
        };
      }
      var enamadImg = footerEl.querySelector('.enamad-img');
      if (enamadImg) {
        enamadImg.onerror = function () {
          this.style.display = 'none';
          var link = this.closest('.enamad-link');
          if (link && !link.querySelector('.enamad-fallback')) {
            var fb = document.createElement('span');
            fb.className = 'enamad-fallback';
            fb.setAttribute('aria-hidden', 'true');
            fb.textContent = 'نماد اعتماد الکترونیکی';
            link.appendChild(fb);
          }
        };
      }
    }
  }

  window.layout = {
    init: init,
    getHeaderHTML: getHeaderHTML,
    getFooterHTML: getFooterHTML
  };
})();
