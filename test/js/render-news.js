/**
 * رندر صفحه اخبار و مقالات — اتصال به API (action=Article) مطابق raitx-platform
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

  function normalizeArticle(raw) {
    var cat = raw.category ?? raw.Category;
    var category = (cat != null && String(cat).trim() !== '') ? String(cat).trim() : 'متفرقه';
    var content = Array.isArray(raw.content) ? raw.content : (raw.content ? [raw.content] : []);
    var desc = (content[0] && String(content[0]).trim()) ? String(content[0]).trim().substring(0, 120) + '...' : '';
    return {
      id: Number(raw.id ?? raw.ID ?? 0),
      title: String(raw.title ?? raw.Title ?? ''),
      slug: String(raw.slug ?? raw.Slug ?? ''),
      category: category,
      image: String(raw.image ?? raw.Image ?? '').trim() || 'Images/Shop/product-pic1.jpg',
      date: String(raw.date ?? raw.Date ?? ''),
      comments: Number(raw.comments ?? raw.Comments ?? 0),
      description: desc
    };
  }

  function parseList(data) {
    var raw = Array.isArray(data) ? data : (data && (data.data || data.items || data.list || data.Articles)) || [];
    if (!Array.isArray(raw)) return [];
    return raw.map(function (item) {
      return normalizeArticle(typeof item === 'object' && item != null ? item : {});
    });
  }

  function normalizeCategoryStr(s) {
    if (s == null || typeof s !== 'string') return '';
    return s.replace(/\+/g, ' ').trim();
  }

  function getCategoryFromUrl() {
    var m = /[?&]category=([^&]+)/.exec(window.location.search);
    if (!m) return '';
    try {
      return normalizeCategoryStr(decodeURIComponent(m[1]));
    } catch (e) {
      return normalizeCategoryStr(m[1]);
    }
  }

  function categoryMatch(a, b) {
    return normalizeCategoryStr(a) === normalizeCategoryStr(b);
  }

  function renderSidebar(categories, sidebarEl, currentCategory) {
    if (!sidebarEl || !categories || !categories.length) return;
    var first = categories[0];
    var rest = categories.slice(1);
    var isAll = !currentCategory || categoryMatch(currentCategory, first);
    sidebarEl.innerHTML = '<h3>دسته‌بندی‌ها</h3>' +
      '<a href="news.html" class="' + (isAll ? 'active' : '') + '"><span class="dot"></span>' + escapeHtml(first) + '</a>' +
      rest.map(function (c) {
        var active = currentCategory && categoryMatch(c, currentCategory) ? ' active' : '';
        return '<a href="news.html?category=' + encodeURIComponent(c) + '" class="' + active + '"><span class="dot"></span>' + escapeHtml(c) + '</a>';
      }).join('');
  }

  function renderFeatured(articles, featuredWrap, currentCategory) {
    if (!featuredWrap) return;
    var list = (articles || []).slice(0, 6);
    var emptyMsg = currentCategory ? 'در این دسته مقاله‌ای یافت نشد.' : 'مقاله‌ای از API بارگذاری نشد.';
    if (list.length === 0) {
      featuredWrap.innerHTML = '<h2 class="news-section-title">مقالات</h2><p class="news-empty">' + emptyMsg + '</p>';
      return;
    }
    var row1 = list.slice(0, 3);
    var row2 = list.slice(3, 6);
    var cardHtml = function (a) {
      var img = (a.image && a.image.indexOf('http') === 0) ? a.image : (a.image || 'Images/Shop/product-pic1.jpg');
      return '<a href="news/article.html?slug=' + encodeURIComponent(a.slug) + '" class="news-featured-card">' +
        '<div class="news-featured-card-img"><img src="' + escapeHtml(img) + '" alt="" onerror="this.src=\'Images/Shop/product-pic1.jpg\'; this.onerror=null;"></div>' +
        '<div class="news-featured-card-body">' +
        '<span class="news-featured-card-tag">' + escapeHtml(a.category) + '</span>' +
        '<h3 class="news-featured-card-title">' + escapeHtml(a.title) + '</h3>' +
        '<span class="news-featured-card-meta">' + (a.comments || 0) + ' دیدگاه</span></div></a>';
    };
    featuredWrap.innerHTML =
      '<h2 class="news-section-title">مقالات</h2>' +
      '<div class="news-featured-grid">' +
      row1.map(cardHtml).join('') + row2.map(cardHtml).join('') +
      '</div>';
  }

  function renderLatest(articles, latestEl, currentCategory) {
    if (!latestEl) return;
    var list = articles || [];
    var emptyMsg = currentCategory ? 'در این دسته مقاله‌ای یافت نشد.' : 'مقاله‌ای یافت نشد.';
    if (list.length === 0) {
      latestEl.innerHTML = '<div class="news-latest-title"><h2>آخرین اخبار سایت</h2></div><p class="news-empty">' + emptyMsg + '</p>';
      return;
    }
    latestEl.innerHTML =
      '<div class="news-latest-title"><h2>آخرین اخبار سایت</h2></div>' +
      '<div class="news-latest-grid">' +
      list.map(function (a) {
        var img = (a.image && a.image.indexOf('http') === 0) ? a.image : (a.image || 'Images/Shop/product-pic1.jpg');
        return '<a href="news/article.html?slug=' + encodeURIComponent(a.slug) + '" class="news-latest-card">' +
          '<div class="img-wrap"><img src="' + escapeHtml(img) + '" alt="" onerror="this.src=\'Images/Shop/product-pic1.jpg\'; this.onerror=null;"></div>' +
          '<div class="body">' +
          '<div class="date">' + escapeHtml(a.date) + '</div>' +
          '<h3>' + escapeHtml(a.title) + '</h3>' +
          '<p class="desc">' + escapeHtml(a.description || '') + '</p>' +
          '<span class="more">مشاهده بیشتر ←</span></div></a>';
      }).join('') +
      '</div>';
  }

  function run(list) {
    var rawList = list || [];
    var set = {};
    rawList.forEach(function (a) {
      var cat = a.category != null ? String(a.category).trim() : '';
      if (cat) set[cat] = true;
    });
    var rest = Object.keys(set).sort(function (x, y) { return x.localeCompare(y, 'fa'); });
    var categories = ['همه مقالات'].concat(rest);
    if (categories.length === 1) categories = window.newsCategories || ['همه مقالات', 'طراحی', 'سئو', 'برنامه‌نویسی', 'خدمات ارزی', 'پرداخت ارزی', 'ویزا و سفارت'];

    var currentCategory = getCategoryFromUrl();
    var filtered = !currentCategory || categoryMatch(currentCategory, 'همه مقالات')
      ? rawList
      : rawList.filter(function (a) {
          var cat = a.category != null ? String(a.category).trim() : '';
          return categoryMatch(cat, currentCategory);
        });

    var sidebarEl = document.getElementById('news-sidebar');
    var featuredWrap = document.getElementById('news-featured');
    var latestEl = document.getElementById('news-latest');

    renderSidebar(categories, sidebarEl, currentCategory);
    renderFeatured(filtered, featuredWrap, currentCategory);
    renderLatest(filtered, latestEl, currentCategory);
  }

  function showLoading(show) {
    var loadingEl = document.getElementById('news-loading');
    var layoutEl = document.getElementById('news-layout');
    if (loadingEl) loadingEl.style.display = show ? 'flex' : 'none';
    if (layoutEl) layoutEl.style.display = show ? 'none' : 'grid';
  }

  function render() {
    var featuredWrap = document.getElementById('news-featured');
    var latestEl = document.getElementById('news-latest');
    if (!featuredWrap || !latestEl) return;

    showLoading(true);

    fetch(API + '?action=Article&_t=' + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var list = parseList(data);
        if (list.length > 0) {
          run(list);
          showLoading(false);
          return;
        }
        throw new Error('empty');
      })
      .catch(function () {
        var featured = window.newsFeatured || [];
        var latest = window.newsLatest || [];
        var list = featured.length ? featured.slice() : [];
        if (!list.length && latest.length) {
          list = latest.map(function (item) {
            var f = featured.find(function (fe) { return fe.slug === item.slug; });
            return Object.assign({}, item, { category: (f && f.category) ? f.category : 'متفرقه' });
          });
        }
        if (!list.length) list = latest.slice().map(function (item) { return Object.assign({}, item, { category: item.category || 'متفرقه' }); });
        run(list);
        showLoading(false);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
