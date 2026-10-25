import type {
  Product,
  ProductMaterial,
  ProductOption,
} from '@/types/product';

/* -------------------------------------------------------------------------- */
/* گزینه‌های محصولات                                                          */
/* -------------------------------------------------------------------------- */

const RING_OPTIONS: ProductOption[] = [
  {
    key: 'ringSize',
    label: 'سایز انگشتر',
    values: ['۴', '۵', '۶', '۷', '۸', '۹'],
    guideLabel: 'راهنمای سایز',
  },
];

const BRACELET_OPTIONS: ProductOption[] = [
  {
    key: 'braceletLength',
    label: 'طول دستبند',
    values: ['۱۶ سانتی‌متر', '۱۸ سانتی‌متر', '۲۰ سانتی‌متر'],
  },
];

const NECKLACE_OPTIONS: ProductOption[] = [
  {
    key: 'chainLength',
    label: 'طول زنجیر',
    values: ['۴۰ سانتی‌متر', '۴۵ سانتی‌متر', '۵۰ سانتی‌متر'],
  },
];

/* -------------------------------------------------------------------------- */
/* کمکی تصاویر محصولات                                                        */
/* -------------------------------------------------------------------------- */

interface ProductImagesConfig {
  materials: ProductMaterial[];

  detailImages: string[];

  showcase: {
    title: string;
    image: string;
  }[];

  BrandStory?: {
    leftImage: string;
    rightImage: string;
  };
}

function createImages(
  config: ProductImagesConfig,
): ProductImagesConfig {
  return config;
}

/* -------------------------------------------------------------------------- */
/* محصولات                                                                    */
/* -------------------------------------------------------------------------- */

export const allProducts: Product[] = [
  /* ======================================================================== */
  /* 01 - انگشتر لومیر                                                        */
  /* ======================================================================== */

  {
    id: '1',
    number: '۰۱ / ۱۲',
    slug: 'lumiere-ring',

    name: 'انگشتر لومیر',
    subTitle: 'انگشتر تک نگین الماس',

    category: 'RINGS',

    price: '۳,۸۵۰,۰۰۰ تومان',
    rawPrice: 3850,

    rating: 4.9,
    reviewsCount: 124,

    description:
      'تجسمی جاودانه از زیبایی خالص. انگشتر لومیر نور را در ناب‌ترین شکل خود به تصویر می‌کشد — طراحی‌شده برای یک عمر.',

    isBestSeller: true,
    isDiscount: false,
    isNew: true,

    ...createImages({
      materials: [
        {
          id: 'white-gold',
          label: 'طلای سفید',
          gradient:
            'from-zinc-300 via-[#e4e4e7] to-zinc-500',
          images: [
            '/images/products/lumiere-ring/white-gold-1.jpg',
            '/images/products/lumiere-ring/white-gold-2.jpg',
            '/images/products/lumiere-ring/white-gold-3.png',
            '/images/products/lumiere-ring/white-gold-4.jpg',
          ],
        },

        {
          id: 'yellow-gold',
          label: 'طلای زرد',
          gradient:
            'from-[#ffd700] via-[#d4af37] to-[#996515]',
          images: [
            '/images/products/lumiere-ring/yellow-gold-1.jpg',
            '/images/products/lumiere-ring/yellow-gold-2.jpg',
            '/images/products/lumiere-ring/yellow-gold-3.jpg',
            '/images/products/lumiere-ring/yellow-gold-4.jpg',
          ],
        },

        {
          id: 'rose-gold',
          label: 'طلای رزگلد',
          gradient:
            'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
          images: [
            '/images/products/lumiere-ring/rose-gold-1.jpg',
            '/images/products/lumiere-ring/rose-gold-2.jpg',
            '/images/products/lumiere-ring/rose-gold-3.jpg',
            '/images/products/lumiere-ring/rose-gold-4.jpg',
          ],
        },
      ],

      detailImages: [
        '/images/products/lumiere-ring/detail-1.jpg',
        '/images/products/lumiere-ring/detail-2.jpg',
      ],

      showcase: [
        {
          title: 'نمای روبرو',
          image:
            '/images/products/lumiere-ring/front.jpg',
        },
        {
          title: 'نمای جانبی',
          image:
            '/images/products/lumiere-ring/side.jpg',
        },
        {
          title: 'در دست',
          image:
            '/images/products/lumiere-ring/on-hand.jpg',
        },
      ],

      // داستان برند
      BrandStory: {
        leftImage:
          '/images/products/lumiere-ring/brand-story-1.jpg',
        rightImage:
          '/images/products/lumiere-ring/brand-story-2.jpg',
      },
    }),

    details: {
      centerStone: 'الماس طبیعی',
      caratWeight: '۱.۰۰ قیراط (حدود)',
      cut: 'برلیان',
      color: 'D–F (بی‌رنگ)',
      clarity: 'VVS1 – VS1',
      metal: 'طلای سفید ۱۸ عیار / پلاتین',
    },

    options: RING_OPTIONS,
  },

  /* ======================================================================== */
  /* 02 - دستبند سلستا                                                        */
  /* ======================================================================== */

  {
    id: '2',
    number: '۰۲ / ۱۲',
    slug: 'celesta-bracelet',

    name: 'دستبند سلستا',
    subTitle: 'دستبند تنیس الماس',

    category: 'BRACELETS',

    price: '۷,۴۲۰,۰۰۰ تومان',
    rawPrice: 7420,

    rating: 4.8,
    reviewsCount: 96,

    description:
      'طراحی‌شده برای حرکت روان و راحتی مطلق، دستبند سلستا با زیبایی بر روی مچ دست می‌نشیند.',

    isBestSeller: true,
    isDiscount: true,
    isNew: false,

    ...createImages({
      materials: [
        {
          id: 'white-gold',
          label: 'طلای سفید',
          gradient:
            'from-zinc-300 via-[#e4e4e7] to-zinc-500',
          images: [
            '/images/products/celesta-bracelet/white-gold-1.jpg',
            '/images/products/celesta-bracelet/white-gold-2.jpg',
            '/images/products/celesta-bracelet/white-gold-3.jpg',
            '/images/products/celesta-bracelet/white-gold-4.jpg',
          ],
        },

        {
          id: 'yellow-gold',
          label: 'طلای زرد',
          gradient:
            'from-[#ffd700] via-[#d4af37] to-[#996515]',
          images: [
            '/images/products/celesta-bracelet/yellow-gold-1.jpg',
            '/images/products/celesta-bracelet/yellow-gold-2.jpg',
            '/images/products/celesta-bracelet/yellow-gold-3.jpg',
            '/images/products/celesta-bracelet/yellow-gold-4.jpg',
          ],
        },

        {
          id: 'rose-gold',
          label: 'طلای رزگلد',
          gradient:
            'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
          images: [
            '/images/products/celesta-bracelet/rose-gold-1.jpg',
            '/images/products/celesta-bracelet/rose-gold-2.jpg',
            '/images/products/celesta-bracelet/rose-gold-3.jpg',
            '/images/products/celesta-bracelet/rose-gold-4.jpg',
          ],
        },
      ],

      detailImages: [
        '/images/products/celesta-bracelet/detail-1.jpg',
        '/images/products/celesta-bracelet/detail-2.jpg',
      ],

      showcase: [
        {
          title: 'نمای روبرو',
          image:
            '/images/products/celesta-bracelet/front.jpg',
        },
        {
          title: 'نمای جانبی',
          image:
            '/images/products/celesta-bracelet/side.jpg',
        },
        {
          title: 'روی مچ',
          image:
            '/images/products/celesta-bracelet/on-wrist.jpg',
        },
      ],
    }),

    details: {
      centerStone: 'الماس طبیعی',
      caratWeight: '۳.۲۰ قیراط (حدود)',
      metal: 'طلای سفید ۱۸ عیار',
      braceletStyle: 'تنیس',
      clasp: 'قفل جعبه‌ای با ضامن ایمنی',
    },

    options: BRACELET_OPTIONS,
  },

  /* ======================================================================== */
  /* 03 - گردنبند سولستیس                                                     */
  /* ======================================================================== */

  {
    id: '3',
    number: '۰۳ / ۱۲',
    slug: 'solstice-necklace',

    name: 'گردنبند سولستیس',
    subTitle: 'گردنبند آویز الماس',

    category: 'NECKLACES',

    price: '۸,۷۶۰,۰۰۰ تومان',
    rawPrice: 8760,

    rating: 4.9,
    reviewsCount: 88,

    description:
      'طراحی‌شده برای قرارگیری روان در امتداد ترقوه، با دقت ظریف و تناسبی متوازن.',

    isBestSeller: false,
    isDiscount: false,
    isNew: true,

    ...createImages({
      materials: [
        {
          id: 'white-gold',
          label: 'طلای سفید',
          gradient:
            'from-zinc-300 via-[#e4e4e7] to-zinc-500',
          images: [
            '/images/products/solstice-necklace/white-gold-1.jpg',
            '/images/products/solstice-necklace/white-gold-2.jpg',
            '/images/products/solstice-necklace/white-gold-3.jpg',
            '/images/products/solstice-necklace/white-gold-4.jpg',
          ],
        },

        {
          id: 'yellow-gold',
          label: 'طلای زرد',
          gradient:
            'from-[#ffd700] via-[#d4af37] to-[#996515]',
          images: [
            '/images/products/solstice-necklace/yellow-gold-1.jpg',
            '/images/products/solstice-necklace/yellow-gold-2.jpg',
            '/images/products/solstice-necklace/yellow-gold-3.jpg',
            '/images/products/solstice-necklace/yellow-gold-4.jpg',
          ],
        },

        {
          id: 'rose-gold',
          label: 'طلای رزگلد',
          gradient:
            'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
          images: [
            '/images/products/solstice-necklace/rose-gold-1.jpg',
            '/images/products/solstice-necklace/rose-gold-2.jpg',
            '/images/products/solstice-necklace/rose-gold-3.jpg',
            '/images/products/solstice-necklace/rose-gold-4.jpg',
          ],
        },
      ],

      detailImages: [
        '/images/products/solstice-necklace/detail-1.jpg',
        '/images/products/solstice-necklace/detail-2.jpg',
      ],

      showcase: [
        {
          title: 'نمای روبرو',
          image:
            '/images/products/solstice-necklace/front.jpg',
        },
        {
          title: 'نمای جانبی',
          image:
            '/images/products/solstice-necklace/side.jpg',
        },
        {
          title: 'روی بدن',
          image:
            '/images/products/solstice-necklace/on-body.jpg',
        },
      ],
    }),

    details: {
      centerStone: 'الماس طبیعی',
      caratWeight: '۲.۴۰ قیراط (حدود)',
      metal: 'طلای زرد ۱۸ عیار',
      chainLength: '۴۵ سانتی‌متر',
      clasp: 'قفل طوطکی',
    },

    options: NECKLACE_OPTIONS,
  },

  /* ======================================================================== */
  /* 04 - گوشواره وریته                                                        */
  /* ======================================================================== */

  {
    id: '4',
    number: '۰۴ / ۱۲',
    slug: 'verite-earrings',

    name: 'گوشواره وریته',
    subTitle: 'گوشواره میخی الماس',

    category: 'EARRINGS',

    price: '۶,۱۲۰,۰۰۰ تومان',
    rawPrice: 6120,

    rating: 4.8,
    reviewsCount: 71,

    description:
      'تراش‌خورده برای جذب نور از هر زاویه، مجهز به پشت‌پوشی ارگونومیک برای سبکی و استفاده روزمره.',

    isBestSeller: false,
    isDiscount: true,
    isNew: true,

    ...createImages({
      materials: [
        {
          id: 'white-gold',
          label: 'طلای سفید',
          gradient:
            'from-zinc-300 via-[#e4e4e7] to-zinc-500',
          images: [
            '/images/products/verite-earrings/white-gold-1.jpg',
            '/images/products/verite-earrings/white-gold-2.jpg',
            '/images/products/verite-earrings/white-gold-3.jpg',
            '/images/products/verite-earrings/white-gold-4.jpg',
          ],
        },

        {
          id: 'yellow-gold',
          label: 'طلای زرد',
          gradient:
            'from-[#ffd700] via-[#d4af37] to-[#996515]',
          images: [
            '/images/products/verite-earrings/yellow-gold-1.jpg',
            '/images/products/verite-earrings/yellow-gold-2.jpg',
            '/images/products/verite-earrings/yellow-gold-3.jpg',
            '/images/products/verite-earrings/yellow-gold-4.jpg',
          ],
        },

        {
          id: 'rose-gold',
          label: 'طلای رزگلد',
          gradient:
            'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
          images: [
            '/images/products/verite-earrings/rose-gold-1.jpg',
            '/images/products/verite-earrings/rose-gold-2.jpg',
            '/images/products/verite-earrings/rose-gold-3.jpg',
            '/images/products/verite-earrings/rose-gold-4.jpg',
          ],
        },
      ],

      detailImages: [
        '/images/products/verite-earrings/detail-1.jpg',
        '/images/products/verite-earrings/detail-2.jpg',
      ],

      showcase: [
        {
          title: 'نمای روبرو',
          image:
            '/images/products/verite-earrings/front.jpg',
        },
        {
          title: 'نمای جانبی',
          image:
            '/images/products/verite-earrings/side.jpg',
        },
        {
          title: 'روی گوش',
          image:
            '/images/products/verite-earrings/on-ear.jpg',
        },
      ],
    }),

    details: {
      centerStone: 'الماس طبیعی',
      caratWeight: '۱.۵۰ قیراط مجموع',
      metal: 'طلای سفید ۱۸ عیار',
      closure: 'قفل فشاری',
      style: 'میخی کلاسیک',
    },

    options: [],
  },

  /* ======================================================================== */
  /* 05 - انگشتر ایمپریال                                                     */
  /* ======================================================================== */

  {
    id: '5',
    number: '۰۵ / ۱۲',
    slug: 'imperial-ring',

    name: 'انگشتر ایمپریال',
    subTitle: 'انگشتر استیتمنت الماس',

    category: 'RINGS',

    price: '۹,۳۸۰,۰۰۰ تومان',
    rawPrice: 9380,

    rating: 4.9,
    reviewsCount: 63,

    description:
      'یک انگشتر مجسمه‌وار که پیرامون یک سنگ مرکزی درخشان و فرم معماری پالایش‌شده شکل گرفته است.',

    isBestSeller: true,
    isDiscount: false,
    isNew: false,

    ...createImages({
      materials: [
        {
          id: 'white-gold',
          label: 'طلای سفید',
          gradient:
            'from-zinc-300 via-[#e4e4e7] to-zinc-500',
          images: [
            '/images/products/imperial-ring/white-gold-1.jpg',
            '/images/products/imperial-ring/white-gold-2.jpg',
            '/images/products/imperial-ring/white-gold-3.jpg',
            '/images/products/imperial-ring/white-gold-4.jpg',
          ],
        },

        {
          id: 'yellow-gold',
          label: 'طلای زرد',
          gradient:
            'from-[#ffd700] via-[#d4af37] to-[#996515]',
          images: [
            '/images/products/imperial-ring/yellow-gold-1.jpg',
            '/images/products/imperial-ring/yellow-gold-2.jpg',
            '/images/products/imperial-ring/yellow-gold-3.jpg',
            '/images/products/imperial-ring/yellow-gold-4.jpg',
          ],
        },

        {
          id: 'rose-gold',
          label: 'طلای رزگلد',
          gradient:
            'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
          images: [
            '/images/products/imperial-ring/rose-gold-1.jpg',
            '/images/products/imperial-ring/rose-gold-2.jpg',
            '/images/products/imperial-ring/rose-gold-3.jpg',
            '/images/products/imperial-ring/rose-gold-4.jpg',
          ],
        },
      ],

      detailImages: [
        '/images/products/imperial-ring/detail-1.jpg',
        '/images/products/imperial-ring/detail-2.jpg',
      ],

      showcase: [
        {
          title: 'نمای روبرو',
          image:
            '/images/products/imperial-ring/front.jpg',
        },
        {
          title: 'نمای جانبی',
          image:
            '/images/products/imperial-ring/side.jpg',
        },
        {
          title: 'در دست',
          image:
            '/images/products/imperial-ring/on-hand.jpg',
        },
      ],
    }),

    details: {
      centerStone: 'الماس طبیعی',
      caratWeight: '۱.۸۰ قیراط (حدود)',
      cut: 'برلیان',
      color: 'D–F (بی‌رنگ)',
      clarity: 'VVS1 – VS1',
      metal: 'طلای سفید ۱۸ عیار',
    },

    options: RING_OPTIONS,
  },

  /* ======================================================================== */
  /* 06 - دستبند هارمونی                                                      */
  /* ======================================================================== */

  {
    id: '6',
    number: '۰۶ / ۱۲',
    slug: 'harmony-bracelet-06',

    name: 'دستبند هارمونی',
    subTitle: 'دستبند الماس',

    category: 'BRACELETS',

    price: '۵,۹۵۰,۰۰۰ تومان',
    rawPrice: 5950,

    rating: 4.7,
    reviewsCount: 54,

    description:
      'سیلوئتی متوازن که برای حرکت طبیعی همراه با مچ دست طراحی شده است.',

    isBestSeller: false,
    isDiscount: true,
    isNew: false,

    ...createImages({
      materials: [
        {
          id: 'white-gold',
          label: 'طلای سفید',
          gradient:
            'from-zinc-300 via-[#e4e4e7] to-zinc-500',
          images: [
            '/images/products/harmony-bracelet-06/white-gold-1.jpg',
            '/images/products/harmony-bracelet-06/white-gold-2.jpg',
            '/images/products/harmony-bracelet-06/white-gold-3.jpg',
            '/images/products/harmony-bracelet-06/white-gold-4.jpg',
          ],
        },

        {
          id: 'yellow-gold',
          label: 'طلای زرد',
          gradient:
            'from-[#ffd700] via-[#d4af37] to-[#996515]',
          images: [
            '/images/products/harmony-bracelet-06/yellow-gold-1.jpg',
            '/images/products/harmony-bracelet-06/yellow-gold-2.jpg',
            '/images/products/harmony-bracelet-06/yellow-gold-3.jpg',
            '/images/products/harmony-bracelet-06/yellow-gold-4.jpg',
          ],
        },

        {
          id: 'rose-gold',
          label: 'طلای رزگلد',
          gradient:
            'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
          images: [
            '/images/products/harmony-bracelet-06/rose-gold-1.jpg',
            '/images/products/harmony-bracelet-06/rose-gold-2.jpg',
            '/images/products/harmony-bracelet-06/rose-gold-3.jpg',
            '/images/products/harmony-bracelet-06/rose-gold-4.jpg',
          ],
        },
      ],

      detailImages: [
        '/images/products/harmony-bracelet-06/detail-1.jpg',
        '/images/products/harmony-bracelet-06/detail-2.jpg',
      ],

      showcase: [
        {
          title: 'نمای روبرو',
          image:
            '/images/products/harmony-bracelet-06/front.jpg',
        },
        {
          title: 'نمای جانبی',
          image:
            '/images/products/harmony-bracelet-06/side.jpg',
        },
        {
          title: 'روی مچ',
          image:
            '/images/products/harmony-bracelet-06/on-wrist.jpg',
        },
      ],
    }),

    details: {
      centerStone: 'الماس طبیعی',
      caratWeight: '۲.۱۰ قیراط (حدود)',
      metal: 'طلای سفید ۱۸ عیار',
      braceletStyle: 'لاین بریستلت',
      clasp: 'قفل طوطکی',
    },

    options: BRACELET_OPTIONS,
  },

  /* ======================================================================== */
  /* 08 - گوشواره الماس هارمونی                                                */
  /* ======================================================================== */

  {
    id: '8',
    number: '۰۸ / ۱۲',
    slug: 'harmony-bracelet-08',

    name: 'گوشواره الماس پرتو',
    subTitle: 'گوشواره الماس',

    category: 'EARRINGS',

    price: '۵,۹۵۰,۰۰۰ تومان',
    rawPrice: 5950,

    rating: 4.7,
    reviewsCount: 43,

    description:
      'سیلوئتی متوازن که برای حرکت طبیعی طراحی شده است.',

    isBestSeller: false,
    isDiscount: true,
    isNew: false,

    ...createImages({
      materials: [
        {
          id: 'white-gold',
          label: 'طلای سفید',
          gradient:
            'from-zinc-300 via-[#e4e4e7] to-zinc-500',
          images: [
            '/images/products/harmony-earing-08/white-gold-1.jpg',
            '/images/products/harmony-earing-08/white-gold-2.jpg',
            '/images/products/harmony-earing-08/white-gold-3.jpg',
            '/images/products/harmony-earing-08/white-gold-4.jpg',
          ],
        },

        {
          id: 'yellow-gold',
          label: 'طلای زرد',
          gradient:
            'from-[#ffd700] via-[#d4af37] to-[#996515]',
          images: [
            '/images/products/harmony-bracelet-08/yellow-gold-1.jpg',
            '/images/products/harmony-bracelet-08/yellow-gold-2.jpg',
            '/images/products/harmony-bracelet-08/yellow-gold-3.jpg',
            '/images/products/harmony-bracelet-08/yellow-gold-4.jpg',
          ],
        },

        {
          id: 'rose-gold',
          label: 'طلای رزگلد',
          gradient:
            'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
          images: [
            '/images/products/harmony-bracelet-08/rose-gold-1.jpg',
            '/images/products/harmony-bracelet-08/rose-gold-2.jpg',
            '/images/products/harmony-bracelet-08/rose-gold-3.jpg',
            '/images/products/harmony-bracelet-08/rose-gold-4.jpg',
          ],
        },
      ],

      detailImages: [
        '/images/products/harmony-bracelet-08/detail-1.jpg',
        '/images/products/harmony-bracelet-08/detail-2.jpg',
      ],

      showcase: [
        {
          title: 'نمای روبرو',
          image:
            '/images/products/harmony-bracelet-08/front.jpg',
        },
        {
          title: 'نمای جانبی',
          image:
            '/images/products/harmony-bracelet-08/side.jpg',
        },
        {
          title: 'روی مچ',
          image:
            '/images/products/harmony-bracelet-08/on-wrist.jpg',
        },
      ],
    }),

    details: {
      centerStone: 'الماس طبیعی',
      caratWeight: '۲.۱۰ قیراط (حدود)',
      metal: 'طلای سفید ۱۸ عیار',
      braceletStyle: 'لاین بریستلت',
      clasp: 'قفل طوطکی',
    },

    options: BRACELET_OPTIONS,
  },

  /* ======================================================================== */
  /* 09 - گوشواره کوالته                                                      */
  /* ======================================================================== */

  {
    id: '9',
    number: '۰۹ / ۱۲',
    slug: 'harmony-bracelet-09',

    name: 'گوشواره کوالته',
    subTitle: 'دستبند الماس',

    category: 'EARRINGS',

    price: '۵,۹۵۰,۰۰۰ تومان',
    rawPrice: 5950,

    rating: 4.7,
    reviewsCount: 38,

    description:
      'سیلوئتی متوازن که برای حرکت طبیعی طراحی شده است.',

    isBestSeller: false,
    isDiscount: true,
    isNew: false,

    ...createImages({
      materials: [
        {
          id: 'white-gold',
          label: 'طلای سفید',
          gradient:
            'from-zinc-300 via-[#e4e4e7] to-zinc-500',
          images: [
            '/images/products/cUalte-EARRINGS/white-gold-1.jpg',
            '/images/products/cUalte-EARRINGS/white-gold-2.jpg',
            '/images/products/cUalte-EARRINGS/white-gold-3.jpg',
            '/images/products/cUalte-EARRINGS/white-gold-4.jpg',
          ],
        },

        {
          id: 'yellow-gold',
          label: 'طلای زرد',
          gradient:
            'from-[#ffd700] via-[#d4af37] to-[#996515]',
          images: [
            '/images/products/harmony-bracelet-09/yellow-gold-1.jpg',
            '/images/products/harmony-bracelet-09/yellow-gold-2.jpg',
            '/images/products/harmony-bracelet-09/yellow-gold-3.jpg',
            '/images/products/harmony-bracelet-09/yellow-gold-4.jpg',
          ],
        },

        {
          id: 'rose-gold',
          label: 'طلای رزگلد',
          gradient:
            'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
          images: [
            '/images/products/harmony-bracelet-09/rose-gold-1.jpg',
            '/images/products/harmony-bracelet-09/rose-gold-2.jpg',
            '/images/products/harmony-bracelet-09/rose-gold-3.jpg',
            '/images/products/harmony-bracelet-09/rose-gold-4.jpg',
          ],
        },
      ],

      detailImages: [
        '/images/products/harmony-bracelet-09/detail-1.jpg',
        '/images/products/harmony-bracelet-09/detail-2.jpg',
      ],

      showcase: [
        {
          title: 'نمای روبرو',
          image:
            '/images/products/harmony-bracelet-09/front.jpg',
        },
        {
          title: 'نمای جانبی',
          image:
            '/images/products/harmony-bracelet-09/side.jpg',
        },
        {
          title: 'روی مچ',
          image:
            '/images/products/harmony-bracelet-09/on-wrist.jpg',
        },
      ],
    }),

    details: {
      centerStone: 'الماس طبیعی',
      caratWeight: '۲.۱۰ قیراط (حدود)',
      metal: 'طلای سفید ۱۸ عیار',
      braceletStyle: 'لاین بریستلت',
      clasp: 'قفل طوطکی',
    },

    options: BRACELET_OPTIONS,
  },

  /* ======================================================================== */
  /* 10 - گردنبندهای الماس                                                    */
  /* ======================================================================== */

  {
    id: '10',
    number: '۱۰ / ۱۲',
    slug: 'harmony-bracelet-10',

    name: 'گردنبندهای الماس',
    subTitle: 'دستبند الماس',

    category: 'NECKLACES',

    price: '۵,۹۵۰,۰۰۰ تومان',
    rawPrice: 5950,

    rating: 4.7,
    reviewsCount: 36,

    description:
      'سیلوئتی متوازن که برای حرکت طبیعی طراحی شده است.',

    isBestSeller: false,
    isDiscount: true,
    isNew: false,

    ...createImages({
      materials: [
        {
          id: 'white-gold',
          label: 'طلای سفید',
          gradient:
            'from-zinc-300 via-[#e4e4e7] to-zinc-500',
          images: [
            '/images/products/NECKLACES-DIAMOND/white-gold-1.jpg',
            '/images/products/NECKLACES-DIAMOND/white-gold-2.jpg',
            '/images/products/NECKLACES-DIAMOND/white-gold-3.jpg',
            '/images/products/NECKLACES-DIAMOND/white-gold-4.jpg',
          ],
        },

        {
          id: 'yellow-gold',
          label: 'طلای زرد',
          gradient:
            'from-[#ffd700] via-[#d4af37] to-[#996515]',
          images: [
            '/images/products/harmony-bracelet-10/yellow-gold-1.jpg',
            '/images/products/harmony-bracelet-10/yellow-gold-2.jpg',
            '/images/products/harmony-bracelet-10/yellow-gold-3.jpg',
            '/images/products/harmony-bracelet-10/yellow-gold-4.jpg',
          ],
        },

        {
          id: 'rose-gold',
          label: 'طلای رزگلد',
          gradient:
            'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
          images: [
            '/images/products/harmony-bracelet-10/rose-gold-1.jpg',
            '/images/products/harmony-bracelet-10/rose-gold-2.jpg',
            '/images/products/harmony-bracelet-10/rose-gold-3.jpg',
            '/images/products/harmony-bracelet-10/rose-gold-4.jpg',
          ],
        },
      ],

      detailImages: [
        '/images/products/harmony-bracelet-10/detail-1.jpg',
        '/images/products/harmony-bracelet-10/detail-2.jpg',
      ],

      showcase: [
        {
          title: 'نمای روبرو',
          image:
            '/images/products/harmony-bracelet-10/front.jpg',
        },
        {
          title: 'نمای جانبی',
          image:
            '/images/products/harmony-bracelet-10/side.jpg',
        },
        {
          title: 'روی مچ',
          image:
            '/images/products/harmony-bracelet-10/on-wrist.jpg',
        },
      ],
    }),

    details: {
      centerStone: 'الماس طبیعی',
      caratWeight: '۲.۱۰ قیراط (حدود)',
      metal: 'طلای سفید ۱۸ عیار',
      braceletStyle: 'لاین بریستلت',
      clasp: 'قفل طوطکی',
    },

    options: BRACELET_OPTIONS,
  },

  /* ======================================================================== */
  /* 11 - گردنبندهای هارمونی                                                   */
  /* ======================================================================== */

  {
    id: '11',
    number: '۱۱ / ۱۲',
    slug: 'harmony-bracelet-11',

    name: 'گردنبندهای هارمونی',
    subTitle: 'گردنبندهای الماس',

    category: 'NECKLACES',

    price: '۵,۹۵۰,۰۰۰ تومان',
    rawPrice: 5950,

    rating: 4.7,
    reviewsCount: 31,

    description:
      'سیلوئتی متوازن که برای حرکت طبیعی طراحی شده است.',

    isBestSeller: false,
    isDiscount: true,
    isNew: false,

    ...createImages({
      materials: [
        {
          id: 'white-gold',
          label: 'طلای سفید',
          gradient:
            'from-zinc-300 via-[#e4e4e7] to-zinc-500',
          images: [
            '/images/products/harmony-NECKLACES-11/white-gold-1.jpg',
            '/images/products/harmony-NECKLACES-11/white-gold-2.jpg',
            '/images/products/harmony-NECKLACES-11/white-gold-3.jpg',
            '/images/products/harmony-NECKLACES-11/white-gold-4.jpg',
          ],
        },

        {
          id: 'yellow-gold',
          label: 'طلای زرد',
          gradient:
            'from-[#ffd700] via-[#d4af37] to-[#996515]',
          images: [
            '/images/products/harmony-bracelet-11/yellow-gold-1.jpg',
            '/images/products/harmony-bracelet-11/yellow-gold-2.jpg',
            '/images/products/harmony-bracelet-11/yellow-gold-3.jpg',
            '/images/products/harmony-bracelet-11/yellow-gold-4.jpg',
          ],
        },

        {
          id: 'rose-gold',
          label: 'طلای رزگلد',
          gradient:
            'from-[#e8a598] via-[#f7d6cd] to-[#b76e79]',
          images: [
            '/images/products/harmony-bracelet-11/rose-gold-1.jpg',
            '/images/products/harmony-bracelet-11/rose-gold-2.jpg',
            '/images/products/harmony-bracelet-11/rose-gold-3.jpg',
            '/images/products/harmony-bracelet-11/rose-gold-4.jpg',
          ],
        },
      ],

      detailImages: [
        '/images/products/harmony-bracelet-11/detail-1.jpg',
        '/images/products/harmony-bracelet-11/detail-2.jpg',
      ],

      showcase: [
        {
          title: 'نمای روبرو',
          image:
            '/images/products/harmony-bracelet-11/front.jpg',
        },
        {
          title: 'نمای جانبی',
          image:
            '/images/products/harmony-bracelet-11/side.jpg',
        },
        {
          title: 'روی مچ',
          image:
            '/images/products/harmony-bracelet-11/on-wrist.jpg',
        },
      ],
    }),

    details: {
      centerStone: 'الماس طبیعی',
      caratWeight: '۲.۱۰ قیراط (حدود)',
      metal: 'طلای سفید ۱۸ عیار',
      braceletStyle: 'لاین بریستلت',
      clasp: 'قفل طوطکی',
    },

    options: BRACELET_OPTIONS,
  },
];

/* -------------------------------------------------------------------------- */
/* تابع کمکی برای یافتن محصول بر اساس اسلاگ                                   */
/* -------------------------------------------------------------------------- */

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug);
}