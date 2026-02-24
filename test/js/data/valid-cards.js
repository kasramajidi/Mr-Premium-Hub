/**
 * دیتای کارت های اعتباری — مطابق raitx-platform valid-cards/servicesData
 * فقط سرویس‌هایی که در صفحه کارت‌های اعتباری نمایش داده می‌شوند.
 */
(function () {
  'use strict';

  window.validCardsServices = [
    { id: 'mastercard-prime', label: 'مسترکارت فیزیکی پرایم', labelEn: 'MasterCard Prime Physical', description: 'دریافت مسترکارت فیزیکی پرایم', category: 'mastercard' },
    { id: 'mastercard-us-virtual', label: 'مسترکارت مجازی آمریکا', labelEn: 'MasterCard US Virtual', description: 'دریافت مسترکارت مجازی آمریکا', category: 'mastercard' },
    { id: 'mastercard-virtual', label: 'مسترکارت مجازی', labelEn: 'MasterCard Virtual', description: 'دریافت مسترکارت مجازی', category: 'mastercard' },
    { id: 'mastercard-physical', label: 'مسترکارت فیزیکی', labelEn: 'MasterCard Physical', description: 'دریافت مسترکارت فیزیکی', category: 'mastercard' },
    { id: 'mastercard-personal', label: 'مسترکارت فیزیکی پرسونال', labelEn: 'MasterCard Personal Physical', description: 'دریافت مسترکارت فیزیکی پرسونال', category: 'mastercard' },
    { id: 'visa-virtual', label: 'ویزا کارت مجازی', labelEn: 'Visa Virtual Card', description: 'دریافت ویزا کارت مجازی', category: 'visa' },
    { id: 'visa-physical', label: 'ویزا کارت فیزیکی', labelEn: 'Visa Physical Card', description: 'دریافت ویزا کارت فیزیکی', category: 'visa' },
    { id: 'credit-card', label: 'کردیت کارت', labelEn: 'Credit Card', description: 'دریافت کردیت کارت', category: 'visa' },
    { id: 'visa-gift', label: 'ویزا کارت هدیه', labelEn: 'Visa Gift Card', description: 'خرید ویزا کارت هدیه', category: 'gift' },
    { id: 'gift-card-visa', label: 'گیفت کارت ویزا', labelEn: 'Visa Gift Card', description: 'خرید انواع گیفت کارت‌های بین‌المللی', category: 'gift' },
    { id: 'playstation', label: 'گیفت کارت Play Station', labelEn: 'PlayStation Gift Card', description: 'خرید گیفت کارت Play Station', category: 'gaming' },
    { id: 'xbox', label: 'گیفت کارت ایکس باکس XBOX', labelEn: 'Xbox Gift Card', description: 'خرید گیفت کارت Xbox', category: 'gaming' },
    { id: 'steam', label: 'گیفت کارت استیم والت Steam', labelEn: 'Steam Gift Card', description: 'خرید گیفت کارت Steam', category: 'gaming' },
    { id: 'battlenet', label: 'گیفت کارت بتل نت Battle.Net', labelEn: 'Battle.Net Gift Card', description: 'خرید گیفت کارت Battle.Net', category: 'gaming' },
    { id: 'amazon', label: 'گیفت کارت آمازون', labelEn: 'Amazon Gift Card', description: 'خرید گیفت کارت آمازون', category: 'gift' },
    { id: 'apple', label: 'گیفت کارت اپل', labelEn: 'Apple Gift Card', description: 'خرید گیفت کارت اپل', category: 'gift' },
    { id: 'spotify', label: 'گیفت کارت اسپاتیفای', labelEn: 'Spotify Gift Card', description: 'خرید گیفت کارت Spotify', category: 'gift' },
    { id: 'netflix', label: 'گیفت کارت نتفلیکس', labelEn: 'Netflix Gift Card', description: 'خرید گیفت کارت Netflix', category: 'gift' }
  ];

  window.validCardsCategories = [
    { id: 'all', label: 'همه خدمات', value: 'all' },
    { id: 'gaming', label: 'گیفت کارت بازی', value: 'gaming' },
    { id: 'visa', label: 'ویزا کارت', value: 'visa' },
    { id: 'mastercard', label: 'مسترکارت', value: 'mastercard' },
    { id: 'gift', label: 'گیفت کارت ها', value: 'gift' }
  ];
})();
