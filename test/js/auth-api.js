/**
 * API دقیقاً مطابق تست شما — فقط همین آدرس، بدون پروکسی
 */
(function (global) {
  'use strict';
  var API_BASE = 'https://mrpremiumhub.org/api.ashx';

  function GetData(url) {
    return fetch(API_BASE + '?action=' + url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function (response) { return response.json(); })
      .then(function (data) { return data; })
      .catch(function (error) { console.log('Error:', error); throw error; });
  }

  function PostData(url, data) {
    return fetch(API_BASE + '?action=' + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) { return response.json(); })
      .then(function (data) { return data; })
      .catch(function (error) { console.log('Error:', error); throw error; });
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  function getCookie(cname) {
    var name = cname + '=';
    var decoded = decodeURIComponent(document.cookie);
    var ca = decoded.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
  }

  /** شماره را برای API یکدست می‌کند: 09... یا 989... → 989... */
  function normalizePhone(phone) {
    var s = (phone || '').trim().replace(/\s/g, '');
    var num = '';
    var persian = '۰۱۲۳۴۵۶۷۸۹';
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (c >= '0' && c <= '9') num += c;
      else { var p = persian.indexOf(c); if (p !== -1) num += p; }
    }
    if (num.length < 10) return '';
    if (num.charAt(0) === '0') num = '98' + num.slice(1);
    else if (num.indexOf('98') !== 0) num = '98' + num;
    return num;
  }

  /** برای ارسال به API: 989... → 0989... (با صفر اول) */
  function phoneForApi(normalized) {
    if (!normalized) return normalized;
    if (String(normalized).indexOf('98') === 0) return '0' + normalized;
    return normalized;
  }

  global.AuthApi = {
    GetData: GetData,
    PostData: PostData,
    setCookie: setCookie,
    getCookie: getCookie,
    normalizePhone: normalizePhone,
    phoneForApi: phoneForApi
  };
})(typeof window !== 'undefined' ? window : this);
