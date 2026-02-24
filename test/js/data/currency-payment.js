/**
 * دیتای پرداخت ارزی — مطابق raitx-platform currency-payment/servicesData
 */
(function () {
  'use strict';

  window.currencyPaymentServices = [
    { id: 'paypal', label: 'پی پال', labelEn: 'PayPal', description: 'نقد کردن درآمد پی پال و پرداخت با پی پال', category: 'payment' },
    { id: 'mastercard', label: 'مسترکارت', labelEn: 'MasterCard', description: 'دریافت و استفاده از کارت‌های اعتباری بین‌المللی', category: 'payment' },
    { id: 'credit-cards', label: 'کارت های اعتباری', labelEn: 'Credit Cards', description: 'دریافت انواع کارت‌های اعتباری بین‌المللی', category: 'payment' },
    { id: 'crypto', label: 'ارز دیجیتال', labelEn: 'Cryptocurrency', description: 'خرید و فروش ارزهای دیجیتال', category: 'crypto' },
    { id: 'transfer', label: 'حواله ارزی', labelEn: 'Money Transfer', description: 'ارسال حواله ارزی به سراسر جهان', category: 'payment' },
    { id: 'currency', label: 'نقد کردن درآمد ارزی', labelEn: 'Currency Exchange', description: 'تبدیل و نقد کردن درآمدهای ارزی', category: 'payment' },
    { id: 'toefl', label: 'پرداخت تافل', labelEn: 'TOEFL iBT', description: 'پرداخت هزینه آزمون تافل', category: 'education' },
    { id: 'gre', label: 'پرداخت جی آر ای', labelEn: 'GRE', description: 'پرداخت هزینه آزمون GRE', category: 'education' },
    { id: 'university', label: 'پرداخت امور دانشگاهی', labelEn: 'University Payments', description: 'پرداخت هزینه‌های دانشگاهی و اپلیکیشن فی', category: 'education' },
    { id: 'language-exam', label: 'ثبت نام آزمون زبان', labelEn: 'Language Exam', description: 'ثبت نام و پرداخت هزینه آزمون‌های زبان؛ IELTS، TOEFL، PTE، GRE، Duolingo از طریق ريتكس', category: 'education' },
    { id: 'student-payment', label: 'پرداخت دانشجویی', labelEn: 'Student Payment', description: 'پرداخت هزینه‌های دانشجویی؛ شهریه، خوابگاه، اپلیکیشن فی، WES از طریق ريتكس', category: 'education' },
    { id: 'international-exam', label: 'آزمونهای بین المللی', labelEn: 'International Exams', description: 'ثبت نام و پرداخت آزمون‌های بین‌المللی؛ GMAT، USMLE، PMP، IMAT، SAT، Prometric از طریق ريتكس', category: 'education' },
    { id: 'vps-trading', label: 'VPS تریدینگ', labelEn: 'VPS Trading', description: 'خرید سرور مجازی ترید با آی‌پی ثابت؛ پلن‌های رم ۶ و رم ۸، تحویل ۲ تا ۲۴ ساعت کاری', category: 'vps' },
    { id: 'vps-daily', label: 'VPS روزانه', labelEn: 'Daily VPS', description: 'سرور مجازی روزانه یک‌روزه و پنج‌روزه؛ آمریکا و انگلیس، ویندوز، تحویل ۱ تا ۵ ساعت', category: 'vps' },
    { id: 'vps-usa', label: 'VPS آمریکا', labelEn: 'VPS USA', description: 'سرور مجازی آمریکا؛ پلن پایه و حرفه‌ای، آی‌پی آمریکا، تحویل ۲ تا ۲۴ ساعت', category: 'vps' },
    { id: 'vps-netherlands', label: 'VPS هلند', labelEn: 'VPS Netherlands', description: 'سرور مجازی هلند؛ پلن پایه و حرفه‌ای، آی‌پی آمستردام، تحویل ۲ تا ۲۴ ساعت', category: 'vps' },
    { id: 'vps-france', label: 'VPS فرانسه', labelEn: 'VPS France', description: 'سرور مجازی فرانسه؛ پلن پایه و حرفه‌ای، آی‌پی پاریس، تحویل ۲ تا ۲۴ ساعت', category: 'vps' },
    { id: 'ai-account', label: 'خرید اکانت هوش مصنوعی', labelEn: 'AI Account', description: 'خرید اکانت‌های پریمیوم هوش مصنوعی؛ ChatGPT، Midjourney، Jasper از طریق ريتكس', category: 'premium' },
    { id: 'seo-account', label: 'خرید اکانت ابزارهای سئو', labelEn: 'SEO Tools Account', description: 'خرید اکانت پریمیوم ابزارهای سئو؛ SEMrush، Ahrefs، KWFinder، MOZ از طریق ريتكس', category: 'premium' },
    { id: 'game-account', label: 'خرید اکانت بازی', labelEn: 'Game Account', description: 'خرید اکانت‌های پریمیوم بازی؛ Xbox Game Pass، PlayStation Plus، Steam، Epic Games از طریق ريتكس', category: 'premium' },
    { id: 'software-account', label: 'خرید اکانت اورجینال نرم افزار', labelEn: 'Software Account', description: 'خرید اکانت نرم‌افزارهای اورجینال', category: 'premium' },
    { id: 'international-sim', label: 'سیم کارت بین المللی', labelEn: 'International SIM Card', description: 'خرید سیم کارت بین‌المللی', category: 'international' },
    { id: 'virtual-number', label: 'شماره مجازی', labelEn: 'Virtual Number', description: 'خرید شماره مجازی', category: 'international' },
    { id: 'domain', label: 'خرید دامنه', labelEn: 'Domain Purchase', description: 'خرید دامنه از وب‌سایت‌های معتبر خارجی مثل GoDaddy، Name.com', category: 'international' },
    { id: 'host', label: 'خرید هاست', labelEn: 'Host Purchase', description: 'هاست خارجی برای راه‌اندازی وب‌سایت‌های حرفه‌ای؛ پشتیبانی ۲۴ ساعته', category: 'international' },
    { id: 'tickets', label: 'بلیط هواپیما، قطار و اتوبوس', labelEn: 'Tickets', description: 'خرید بلیط هواپیما، قطار و اتوبوس', category: 'travel' },
    { id: 'hotel', label: 'هتل و گردشی تفریحی', labelEn: 'Hotels & Tourism', description: 'رزرو هتل و خدمات گردشگری', category: 'travel' },
    { id: 'embassy', label: 'وقت سفارت کشورها', labelEn: 'Embassy Appointments', description: 'پرداخت هزینه ویزا و رزرو وقت سفارت', category: 'travel' },
    { id: 'themeforest', label: 'تم فارست', labelEn: 'Theme Forest', description: 'خرید قالب و افزونه از تم فارست', category: 'other' },
    { id: 'digitalocean', label: 'دیجیتال اوشن', labelEn: 'Digital Ocean', description: 'پرداخت هزینه سرویس‌های دیجیتال اوشن', category: 'other' }
  ];

  window.currencyPaymentCategories = [
    { id: 'all', label: 'همه خدمات', value: 'all' },
    { id: 'payment', label: 'پرداخت', value: 'payment' },
    { id: 'education', label: 'دانشگاهی', value: 'education' },
    { id: 'vps', label: 'VPS', value: 'vps' },
    { id: 'premium', label: 'اکانت پریمیوم', value: 'premium' },
    { id: 'international', label: 'بین‌المللی', value: 'international' },
    { id: 'travel', label: 'مسافرتی', value: 'travel' },
    { id: 'crypto', label: 'ارز دیجیتال', value: 'crypto' },
    { id: 'other', label: 'سایر', value: 'other' }
  ];
})();
