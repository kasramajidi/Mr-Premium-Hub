/**
 * داده پرداخت ارزی — عین پلتفرم currency-payment (servicesData)
 */
(function () {
  'use strict';

  /* منوی تب‌ها — ترتیب از راست به چپ: همه خدمات، خدمات بین المللی، اکانت های پریمیوم، آموزش و آزمون، سرویس های VPS */
  var serviceCategories = [
    { id: 'all', label: 'همه خدمات', value: 'all' },
    { id: 'international', label: 'خدمات بین المللی', value: 'international', categoryDescription: 'خدمات بین المللی شامل سیم کارت، شماره مجازی، دامنه و هاست' },
    { id: 'premium', label: 'اکانت های پریمیوم', value: 'premium', categoryDescription: 'خرید اکانت‌های پریمیوم برای هوش مصنوعی، سئو، بازی و نرم‌افزار' },
    { id: 'education', label: 'آموزش و آزمون', value: 'education', categoryDescription: 'ثبت نام آزمون‌های زبان و بین‌المللی و پرداخت‌های دانشجویی' },
    { id: 'vps', label: 'سرویس های VPS', value: 'vps', categoryDescription: 'سرویس‌های VPS برای تریدینگ و استفاده روزانه' }
  ];

  var services = [
    { id: 'paypal', label: 'پی پال', labelEn: 'PayPal', description: 'نقد کردن درآمد پی پال و پرداخت با پی پال', category: 'payment', iconKey: 'paypal' },
    { id: 'mastercard', label: 'مسترکارت', labelEn: 'MasterCard', description: 'دریافت و استفاده از کارت‌های اعتباری بین‌المللی', category: 'payment', iconKey: 'mastercard' },
    { id: 'credit-cards', label: 'کارت های اعتباری', labelEn: 'Credit Cards', description: 'دریافت انواع کارت‌های اعتباری بین‌المللی', category: 'payment', iconKey: 'creditcard' },
    { id: 'crypto', label: 'ارز دیجیتال', labelEn: 'Cryptocurrency', description: 'خرید و فروش ارزهای دیجیتال', category: 'crypto', iconKey: 'bitcoin' },
    { id: 'transfer', label: 'حواله ارزی', labelEn: 'Money Transfer', description: 'ارسال حواله ارزی به سراسر جهان', category: 'payment', iconKey: 'transfer' },
    { id: 'toefl', label: 'پرداخت تافل', labelEn: 'TOEFL iBT', description: 'پرداخت هزینه آزمون تافل', category: 'education', iconKey: 'academic' },
    { id: 'gre', label: 'پرداخت جی آر ای', labelEn: 'GRE', description: 'پرداخت هزینه آزمون GRE', category: 'education', iconKey: 'academic' },
    { id: 'university', label: 'پرداخت امور دانشگاهی', labelEn: 'University Payments', description: 'پرداخت هزینه‌های دانشگاهی و اپلیکیشن فی', category: 'education', iconKey: 'academic' },
    { id: 'tickets', label: 'بلیط هواپیما، قطار و اتوبوس', labelEn: 'Tickets', description: 'خرید بلیط هواپیما، قطار و اتوبوس', category: 'travel', iconKey: 'plane' },
    { id: 'hotel', label: 'هتل و گردشی تفریحی', labelEn: 'Hotels & Tourism', description: 'رزرو هتل و خدمات گردشگری', category: 'travel', iconKey: 'home' },
    { id: 'embassy', label: 'وقت سفارت کشورها', labelEn: 'Embassy Appointments', description: 'پرداخت هزینه ویزا و رزرو وقت سفارت', category: 'travel', iconKey: 'globe' },
    { id: 'themeforest', label: 'تم فارست', labelEn: 'Theme Forest', description: 'خرید قالب و افزونه از تم فارست', category: 'other', iconKey: 'template' },
    { id: 'digitalocean', label: 'دیجیتال اوشن', labelEn: 'Digital Ocean', description: 'پرداخت هزینه سرویس‌های دیجیتال اوشن', category: 'other', iconKey: 'digitalocean' },
    { id: 'currency', label: 'نقد کردن درآمد ارزی', labelEn: 'Currency Exchange', description: 'تبدیل و نقد کردن درآمدهای ارزی', category: 'payment', iconKey: 'transfer' },
    { id: 'other', label: 'سایر پرداخت ها', labelEn: 'Other Payments', description: 'سایر خدمات پرداخت و ارزی', category: 'other', iconKey: 'dots' },
    { id: 'vps-trading', label: 'VPS تریدینگ', labelEn: 'VPS Trading', description: 'خرید سرور مجازی ترید با آی‌پی ثابت از ريتكس؛ پلن‌های رم ۶ و رم ۸، تحویل ۲ تا ۲۴ ساعت کاری', category: 'vps', iconKey: 'server' },
    { id: 'vps-daily', label: 'VPS روزانه', labelEn: 'Daily VPS', description: 'سرور مجازی روزانه یک‌روزه و پنج‌روزه از ريتكس؛ آمریکا و انگلیس، ویندوز، تحویل ۱ تا ۵ ساعت', category: 'vps', iconKey: 'server' },
    { id: 'vps-usa', label: 'VPS آمریکا', labelEn: 'VPS USA', description: 'سرور مجازی آمریکا از ريتكس با پلن پایه و حرفه‌ای؛ آنلاین آمریکا، تحویل ۳ تا ۲۴ ساعت', category: 'vps', iconKey: 'server' },
    { id: 'vps-netherlands', label: 'VPS هلند', labelEn: 'VPS Netherlands', description: 'سرور مجازی هلند از ريتكس؛ پلن پایه و حرفه‌ای، آی‌پی آمستردام، تحویل ۳ تا ۲۴ ساعت', category: 'vps', iconKey: 'server' },
    { id: 'vps-france', label: 'VPS فرانسه', labelEn: 'VPS France', description: 'سرور مجازی فرانسه از ريتكس؛ پلن پایه و حرفه‌ای، آی‌پی پاریس، تحویل ۲۴ الی ۴۸ ساعت', category: 'vps', iconKey: 'server' },
    { id: 'ai-account', label: 'خرید اکانت هوش مصنوعی', labelEn: 'AI Account', description: 'خرید اکانت‌های پریمیوم هوش مصنوعی؛ ChatGPT، Midjourney، Jasper و سایر ابزارهای AI از طریق ريتكس', category: 'premium', iconKey: 'brain' },
    { id: 'seo-account', label: 'خرید اکانت ابزارهای سئو', labelEn: 'SEO Tools Account', description: 'خرید اکانت پریمیوم ابزارهای سئو؛ SEMrush، Ahrefs، KWFinder، MOZ و سایر ابزارها از طریق ريتكس', category: 'premium', iconKey: 'search' },
    { id: 'game-account', label: 'خرید اکانت بازی', labelEn: 'Game Account', description: 'خرید اکانت‌های پریمیوم بازی؛ Xbox Game Pass، PlayStation Plus، Steam، Epic Games و سایر پلتفرم‌ها از طریق ريتكس', category: 'premium', iconKey: 'gamepad' },
    { id: 'software-account', label: 'خرید اکانت اورجینال نرم افزار', labelEn: 'Software Account', description: 'خرید اکانت نرم‌افزارهای اورجینال', category: 'premium', iconKey: 'code' },
    { id: 'language-exam', label: 'ثبت نام آزمون زبان', labelEn: 'Language Exam', description: 'ثبت نام و پرداخت هزینه آزمون‌های زبان؛ IELTS، TOEFL، PTE، GRE، Duolingo و سایر آزمون‌ها از طریق ريتكس', category: 'education', iconKey: 'academic' },
    { id: 'student-payment', label: 'پرداخت دانشجویی', labelEn: 'Student Payment', description: 'پرداخت هزینه‌های دانشجویی؛ شهریه، خوابگاه، اپلیکیشن فی، WES و فعالیت‌های علمی بین‌المللی از طریق ريتكس', category: 'education', iconKey: 'academic' },
    { id: 'international-exam', label: 'آزمونهای بین المللی', labelEn: 'International Exams', description: 'ثبت نام و پرداخت آزمون‌های بین‌المللی؛ GMAT، USMLE، PMP، IMAT، SAT، Prometric، ICF، CFA و آزمون‌های زبان از طریق ريتكس', category: 'education', iconKey: 'globe' },
    { id: 'international-sim', label: 'سیم کارت بین المللی', labelEn: 'International SIM Card', description: 'خرید سیم کارت بین‌المللی', category: 'international', iconKey: 'sim' },
    { id: 'virtual-number', label: 'شماره مجازی', labelEn: 'Virtual Number', description: 'خرید شماره مجازی', category: 'international', iconKey: 'phone' },
    { id: 'domain', label: 'خرید دامنه', labelEn: 'Domain Purchase', description: 'خرید دامنه از وب‌سایت‌های معتبر خارجی مثل GoDaddy، Name.com و سایر ثبت‌کنندگان بین‌المللی', category: 'international', iconKey: 'domain' },
    { id: 'host', label: 'خرید هاست', labelEn: 'Host Purchase', description: 'هاست خارجی برای راه‌اندازی وب‌سایت‌های حرفه‌ای؛ خرید از ارائه‌دهندگان معتبر با کیفیت بالا و پشتیبانی ۲۴ ساعته', category: 'international', iconKey: 'cloud' }
  ];

  var baseHref = 'currency-payment/service.html?slug=';
  var servicesFlat = services.map(function (s) {
    return {
      id: s.id,
      label: s.label,
      labelEn: s.labelEn,
      description: s.description,
      category: s.category,
      href: baseHref + s.id,
      iconKey: s.iconKey
    };
  });

  window.currencyPaymentPlatform = {
    serviceCategories: serviceCategories,
    services: services,
    servicesFlat: servicesFlat
  };
})();
