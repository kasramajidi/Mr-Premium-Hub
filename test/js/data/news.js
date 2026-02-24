/**
 * دیتای اخبار و مقالات — مطابق raitx-platform news/components/data.ts
 */
(function () {
  'use strict';

  window.newsFeatured = [
    { id: 1, title: 'مواردی که قبل از طراحی سایت باید بدانید !', category: 'طراحی', comments: 0, image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#1', slug: 'مواردی-که-قبل-از-طراحی-سایت-باید-بدانید' },
    { id: 2, title: 'چند نکته برای لینک سازی داخلی که در افزایش رتبه سایت شما جادو میکند !', category: 'سئو', comments: 0, image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#2', slug: 'چند-نکته-لینک-سازی' },
    { id: 3, title: 'معرفی 5 ایده طراحی سایت', category: 'طراحی', comments: 0, image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#3', slug: 'معرفی-5-ایده-طراحی-سایت' },
    { id: 4, title: 'چجوری از برنامه نویسی پول در بیاریم', category: 'برنامه‌نویسی', comments: 0, image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#4', slug: 'چجوری-از-برنامه-نویسی-پول-در-بیاریم' },
    { id: 5, title: 'سالادی که هندی ها دوست دارند !', category: 'متفرقه', comments: 0, image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#5', slug: 'سالادی-که-هندی-ها-دوست-دارند' }
  ];

  window.newsLatest = [
    { id: 1, title: 'نکاتی در رابطه با قرارداد طراحی گرافیک و تعیین مبلغ طراحی', description: 'در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...', date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#1', slug: 'نکاتی-در-رابطه-با-قرارداد-طراحی' },
    { id: 2, title: 'چند نکته برای لینک سازی داخلی که در افزایش رتبه سایت شما', description: 'در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...', date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#2', slug: 'چند-نکته-لینک-سازی' },
    { id: 3, title: 'مواردی که قبل از طراحی سایت باید بدانید !', description: 'در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...', date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#3', slug: 'مواردی-که-قبل-از-طراحی-سایت-باید-بدانید' },
    { id: 4, title: 'معرفی پنج ایده جدید برای طراحی Ui , Ux', description: 'در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...', date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#4', slug: 'معرفی-پنج-ایده-جدید-طراحی-ui-ux' },
    { id: 5, title: 'بهترین روش‌های بهینه‌سازی سرعت سایت', description: 'در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...', date: '18 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#5', slug: 'بهترین-روش-های-بهینه-سازی-سرعت-سایت' },
    { id: 6, title: 'راهنمای کامل سئو برای کسب و کارهای آنلاین', description: 'در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...', date: '15 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', link: 'news.html#6', slug: 'راهنمای-کامل-سئو' }
  ];

  window.newsCategories = ['همه مقالات', 'طراحی', 'سئو', 'برنامه‌نویسی', 'خدمات ارزی', 'پرداخت ارزی', 'ویزا و سفارت'];

  var defaultContent = [
    'در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به همین خاطر شروع می‌کند به پرسیدن از مردم شهر و آنها نشانی یک مکان دیدنی را به او می‌دهند! توریست با خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.',
    'در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.'
  ];
  var defaultHeadings = ['استراتژی لینک سازی خارجی چیست؟', 'تنظیم استراتژی لینک سازی خارجی', '۱- محتوای یونیک و منحصربه‌فرد تولید کنید', '۲- شبکه‌سازی کنید'];

  window.newsArticleDetail = function (slug) {
    var list = [
      { slug: 'مواردی-که-قبل-از-طراحی-سایت-باید-بدانید', title: 'مواردی که قبل از طراحی سایت باید بدانید !', category: 'طراحی', comments: 1, date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', content: defaultContent, headings: defaultHeadings },
      { slug: 'چند-نکته-لینک-سازی', title: 'چند نکته برای لینک سازی داخلی که در افزایش رتبه سایت شما جادو میکند !', category: 'سئو', comments: 0, date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', content: defaultContent, headings: defaultHeadings },
      { slug: 'معرفی-5-ایده-طراحی-سایت', title: 'معرفی 5 ایده طراحی سایت', category: 'طراحی', comments: 0, date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', content: defaultContent, headings: defaultHeadings },
      { slug: 'چجوری-از-برنامه-نویسی-پول-در-بیاریم', title: 'چجوری از برنامه نویسی پول در بیاریم', category: 'برنامه‌نویسی', comments: 0, date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', content: defaultContent, headings: defaultHeadings },
      { slug: 'سالادی-که-هندی-ها-دوست-دارند', title: 'سالادی که هندی ها دوست دارند !', category: 'متفرقه', comments: 0, date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', content: defaultContent, headings: defaultHeadings },
      { slug: 'نکاتی-در-رابطه-با-قرارداد-طراحی', title: 'نکاتی در رابطه با قرارداد طراحی گرافیک و تعیین مبلغ طراحی', category: 'طراحی', comments: 0, date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', content: defaultContent, headings: defaultHeadings },
      { slug: 'معرفی-پنج-ایده-جدید-طراحی-ui-ux', title: 'معرفی پنج ایده جدید برای طراحی Ui , Ux', category: 'طراحی', comments: 0, date: '21 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', content: defaultContent, headings: defaultHeadings },
      { slug: 'بهترین-روش-های-بهینه-سازی-سرعت-سایت', title: 'بهترین روش‌های بهینه‌سازی سرعت سایت', category: 'سئو', comments: 0, date: '18 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', content: defaultContent, headings: defaultHeadings },
      { slug: 'راهنمای-کامل-سئو', title: 'راهنمای کامل سئو برای کسب و کارهای آنلاین', category: 'سئو', comments: 0, date: '15 سپتامبر 2023', image: 'Images/tp-best-mens-hairstyles.jpg', content: defaultContent, headings: defaultHeadings }
    ];
    var decoded = decodeURIComponent(slug || '');
    for (var i = 0; i < list.length; i++) {
      if (list[i].slug === slug || list[i].slug === decoded) return list[i];
    }
    return null;
  };
})();
