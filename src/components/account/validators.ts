/**
 * ابزارهای اعتبارسنجی و قالب‌بندی ایرانی  →  components/account/validators.ts
 * ارقام فارسی/عربی را قبل از بررسی به انگلیسی تبدیل می‌کند، پس کاربر با هر کیبوردی بنویسد درست کار می‌کند.
 */

const FA = "۰۱۲۳۴۵۶۷۸۹";
const AR = "٠١٢٣٤٥٦٧٨٩";

export const toEn = (s: string) =>
  s.replace(/[۰-۹]/g, (d) => String(FA.indexOf(d))).replace(/[٠-٩]/g, (d) => String(AR.indexOf(d)));

export const toFa = (v: string | number) => String(v).replace(/\d/g, (d) => FA[+d]);

export const onlyDigits = (s: string) => toEn(s).replace(/\D/g, "");

export const toman = (n: number) => `${n.toLocaleString("fa-IR")} تومان`;

/* موبایل ایران: ۰۹ + ۹ رقم */
export const isValidMobile = (s: string) => /^09\d{9}$/.test(onlyDigits(s));

/* کدپستی ۱۰ رقمی */
export const isValidPostalCode = (s: string) => /^\d{10}$/.test(onlyDigits(s));

/* کد ملی: الگوریتم رقم کنترل */
export function isValidNationalCode(input: string) {
  const c = onlyDigits(input);
  if (!/^\d{10}$/.test(c) || /^(\d)\1{9}$/.test(c)) return false;
  const check = +c[9];
  const sum = c
    .slice(0, 9)
    .split("")
    .reduce((a, d, i) => a + +d * (10 - i), 0);
  const r = sum % 11;
  return r < 2 ? check === r : check === 11 - r;
}

/* کارت بانکی: ۱۶ رقم + الگوریتم Luhn (کارت‌های شتاب هم از آن پیروی می‌کنند) */
export function isValidCard(input: string) {
  const c = onlyDigits(input);
  if (c.length !== 16) return false;
  let sum = 0;
  for (let i = 0; i < 16; i++) {
    let d = +c[15 - i];
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

/* «۶۰۳۷۹۹۱۲۳۴۵۶۷۸۹۰» → «۶۰۳۷ ۹۹۱۲ ۳۴۵۶ ۷۸۹۰» */
export const formatCardNumber = (s: string) =>
  onlyDigits(s)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

/* تشخیص بانک از ۶ رقم اول کارت (فهرست نمونه؛ در صورت نیاز کامل‌ترش کنید) */
const BINS: Record<string, string> = {
  "603799": "بانک ملی ایران",
  "589210": "بانک سپه",
  "627648": "بانک توسعه صادرات",
  "627961": "بانک صنعت و معدن",
  "603770": "بانک کشاورزی",
  "628023": "بانک مسکن",
  "627760": "پست بانک ایران",
  "627412": "بانک اقتصاد نوین",
  "622106": "بانک پارسیان",
  "502229": "بانک پاسارگاد",
  "621986": "بانک سامان",
  "639346": "بانک سینا",
  "639607": "بانک سرمایه",
  "636214": "بانک آینده",
  "502806": "بانک شهر",
  "504706": "بانک شهر",
  "603769": "بانک صادرات ایران",
  "610433": "بانک ملت",
  "627353": "بانک تجارت",
  "585983": "بانک تجارت",
  "589463": "بانک رفاه کارگران",
  "627381": "بانک انصار",
};

export const bankFromCard = (s: string) => BINS[onlyDigits(s).slice(0, 6)] ?? null;

/* قدرت رمز عبور: ۰ تا ۴ */
export function passwordStrength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p) || p.length >= 12) s++;
  return s;
}
