/**
 * داده‌ی نمونه‌ی حساب کاربری  →  components/account/accountData.ts
 * در پروژه‌ی واقعی، این‌ها را از API بگیرید و به‌صورت props به کامپوننت‌ها بدهید.
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

export const mockOrders: Order[] = [
  {
    id: "1",
    number: "PR-10031",
    date: "۲۰ آبان ۱۴۰۵",
    status: "IN_TRANSIT",
    total: 9_970_000,
    lines: [
      { title: "انگشتر لومیر", variant: "طلای رزگلد ۱۸ عیار · سایز ۱۶", qty: 1, price: 3_850_000, image: `${P}/lumiere-ring/brand-story-2.jpg` },
      { title: "گوشواره وریته", variant: "طلای رزگلد ۱۸ عیار", qty: 1, price: 6_120_000, image: `${P}/verite-earrings/white-gold-1.jpg` },
    ],
    address: "تهران، خیابان ولیعصر، بالاتر از فرشته، پلاک ۱۲، واحد ۴",
    payment: "پرداخت آنلاین (درگاه بانکی)",
    trackingCode: "24000123456789012345",
  },
  {
    id: "2",
    number: "PR-10027",
    date: "۸ آبان ۱۴۰۵",
    status: "DELIVERED",
    total: 8_760_000,
    lines: [{ title: "گردنبند سولستیس", variant: "طلای رزگلد ۱۸ عیار · ۴۵ سانتی‌متر", qty: 1, price: 8_760_000, image: `${P}/NECKLACES-DIAMOND/white-gold-1.jpg` }],
    address: "تهران، خیابان ولیعصر، بالاتر از فرشته، پلاک ۱۲، واحد ۴",
    payment: "کیف پول + درگاه بانکی",
    trackingCode: "24000987654321098765",
    hasCertificate: true,
  },
  {
    id: "3",
    number: "PR-10019",
    date: "۲۵ مهر ۱۴۰۵",
    status: "DELIVERED",
    total: 7_420_000,
    lines: [{ title: "دستبند سلستا", variant: "طلای سفید ۱۸ عیار", qty: 1, price: 7_420_000, image: `${P}/celesta-bracelet/white-gold-1.jpg` }],
    address: "اصفهان، بلوار دریا، پلاک ۱۵، سوئیت ۴۰۲",
    payment: "پرداخت آنلاین (درگاه بانکی)",
    hasCertificate: true,
  },
  {
    id: "4",
    number: "PR-10012",
    date: "۱۲ شهریور ۱۴۰۵",
    status: "CANCELLED",
    total: 3_850_000,
    lines: [{ title: "انگشتر لومیر", variant: "طلای زرد ۱۸ عیار · سایز ۱۵", qty: 1, price: 3_850_000, image: `${P}/lumiere-ring/brand-story-2.jpg` }],
    address: "تهران، خیابان ولیعصر، بالاتر از فرشته، پلاک ۱۲، واحد ۴",
    payment: "پرداخت آنلاین (درگاه بانکی)",
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

export const mockWishlist: WishItem[] = [
  { id: "w1", title: "انگشتر لومیر", category: "انگشتر", price: 3_850_000, inStock: true, image: `${P}/lumiere-ring/brand-story-2.jpg` },
  { id: "w2", title: "گوشواره وریته", category: "گوشواره", price: 6_120_000, inStock: true, image: `${P}/verite-earrings/white-gold-1.jpg` },
  { id: "w3", title: "گردنبند سولستیس", category: "گردنبند", price: 8_760_000, inStock: false, image: `${P}/NECKLACES-DIAMOND/white-gold-1.jpg` },
  { id: "w4", title: "دستبند سلستا", category: "دستبند", price: 7_420_000, inStock: true, image: `${P}/celesta-bracelet/white-gold-1.jpg` },
];

export const mockUser = {
  firstName: "مینا",
  lastName: "رضایی",
  email: "mina@example.com",
  phone: "09121234567",
  address: "تهران، خیابان ولیعصر، بالاتر از فرشته، پلاک ۱۲، واحد ۴",
  nationalCode: "",
  avatarUrl: undefined as string | undefined,
};

export interface WalletTx {
  id: string;
  title: string;
  date: string;
  amount: number; // مثبت = واریز، منفی = برداشت
}

export const mockWallet = {
  balance: 1_750_000,
  txs: [
    { id: "t1", title: "بازگشت وجه سفارش PR-10012", date: "۱۴ شهریور ۱۴۰۵", amount: 3_850_000 },
    { id: "t2", title: "پرداخت سفارش PR-10027", date: "۸ آبان ۱۴۰۵", amount: -2_600_000 },
    { id: "t3", title: "هدیه‌ی عضویت در باشگاه مشتریان", date: "۲۰ مهر ۱۴۰۵", amount: 500_000 },
  ] as WalletTx[],
};
