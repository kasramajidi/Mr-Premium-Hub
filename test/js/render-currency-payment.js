/**
 * رندر صفحه پرداخت ارزی از js/data/currency-payment.js
 */
(function () {
  'use strict';

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function render() {
    var services = window.currencyPaymentServices;
    var categories = window.currencyPaymentCategories;
    if (!services || !categories) return;

    var filterEl = document.getElementById('currency-payment-filters');
    var gridEl = document.getElementById('currency-payment-grid');
    if (!filterEl || !gridEl) return;

    var selectedCategory = 'all';
    /** هر تب فقط سرویس‌های مربوط به همان منو را نشان می‌دهد (هماهنگ با platform) */
    var categoryToSlugs = {
      all: null,
      international: ['payment', 'crypto', 'travel', 'international', 'other'],
      premium: ['premium'],
      education: ['education'],
      vps: ['vps']
    };
    function filterServices() {
      if (selectedCategory === 'all') return services;
      var allowed = categoryToSlugs[selectedCategory];
      if (Array.isArray(allowed)) return services.filter(function (s) { return allowed.indexOf(s.category) !== -1; });
      return services.filter(function (s) { return s.category === selectedCategory; });
    }

    function renderGrid() {
      var list = filterServices();
      gridEl.innerHTML = list.map(function (s) {
        return '<a href="currency-payment/service.html?slug=' + encodeURIComponent(s.id) + '" class="service-card">' +
          '<div class="icon-wrap">💰</div>' +
          '<h3>' + escapeHtml(s.label) + '</h3>' +
          (s.labelEn ? '<div class="label-en">' + escapeHtml(s.labelEn) + '</div>' : '') +
          '<p>' + escapeHtml(s.description) + '</p></a>';
      }).join('');
      if (list.length === 0) {
        gridEl.innerHTML = '<p class="section-desc" style="grid-column:1/-1;text-align:center;">خدماتی در این دسته‌بندی یافت نشد.</p>';
      }
    }

    filterEl.innerHTML = categories.map(function (c) {
      var cls = c.value === 'all' ? 'active' : '';
      return '<button type="button" data-category="' + escapeHtml(c.value) + '" class="' + cls + '">' + escapeHtml(c.label) + '</button>';
    }).join('');

    filterEl.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedCategory = btn.getAttribute('data-category') || 'all';
        filterEl.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderGrid();
      });
    });

    renderGrid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
