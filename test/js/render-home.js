/**
 * رندر بخش‌های صفحه اصلی از js/data/home.js
 */
(function () {
  'use strict';

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function render() {
    if (typeof window.homeData === 'undefined') return;

    var data = window.homeData;

    var heroImg = document.querySelector('.hero-bg img');
    if (heroImg) {
      heroImg.src = data.heroImage;
      heroImg.alt = data.heroTitle + ' - ريتكس';
    }
    var heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = data.heroTitle;
    var heroDesc = document.querySelector('.hero-desc');
    if (heroDesc) heroDesc.textContent = data.heroDesc;

    var servicesWrap = document.getElementById('home-services');
    if (servicesWrap && data.services && data.services.length) {
      servicesWrap.innerHTML = data.services.map(function (s) {
        return '<a href="' + escapeHtml(s.href) + '" class="card">' +
          '<div class="card-icon" style="color:' + escapeHtml(s.iconColor) + '">' +
          '<svg class="card-icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg></div>' +
          '<h3>' + escapeHtml(s.title) + '</h3><p>' + escapeHtml(s.description) + '</p></a>';
      }).join('');
    }

    var paymentWrap = document.getElementById('home-payment');
    if (paymentWrap && data.paymentMethods && data.paymentMethods.length) {
      paymentWrap.innerHTML = data.paymentMethods.map(function (p) {
        return '<a href="' + escapeHtml(p.href) + '" class="card">' +
          '<div class="card-icon" style="color:' + escapeHtml(p.iconColor) + '">' +
          '<svg class="card-icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>' +
          '<h3>' + escapeHtml(p.title) + '</h3><p>' + escapeHtml(p.description) + '</p></a>';
      }).join('');
    }

    var examsWrap = document.getElementById('home-exams');
    if (examsWrap && data.exams && data.exams.length) {
      examsWrap.innerHTML = data.exams.map(function (e) {
        var href = e.href || 'currency-payment.html';
        return '<a href="' + escapeHtml(href) + '" class="card">' +
          '<h3>' + escapeHtml(e.title) + '</h3><p>' + escapeHtml(e.description) + '</p></a>';
      }).join('');
    }

    var visaWrap = document.getElementById('home-visa');
    if (visaWrap && data.visaPayments && data.visaPayments.length) {
      visaWrap.innerHTML = data.visaPayments.map(function (v) {
        return '<a href="' + escapeHtml(v.href) + '" class="card">' +
          '<h3>' + escapeHtml(v.title) + '</h3><p>' + escapeHtml(v.description) + '</p></a>';
      }).join('');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
