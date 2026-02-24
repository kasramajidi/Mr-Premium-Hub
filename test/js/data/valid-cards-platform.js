/**
 * داده کارت‌های اعتباری — عین پلتفرم raitx-platform (CreditCardsTabs + servicesData)
 */
(function () {
  'use strict';

  var serviceCategories = [
    { id: 'all', label: 'همه خدمات', value: 'all' },
    { id: 'GiftCardGame', label: 'گیفت کارت بازی', value: 'gaming' },
    { id: 'VisaCard', label: 'ویزا کارت', value: 'visa' },
    { id: 'MasterCard', label: 'مسترکارت', value: 'mastercard' },
    { id: 'GiftCards', label: 'گیفت کارت ها', value: 'gift' }
  ];

  var creditCardCategories = [
    {
      id: 'game-gift-cards',
      label: 'گیفت کارت بازی',
      labelEn: 'Game Gift Cards',
      description: 'خرید گیفت کارت‌های بازی برای کنسول‌ها و پلتفرم‌های مختلف',
      category: 'gaming',
      iconKey: 'desktop',
      items: [
        { label: 'گیفت کارت بتل نت Battle.Net', labelEn: 'Battle.Net Gift Card', href: 'valid-cards/service.html?slug=battlenet', iconKey: 'battlenet' },
        { label: 'گیفت کارت استیم والت Steam', labelEn: 'Steam Gift Card', href: 'valid-cards/service.html?slug=steam', iconKey: 'steam' },
        { label: 'گیفت کارت ایکس باکس XBOX', labelEn: 'Xbox Gift Card', href: 'valid-cards/service.html?slug=xbox', iconKey: 'xbox' },
        { label: 'گیفت کارت Play Station', labelEn: 'PlayStation Gift Card', href: 'valid-cards/service.html?slug=playstation', iconKey: 'playstation' }
      ]
    },
    {
      id: 'gift-cards',
      label: 'گیفت کارت‌ها',
      labelEn: 'Gift Cards',
      description: 'خرید انواع گیفت کارت‌های بین‌المللی',
      category: 'gift',
      iconKey: 'gift',
      items: [
        { label: 'گیفت کارت اسپاتیفای', labelEn: 'Spotify Gift Card', href: 'valid-cards/service.html?slug=spotify', iconKey: 'spotify' },
        { label: 'گیفت کارت اپل', labelEn: 'Apple Gift Card', href: 'valid-cards/service.html?slug=apple', iconKey: 'apple' },
        { label: 'گیفت کارت آمازون', labelEn: 'Amazon Gift Card', href: 'valid-cards/service.html?slug=amazon', iconKey: 'amazon' },
        { label: 'گیفت کارت ویزا', labelEn: 'Visa Gift Card', href: 'valid-cards/service.html?slug=gift-card-visa', iconKey: 'visa' },
        { label: 'گیفت کارت نتفلیکس', labelEn: 'Netflix Gift Card', href: 'valid-cards/service.html?slug=netflix', iconKey: 'netflix' }
      ]
    },
    {
      id: 'mastercard',
      label: 'مسترکارت',
      labelEn: 'MasterCard',
      description: 'دریافت و استفاده از کارت‌های اعتباری مسترکارت',
      category: 'mastercard',
      iconKey: 'mastercard',
      items: [
        { label: 'مسترکارت فیزیکی پرایم', labelEn: 'MasterCard Prime Physical', href: 'valid-cards/service.html?slug=mastercard-prime', iconKey: 'mastercard', description: 'دریافت مسترکارت فیزیکی پرایم' },
        { label: 'مسترکارت مجازی آمریکا', labelEn: 'MasterCard US Virtual', href: 'valid-cards/service.html?slug=mastercard-us-virtual', iconKey: 'globe', description: 'دریافت مسترکارت مجازی آمریکا' },
        { label: 'مسترکارت مجازی', labelEn: 'MasterCard Virtual', href: 'valid-cards/service.html?slug=mastercard-virtual', iconKey: 'creditcard', description: 'دریافت مسترکارت مجازی' },
        { label: 'مسترکارت فیزیکی', labelEn: 'MasterCard Physical', href: 'valid-cards/service.html?slug=mastercard-physical', iconKey: 'mastercard', description: 'دریافت مسترکارت فیزیکی' },
        { label: 'مسترکارت فیزیکی پرسونال', labelEn: 'MasterCard Personal Physical', href: 'valid-cards/service.html?slug=mastercard-personal', iconKey: 'creditcard', description: 'دریافت مسترکارت فیزیکی پرسونال' }
      ]
    },
    {
      id: 'visa-card',
      label: 'ویزا کارت',
      labelEn: 'Visa Card',
      description: 'دریافت و استفاده از کارت‌های اعتباری ویزا',
      category: 'visa',
      iconKey: 'visa',
      items: [
        { label: 'ویزا کارت مجازی', labelEn: 'Visa Virtual Card', href: 'valid-cards/service.html?slug=visa-virtual', iconKey: 'creditcard', description: 'دریافت ویزا کارت مجازی' },
        { label: 'ویزا کارت فیزیکی', labelEn: 'Visa Physical Card', href: 'valid-cards/service.html?slug=visa-physical', iconKey: 'visa', description: 'دریافت ویزا کارت فیزیکی' },
        { label: 'ویزا کارت هدیه', labelEn: 'Visa Gift Card', href: 'valid-cards/service.html?slug=visa-gift', iconKey: 'cardgift', description: 'خرید ویزا کارت هدیه' },
        { label: 'کردیت کارت', labelEn: 'Credit Card', href: 'valid-cards/service.html?slug=credit-card', iconKey: 'creditcard', description: 'دریافت کردیت کارت' }
      ]
    }
  ];

  /** لیست تخت همه سرویس‌ها برای صفحه جزئیات و مرتبط */
  var servicesFlat = [];
  creditCardCategories.forEach(function (cat) {
    cat.items.forEach(function (item) {
      var slug = (item.href.match(/[?&]slug=([^&]+)/) || [])[1] || item.href.replace(/^valid-cards\/|\.html.*$/g, '');
      servicesFlat.push({
        id: slug,
        label: item.label,
        labelEn: item.labelEn,
        description: item.description || cat.description,
        category: cat.category,
        href: item.href,
        iconKey: item.iconKey
      });
    });
  });

  window.validCardsPlatform = {
    serviceCategories: serviceCategories,
    creditCardCategories: creditCardCategories,
    servicesFlat: servicesFlat
  };
})();
