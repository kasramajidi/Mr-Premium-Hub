/**
 * رندر صفحه کارت‌های اعتباری — عین پلتفرم (بدون API، داده استاتیک)
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
    var wrapCls = 'vc-icon-wrap vc-icon-' + iconKey;
    /* آیکون‌های Font Awesome (برند واقعی) — کلاس: fa-brands یا fa-solid */
    var fa = {
      playstation: 'fa-brands fa-playstation',
      xbox: 'fa-brands fa-xbox',
      steam: 'fa-brands fa-steam',
      battlenet: 'fa-brands fa-battle-net',
      desktop: 'fa-solid fa-gamepad',
      visa: 'fa-brands fa-cc-visa',
      mastercard: 'fa-brands fa-cc-mastercard',
      amazon: 'fa-brands fa-amazon',
      apple: 'fa-brands fa-apple',
      spotify: 'fa-brands fa-spotify',
      netflix: 'fa-brands fa-netflix',
      gift: 'fa-solid fa-gift',
      cardgift: 'fa-solid fa-gift',
      globe: 'fa-solid fa-globe',
      creditcard: 'fa-solid fa-credit-card'
    };
    var iconClass = fa[iconKey] || fa.creditcard;
    return '<span class="' + wrapCls + '" aria-hidden="true"><i class="vc-fa ' + iconClass + '" aria-hidden="true"></i></span>';
  }

  function getAllCards() {
    var data = window.validCardsPlatform;
    if (!data || !data.creditCardCategories) return [];
    var out = [];
    data.creditCardCategories.forEach(function (cat) {
      cat.items.forEach(function (item) {
        out.push({
          id: item.href,
          label: item.label,
          labelEn: item.labelEn,
          description: cat.description,
          iconKey: item.iconKey || cat.iconKey,
          href: item.href
        });
      });
    });
    return out;
  }

  function renderFilters(selectedCategory) {
    var data = window.validCardsPlatform;
    if (!data) return;
    var el = document.getElementById('valid-cards-filters');
    if (!el) return;
    el.innerHTML = data.serviceCategories.map(function (c) {
      var active = selectedCategory === c.value ? ' vc-filter-active' : '';
      return '<button type="button" class="vc-filter-btn' + active + '" data-category="' + escapeHtml(c.value) + '">' + escapeHtml(c.label) + '</button>';
    }).join('');
    el.querySelectorAll('.vc-filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setSelectedCategory(btn.getAttribute('data-category'));
      });
    });
  }

  function renderGrid(cards, page) {
    var gridEl = document.getElementById('valid-cards-grid');
    var paginationEl = document.getElementById('valid-cards-pagination');
    if (!gridEl) return;
    var start = (page - 1) * ITEMS_PER_PAGE;
    var slice = cards.slice(start, start + ITEMS_PER_PAGE);
    var totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);

    if (slice.length === 0) {
      gridEl.innerHTML = '<p class="vc-empty">خدماتی در این دسته‌بندی یافت نشد.</p>';
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    gridEl.innerHTML = slice.map(function (card) {
      var iconHtml = getIconHtml(card.iconKey);
      return '<a href="' + escapeHtml(card.href) + '" class="vc-card">' +
        '<div class="vc-card-icon-wrap">' + iconHtml + '</div>' +
        '<h3 class="vc-card-title">' + escapeHtml(card.label) + '</h3>' +
        (card.labelEn ? '<p class="vc-card-label-en">' + escapeHtml(card.labelEn) + '</p>' : '') +
        '<p class="vc-card-desc">' + escapeHtml(card.description) + '</p>' +
        '</a>';
    }).join('');

    if (paginationEl && totalPages > 1) {
      var prevDisabled = page <= 1 ? ' vc-pagination-disabled' : '';
      var nextDisabled = page >= totalPages ? ' vc-pagination-disabled' : '';
      var prevBtn = '<button type="button" class="vc-pagination-prev' + prevDisabled + '" data-page="' + (page - 1) + '" aria-label="قبلی">‹</button>';
      var nextBtn = '<button type="button" class="vc-pagination-next' + nextDisabled + '" data-page="' + (page + 1) + '" aria-label="بعدی">›</button>';
      var pages = '';
      for (var i = 1; i <= totalPages; i++) {
        var act = i === page ? ' vc-pagination-active' : '';
        pages += '<button type="button" class="vc-pagination-num' + act + '" data-page="' + i + '">' + i + '</button>';
      }
      paginationEl.innerHTML = '<div class="vc-pagination-inner">' + nextBtn + '<div class="vc-pagination-pages">' + pages + '</div>' + prevBtn + '</div>';
      paginationEl.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          var p = parseInt(b.getAttribute('data-page'), 10);
          if (b.classList.contains('vc-pagination-disabled')) return;
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

  function getCurrentCards() {
    var data = window.validCardsPlatform;
    if (!data) return [];
    if (state.category === 'all') return getAllCards();
    var cat = data.creditCardCategories.filter(function (c) { return c.category === state.category; })[0];
    if (!cat) return [];
    return cat.items.map(function (item) {
      return {
        id: item.href,
        label: item.label,
        labelEn: item.labelEn,
        description: cat.description,
        iconKey: item.iconKey || cat.iconKey,
        href: item.href
      };
    });
  }

  function update() {
    var cards = getCurrentCards();
    renderFilters(state.category);
    renderGrid(cards, state.page);
  }

  function init() {
    if (!window.validCardsPlatform) return;
    var paginationWrap = document.getElementById('valid-cards-pagination-wrap');
    if (!paginationWrap) {
      var grid = document.getElementById('valid-cards-grid');
      if (grid && grid.parentNode) {
        var wrap = document.createElement('div');
        wrap.id = 'valid-cards-pagination-wrap';
        wrap.className = 'vc-pagination-wrap';
        wrap.innerHTML = '<div id="valid-cards-pagination" class="vc-pagination"></div>';
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
