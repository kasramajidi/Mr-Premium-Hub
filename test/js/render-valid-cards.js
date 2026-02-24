/**
 * رندر صفحه کارت‌های اعتباری — از API (action=shop) مطابق raitx-platform
 * همان آیکون‌ها و اندازه کارت پلتفرم
 */
(function () {
  'use strict';

  var API = (typeof window.API_BASE !== 'undefined' && window.API_BASE()) ? window.API_BASE() : 'https://mrpremiumhub.org/api.ashx';

  function escapeHtml(text) {
    if (text == null) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function mapGroupToMainCategoryId(groups) {
    var g = (groups || '').toString();
    if (/پرداخت|ارزی|ویزا|مستر|پی پال/.test(g)) return 'currency';
    if (/آزمون|تافل|آیلتس|جی آر ای|ثبت نام/.test(g)) return 'exams';
    if (/سفارت|وقت مصاحبه/.test(g)) return 'embassy';
    if (/اپلای|دانشگاه|شهریه|اپلیکیشن/.test(g)) return 'apply';
    if (/گیفت|کارت/.test(g)) return 'giftcards';
    return 'other';
  }

  /** دسته‌های فیلتر صفحه: همه خدمات، گیفت کارت بازی، ویزا کارت، مسترکارت، گیفت کارت ها */
  function getFilterCategories(groups, name) {
    var g = (groups || '').toString();
    var n = (name || '').toString();
    var text = g + ' ' + n;
    var arr = [];
    if (/مستر|mastercard/i.test(text)) arr.push('mastercard');
    if (/ویزا|visa/i.test(text)) arr.push('visa');
    if (/گیفت کارت بازی|استیم|ایکس باکس|پلی استیشن|بتل|steam|xbox|playstation|battle|گیمر|gaming/i.test(text)) arr.push('gaming');
    if (/گیفت کارت|گیفت|هدیه|gift/i.test(text)) arr.push('gift');
    if (arr.length === 0) arr.push('all');
    return arr;
  }

  function normalizeProduct(item, index) {
    var id = Number(item.id ?? item.ID ?? index + 1) || index + 1;
    var name = String(item.title ?? item.name ?? item.Name ?? '—');
    var groups = String(item.groups ?? item.category ?? item.Category ?? '—');
    var image = String(item.img ?? item.image ?? '').trim() || '';
    var rawText = String(item.text ?? '').trim() || '';
    var description = rawText.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').split('\n').map(function (l) { return l.trim(); }).filter(Boolean).join('\n\n') || 'خرید از ريتكس.';
    return {
      id: id,
      name: name,
      image: image || 'Images/Shop/product-pic1.jpg',
      description: description,
      category: groups,
      mainCategoryId: mapGroupToMainCategoryId(groups),
      filterCategories: getFilterCategories(groups, name)
    };
  }

  function parseShopResponse(data) {
    var raw = Array.isArray(data) ? data : (data && typeof data === 'object' ? (data.data || data.list || data.items) || [] : []);
    if (!Array.isArray(raw)) return [];
    return raw.map(function (item, i) { return normalizeProduct(item, i); });
  }

  function getIconSvg(mainCategoryId) {
    var cls = 'valid-card-icon';
    switch (mainCategoryId) {
      case 'currency':
        return '<svg class="' + cls + '" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>';
      case 'exams':
        return '<svg class="' + cls + '" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>';
      case 'embassy':
        return '<svg class="' + cls + '" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>';
      case 'apply':
        return '<svg class="' + cls + '" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>';
      case 'giftcards':
        return '<svg class="' + cls + '" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>';
      default:
        return '<svg class="' + cls + '" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>';
    }
  }

  function renderGrid(products, selectedCategory) {
    var gridEl = document.getElementById('valid-cards-grid');
    if (!gridEl) return;
    var list = selectedCategory === 'all'
      ? products
      : products.filter(function (p) { return p.filterCategories.indexOf(selectedCategory) !== -1; });
    if (list.length === 0) {
      gridEl.innerHTML = '<p class="valid-cards-empty">خدماتی در این دسته‌بندی یافت نشد.</p>';
      return;
    }
    gridEl.innerHTML = list.map(function (p) {
      var imgSrc = (p.image && p.image.indexOf('http') === 0) ? p.image : (p.image || 'Images/Shop/product-pic1.jpg');
      var iconOrImg = p.image && p.image.trim()
        ? '<img src="' + escapeHtml(imgSrc) + '" alt="" class="valid-card-img" onerror="this.style.display=\'none\'; this.nextElementSibling && (this.nextElementSibling.style.display=\'flex\');">' +
          '<span class="valid-card-icon-wrap" style="display:none;">' + getIconSvg(p.mainCategoryId) + '</span>'
        : '<span class="valid-card-icon-wrap">' + getIconSvg(p.mainCategoryId) + '</span>';
      var desc = (p.description || '').split('\n')[0].trim().substring(0, 80);
      if ((p.description || '').length > 80) desc += '…';
      var link = (p.slug != null) ? 'valid-cards/service.html?slug=' + encodeURIComponent(p.slug) : 'valid-cards/service.html?id=' + encodeURIComponent(p.id);
      return '<a href="' + link + '" class="service-card">' +
        '<div class="valid-card-media">' + iconOrImg + '</div>' +
        '<h3>' + escapeHtml(p.name) + '</h3>' +
        '<p class="service-card-desc">' + escapeHtml(desc || p.name) + '</p>' +
        '</a>';
    }).join('');
  }

  function render() {
    var filterEl = document.getElementById('valid-cards-filters');
    var gridEl = document.getElementById('valid-cards-grid');
    if (!filterEl || !gridEl) return; /* فقط در صفحه لیست کارت‌ها اجرا شود */

    var categories = window.validCardsCategories || [
      { id: 'all', label: 'همه خدمات', value: 'all' },
      { id: 'mastercard', label: 'مسترکارت', value: 'mastercard' },
      { id: 'visa', label: 'ویزا', value: 'visa' },
      { id: 'gaming', label: 'گیمری', value: 'gaming' },
      { id: 'gift', label: 'هدیه', value: 'gift' }
    ];

    filterEl.innerHTML = categories.map(function (c) {
      var cls = c.value === 'all' ? 'active' : '';
      return '<button type="button" data-category="' + escapeHtml(c.value) + '" class="' + cls + '">' + escapeHtml(c.label) + '</button>';
    }).join('');

    var selectedCategory = 'all';
    function updateGrid(products) {
      renderGrid(products, selectedCategory);
    }

    filterEl.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedCategory = btn.getAttribute('data-category') || 'all';
        filterEl.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        updateGrid(window._validCardsProducts || []);
      });
    });

    gridEl.innerHTML = '<p class="valid-cards-loading">در حال بارگذاری از API…</p>';

    fetch(API + '?action=shop&_t=' + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var products = parseShopResponse(data);
        window._validCardsProducts = products;
        if (products.length === 0) {
          var fallback = window.validCardsServices || [];
          window._validCardsProducts = fallback.map(function (s, i) {
            return {
              id: s.id || i + 1,
              slug: typeof s.id === 'string' ? s.id : null,
              name: s.label || '',
              image: '',
              description: s.description || '',
              category: s.category || 'other',
              mainCategoryId: s.category === 'mastercard' ? 'currency' : s.category === 'visa' ? 'currency' : s.category === 'gaming' ? 'giftcards' : 'giftcards',
              filterCategories: [s.category || 'all']
            };
          });
        }
        updateGrid(window._validCardsProducts);
      })
      .catch(function () {
        var fallback = window.validCardsServices || [];
        window._validCardsProducts = fallback.map(function (s, i) {
          return {
            id: s.id || i + 1,
            slug: typeof s.id === 'string' ? s.id : null,
            name: s.label || '',
            image: '',
            description: s.description || '',
            category: s.category || 'other',
            mainCategoryId: 'currency',
            filterCategories: [s.category || 'all']
          };
        });
        updateGrid(window._validCardsProducts);
      });
  }

  window.getValidCardIconSvg = getIconSvg;
  window.mapGroupToMainCategoryId = mapGroupToMainCategoryId;
  window.parseShopResponse = parseShopResponse;
  window.normalizeProduct = normalizeProduct;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
