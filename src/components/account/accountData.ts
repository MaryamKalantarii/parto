/**
 * عکس‌ها از همان پوشه‌ی public/images/products خودتان خوانده می‌شوند.
 */

export type OrderStatus = "PROCESSING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";

export interface OrderLine {
  title: string;
  variant: string;
  qty: number;
  price: number; // تومان
  image: string;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  total: number;
  lines: OrderLine[];
  address: string;
  payment: string;
  trackingCode?: string;
  hasCertificate?: boolean;
}
export type OrderItem = Order; // سازگاری با نام قبلی

export const statusMeta: Record<OrderStatus, { label: string; tone: "success" | "warn" | "neutral" | "danger"; step: number }> = {
  PROCESSING: { label: "در حال آماده‌سازی", tone: "neutral", step: 1 },
  IN_TRANSIT: { label: "ارسال‌شده", tone: "warn", step: 2 },
  DELIVERED: { label: "تحویل‌شده", tone: "success", step: 3 },
  CANCELLED: { label: "لغو شده", tone: "danger", step: -1 },
};

export const orderSteps = ["ثبت سفارش", "آماده‌سازی و کنترل کیفیت", "تحویل به پست", "تحویل به شما"];

const P = "/images/products";

export const initialOrders: Order[] = [
  {
    id: "1",
    number: "PR-10031",
    date: "۲۰ آبان ۱۴۰۵",
    status: "IN_TRANSIT",
    total: 9970000,
    lines: [
      { title: "انگشتر لومیر", variant: "طلای سفید · سایز ۵۴", qty: 1, price: 3850000, image: `${P}/lumiere-ring/white-gold-1.png` },
      { title: "گوشواره وریته", variant: "طلای سفید", qty: 1, price: 6120000, image: `${P}/verite-earrings/white-gold-1.png` },
    ],
    address: "تهران، خیابان آزادی، پلاک ۱۲۳",
    payment: "درگاه بانکی · کارت ملی •••• ۷۸۹۰",
    trackingCode: "245871036900123456789",
    hasCertificate: true,
  },
  {
    id: "2",
    number: "PR-10027",
    date: "۸ آبان ۱۴۰۵",
    status: "DELIVERED",
    total: 8760000,
    lines: [
      { title: "گردنبند سولستیس", variant: "طلای سفید · ۴۵ سانتی‌متر", qty: 1, price: 8760000, image: `${P}/solstice-necklace/white-gold-1.png` },
    ],
    address: "تهران، خیابان آزادی، پلاک ۱۲۳",
    payment: "کیف پول + درگاه بانکی",
    trackingCode: "245871036900098765432",
    hasCertificate: true,
  },
  {
    id: "3",
    number: "PR-10019",
    date: "۲۵ مهر ۱۴۰۵",
    status: "DELIVERED",
    total: 7420000,
    lines: [
      { title: "دستبند سلستا", variant: "طلای سفید · ۱۷ سانتی‌متر", qty: 1, price: 7420000, image: `${P}/celesta-bracelet/white-gold-1.png` },
    ],
    address: "تهران، خیابان آزادی، پلاک ۱۲۳",
    payment: "درگاه بانکی · کارت ملت •••• ۱۰۹۲",
    trackingCode: "245871036900055512345",
    hasCertificate: true,
  },
  {
    id: "4",
    number: "PR-10012",
    date: "۱۰ مهر ۱۴۰۵",
    status: "CANCELLED",
    total: 5950000,
    lines: [
      { title: "دستبند هارمونی", variant: "طلای زرد · ۱۶ سانتی‌متر", qty: 1, price: 5950000, image: `${P}/harmony-bracelet-06/white-gold-1.png` },
    ],
    address: "تهران، خیابان آزادی، پلاک ۱۲۳",
    payment: "درگاه بانکی · مبلغ به کیف پول بازگشت داده شد",
  },
];

export interface WishItem {
  id: string;
  title: string;
  category: string;
  price: number;
  inStock: boolean;
  image: string;
}

export const initialWishlist: WishItem[] = [
  { id: "w1", title: "انگشتر لومیر", category: "انگشتر", price: 3850000, inStock: true, image: `${P}/lumiere-ring/white-gold-1.png` },
  { id: "w2", title: "گوشواره وریته", category: "گوشواره", price: 6120000, inStock: true, image: `${P}/verite-earrings/white-gold-1.png` },
  { id: "w3", title: "گردنبند سولستیس", category: "گردنبند", price: 8760000, inStock: false, image: `${P}/solstice-necklace/white-gold-1.png` },
  { id: "w4", title: "دستبند سلستا", category: "دستبند", price: 7420000, inStock: true, image: `${P}/celesta-bracelet/white-gold-1.png` },
];

export const initialUser = {
  firstName: "سیده",
  lastName: "نژاد",
  email: "s.najafii@gmail.com",
  phone: "09123456789",
  address: "تهران، خیابان آزادی، پلاک ۱۲۳",
  nationalCode: "0012345679",
  avatarUrl: undefined as string | undefined,
};

export interface WalletTx {
  id: string;
  title: string;
  date: string;
  amount: number; // مثبت = واریز، منفی = برداشت
}

export const initialWallet = {
  balance: 1750000,
  txs: [
    { id: "t1", title: "بازگشت وجه سفارش PR-10012", date: "۱۲ مهر ۱۴۰۵", amount: 5950000 },
    { id: "t2", title: "خرید سفارش PR-10027", date: "۸ آبان ۱۴۰۵", amount: -4200000 },
    { id: "t3", title: "هدیه‌ی عضویت باشگاه مشتریان", date: "۱۰ آبان ۱۴۰۵", amount: 500000 },
    { id: "t4", title: "خرید سفارش PR-10031", date: "۲۰ آبان ۱۴۰۵", amount: -500000 },
  ] as WalletTx[],
};
