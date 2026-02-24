/**
 * رندر صفحه FAQ از دادهٔ js/data/faq.js
 */
(function () {
  'use strict';

  function render() {
    if (typeof window.faqCategories === 'undefined') return;
    var sidebar = document.getElementById('faq-sidebar');
    var content = document.getElementById('faq-content');
    if (!sidebar || !content) return;

    var categories = window.faqCategories;
    var firstId = categories[0] && categories[0].id ? categories[0].id : 'general';

    sidebar.innerHTML = '';
    categories.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'faq-sidebar-btn' + (cat.id === firstId ? ' active' : '');
      btn.setAttribute('data-category', cat.id);
      btn.textContent = cat.label;
      sidebar.appendChild(btn);
    });

    content.innerHTML = '';
    categories.forEach(function (cat) {
      var section = document.createElement('div');
      section.className = 'faq-category-section';
      section.setAttribute('data-category', cat.id);
      section.style.display = cat.id === firstId ? 'block' : 'none';

      cat.faqs.forEach(function (faq) {
        var details = document.createElement('details');
        details.className = 'faq-accordion';
        details.innerHTML =
          '<summary><span>' + escapeHtml(faq.question) + '</span><span class="icon" aria-hidden="true">+</span></summary>' +
          '<div class="answer">' + escapeHtml(faq.answer) + '</div>';
        section.appendChild(details);
      });
      content.appendChild(section);
    });

    sidebar.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq-sidebar-btn');
      if (!btn) return;
      var id = btn.getAttribute('data-category');
      sidebar.querySelectorAll('.faq-sidebar-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      content.querySelectorAll('.faq-category-section').forEach(function (s) {
        s.style.display = s.getAttribute('data-category') === id ? 'block' : 'none';
      });
    });
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
