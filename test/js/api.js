/**
 * آدرس پایه API مطابق raitx-platform:
 * - اگر روی همان دامنهٔ Next.js (مثلاً localhost:3000) باشیم → از پروکسی داخلی `/api/auth-proxy` استفاده می‌کند
 * - در غیر این صورت → مستقیماً به mrpremiumhub.org/api.ashx می‌زند
 */
(function (global) {
  'use strict';

  function detectApiBase() {
    try {
      if (typeof global.location !== 'undefined') {
        var origin = global.location.origin || '';
        // وقتی با dev سرور Next (یا دیپلوی اصلی) روی یک اوریجین هستیم
        if (origin.indexOf('localhost:3000') !== -1) {
          // پروکسی داخلی Next: /api/auth-proxy → mrpremiumhub.org/api.ashx
          return '/api/auth-proxy';
        }
      }
    } catch (e) {
      // در صورت هر خطایی، به آدرس مستقیم برمی‌گردیم
    }
    // پیش‌فرض: آدرس مستقیم API اصلی
    return 'https://mrpremiumhub.org/api.ashx';
  }

  var BASE = detectApiBase();

  global.API_BASE = function () {
    return BASE;
  };

  global.getApiUrl = function (query) {
    var q = (query || '').toString();
    if (q.charAt(0) === '?') q = q.slice(1);
    return BASE + (q ? '?' + q : '');
  };
})(typeof window !== 'undefined' ? window : this);

