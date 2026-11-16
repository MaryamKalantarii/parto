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

export const initialOrders: Order[] = [];

export interface WishItem {
  id: string;
  title: string;
  category: string;
  price: number;
  inStock: boolean;
  image: string;
}

export const initialWishlist: WishItem[] = [];

export const initialUser = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  nationalCode: "",
  avatarUrl: undefined as string | undefined,
};

export interface WalletTx {
  id: string;
  title: string;
  date: string;
  amount: number; // مثبت = واریز، منفی = برداشت
}

export const initialWallet = {
  balance: 0,
  txs: [] as WalletTx[],
};
