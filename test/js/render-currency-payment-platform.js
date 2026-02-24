/**
 * رندر صفحه پرداخت ارزی — عین پلتفرم (داده استاتیک)
 */
(function () {
  'use strict';

  var ITEMS_PER_PAGE = 8;

  function escapeHtml(text) {
    if (text == null) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getIconHtml(iconKey) {
    var wrapCls = 'cp-icon-wrap cp-icon-' + (iconKey || '');
    var fa = {
      paypal: 'fa-brands fa-paypal',
      mastercard: 'fa-brands fa-cc-mastercard',
      creditcard: 'fa-solid fa-credit-card',
      bitcoin: 'fa-brands fa-bitcoin',
      transfer: 'fa-solid fa-money-bill-transfer',
      academic: 'fa-solid fa-graduation-cap',
      plane: 'fa-solid fa-plane',
      home: 'fa-solid fa-hotel',
      globe: 'fa-solid fa-globe',
      template: 'fa-solid fa-palette',
      digitalocean: 'fa-brands fa-digital-ocean',
      dots: 'fa-solid fa-ellipsis-h',
      server: 'fa-solid fa-server',
      brain: 'fa-solid fa-brain',
      search: 'fa-solid fa-magnifying-glass',
      gamepad: 'fa-solid fa-gamepad',
      code: 'fa-solid fa-code',
      sim: 'fa-solid fa-sim-card',
      phone: 'fa-solid fa-phone',
      domain: 'fa-solid fa-globe',
      cloud: 'fa-solid fa-cloud'
    };
    var iconClass = fa[iconKey] || 'fa-solid fa-wallet';
    return '<span class="' + wrapCls + '" aria-hidden="true"><i class="cp-fa ' + iconClass + '" aria-hidden="true"></i></span>';
  }

  function getAllCards() {
    var data = window.currencyPaymentPlatform;
    if (!data || !data.servicesFlat) return [];
    return data.servicesFlat.slice();
  }

  function renderFilters(selectedCategory) {
    var data = window.currencyPaymentPlatform;
    if (!data) return;
    var el = document.getElementById('currency-payment-filters');
    if (!el) return;
    el.innerHTML = data.serviceCategories.map(function (c) {
      var active = selectedCategory === c.value ? ' cp-filter-active' : '';
      return '<button type="button" class="cp-filter-btn' + active + '" data-category="' + escapeHtml(c.value) + '">' + escapeHtml(c.label) + '</button>';
    }).join('');
  }

  function renderGrid(cards, page) {
    var gridEl = document.getElementById('currency-payment-grid');
    var paginationEl = document.getElementById('currency-payment-pagination');
    if (!gridEl) return;
    var start = (page - 1) * ITEMS_PER_PAGE;
    var slice = cards.slice(start, start + ITEMS_PER_PAGE);
    var totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);

    if (slice.length === 0) {
      gridEl.innerHTML = '<p class="cp-empty">خدماتی در این دسته‌بندی یافت نشد.</p>';
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    var data = window.currencyPaymentPlatform;
    var catDesc = null;
    if (state.category !== 'all' && data && data.serviceCategories) {
      var cat = data.serviceCategories.filter(function (c) { return c.value === state.category; })[0];
      if (cat && cat.categoryDescription) catDesc = cat.categoryDescription;
    }
    gridEl.innerHTML = slice.map(function (card) {
      var iconHtml = getIconHtml(card.iconKey);
      var desc = (catDesc != null ? catDesc : card.description) || '';
      return '<a href="' + escapeHtml(card.href) + '" class="cp-card">' +
        '<div class="cp-card-icon-wrap">' + iconHtml + '</div>' +
        '<h3 class="cp-card-title">' + escapeHtml(card.label) + '</h3>' +
        (card.labelEn ? '<p class="cp-card-label-en">' + escapeHtml(card.labelEn) + '</p>' : '') +
        '<p class="cp-card-desc">' + escapeHtml(desc) + '</p>' +
        '</a>';
    }).join('');

    if (paginationEl && totalPages > 1) {
      var prevDisabled = page <= 1 ? ' cp-pagination-disabled' : '';
      var nextDisabled = page >= totalPages ? ' cp-pagination-disabled' : '';
      var prevBtn = '<button type="button" class="cp-pagination-prev' + prevDisabled + '" data-page="' + (page - 1) + '" aria-label="قبلی">‹</button>';
      var nextBtn = '<button type="button" class="cp-pagination-next' + nextDisabled + '" data-page="' + (page + 1) + '" aria-label="بعدی">›</button>';
      var pages = '';
      for (var i = 1; i <= totalPages; i++) {
        var act = i === page ? ' cp-pagination-active' : '';
        pages += '<button type="button" class="cp-pagination-num' + act + '" data-page="' + i + '">' + i + '</button>';
      }
      paginationEl.innerHTML = '<div class="cp-pagination-inner">' + nextBtn + '<div class="cp-pagination-pages">' + pages + '</div>' + prevBtn + '</div>';
      paginationEl.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          var p = parseInt(b.getAttribute('data-page'), 10);
          if (b.classList.contains('cp-pagination-disabled')) return;
          setPage(p);
        });
      });
    } else if (paginationEl) {
      paginationEl.innerHTML = '';
    }
  }

  var state = { category: 'all', page: 1 };

  function setSelectedCategory(value) {
    state.category = value;
    state.page = 1;
    update();
  }

  function setPage(page) {
    state.page = page;
    update();
  }

  /** سه‌تای اول در تب آموزش و آزمون نمایش داده نشوند: تافل، جی‌آرای، امور دانشگاهی */
  var educationExcludeIds = ['toefl', 'gre', 'university'];

  /** هر تب فقط سرویس‌های همان دسته را نشان می‌دهد */
  function getCurrentCards() {
    var data = window.currencyPaymentPlatform;
    if (!data || !data.servicesFlat) return [];
    if (state.category === 'all') return data.servicesFlat.slice();
    var list = data.servicesFlat.filter(function (s) { return s.category === state.category; });
    if (state.category === 'education') {
      list = list.filter(function (s) { return educationExcludeIds.indexOf(s.id) === -1; });
    }
    return list;
  }

  function update() {
    var cards = getCurrentCards();
    renderFilters(state.category);
    renderGrid(cards, state.page);
  }

  var categoryValues = ['all', 'international', 'premium', 'education', 'vps'];

  function init() {
    if (!window.currencyPaymentPlatform) return;
    var hash = (location.hash || '').replace(/^#/, '');
    if (hash && categoryValues.indexOf(hash) !== -1) {
      state.category = hash;
    }
    var filtersEl = document.getElementById('currency-payment-filters');
    if (filtersEl) {
      filtersEl.addEventListener('click', function (e) {
        var btn = e.target && e.target.closest && e.target.closest('.cp-filter-btn');
        if (btn) {
          e.preventDefault();
          var value = btn.getAttribute('data-category');
          if (value != null) setSelectedCategory(value);
        }
      });
    }
    var paginationWrap = document.getElementById('currency-payment-pagination-wrap');
    if (!paginationWrap) {
      var grid = document.getElementById('currency-payment-grid');
      if (grid && grid.parentNode) {
        var wrap = document.createElement('div');
        wrap.id = 'currency-payment-pagination-wrap';
        wrap.className = 'cp-pagination-wrap';
        wrap.innerHTML = '<div id="currency-payment-pagination" class="cp-pagination"></div>';
        grid.parentNode.insertBefore(wrap, grid.nextSibling);
      }
    }
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
