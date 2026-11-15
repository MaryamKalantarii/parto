import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/ui/PageHero';
import { Bg } from '@/components/ui/Bg';
import { Ornament } from '@/components/ui/Ornament';
import { DarkBtn } from '@/components/ui/FormControls';
import { Ico } from '@/components/icons/Ico';
import { IMG } from '@/lib/themeImages';
import { Reveal, AnimatedNumber, IntroShowcase, Sparkles, MarqueeStrip, ProcessSteps, GlowCards } from './AboutMotion';

const stats = [
  { icon: 'gem', node: <AnimatedNumber to={10} prefix="+" />, unit: 'سال', sub: 'تجربه درخشان' },
  { icon: 'ring', node: <AnimatedNumber to={50000} prefix="+" grouping />, unit: '', sub: 'مشتری وفادار' },
  { icon: 'shieldCheck', node: <AnimatedNumber to={100} prefix="+" suffix="٪" />, unit: '', sub: 'ضمانت اصالت کالا' },
  { icon: 'truck', node: <span>ارسال سراسری</span>, unit: '', sub: 'به سراسر ایران' },
];

const why = [
  { icon: 'gem', title: 'کیفیت بی‌نظیر', sub: 'استفاده از بهترین متریال‌ها' },
  { icon: 'shieldCheck', title: 'ضمانت اصالت', sub: 'با خیال راحت خرید کنید' },
  { icon: 'headset', title: 'پشتیبانی حرفه‌ای', sub: 'همیشه در کنار شما هستیم' },
  { icon: 'gift', title: 'بسته‌بندی لوکس', sub: 'هدیه‌ای خاص برای شما' },
];

const marquee = ['کیفیت بی‌نظیر', 'ضمانت اصالت', 'طراحی خاص', 'بسته‌بندی لوکس', 'پشتیبانی حرفه‌ای', 'ارسال سراسری'];

const steps = [
  { icon: 'gem', title: 'انتخاب دقیق', sub: 'گزینش بهترین متریال و سنگ‌ها' },
  { icon: 'ring', title: 'طراحی و ساخت', sub: 'ساخت با دقت و ظرافت' },
  { icon: 'shieldCheck', title: 'کنترل اصالت', sub: 'بررسی کیفیت پیش از ارسال' },
  { icon: 'gift', title: 'بسته‌بندی لوکس', sub: 'هدیه‌ای آماده‌ی اهدا' },
  { icon: 'truck', title: 'ارسال سراسری', sub: 'تحویل امن به سراسر ایران' },
];

const values = [
  { icon: 'gem', tag: 'کیفیت', title: 'ظرافت در جزئیات', sub: 'هر قطعه با وسواس بررسی می‌شود تا درخششی ماندگار داشته باشد.' },
  { icon: 'shieldCheck', tag: 'اعتماد', title: 'خریدی بی‌دغدغه', sub: 'اصالت کالا و پشتیبانی همراه شماست؛ پیش و پس از خرید.' },
  { icon: 'gift', tag: 'تجربه', title: 'لحظه‌ای خاص', sub: 'از بسته‌بندی تا تحویل، همه چیز برای شادی شما طراحی شده است.' },
];

export const metadata = {
  title: 'درباره ما | PARTO',
  description: 'داستانی از عشق، زیبایی و اعتماد؛ با پرتو و جواهرات ماندگار آشنا شوید.',
};

export default function AboutPage() {
  return (
    <main className="relative bg-[#f6ebe0] min-h-screen w-full overflow-x-hidden font-sans text-[#2a170e]">
      <Header />
      <PageHero title="درباره ما" subtitle="داستانی از عشق، زیبایی و اعتماد" crumb="درباره ما" />

      <div className="mx-auto -mt-2 w-full max-w-[1200px] space-y-8 px-5 pb-14 lg:px-11">
        {/* معرفی + ویترین متحرک */}
        <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.12fr] lg:gap-12">
          <Reveal className="text-center lg:px-4">
            <Ornament className="mx-auto mb-6 w-full max-w-[420px]" />
            <h2 className="text-[28px] font-bold leading-snug text-[#2a170e]">
              پرتو؛ درخشش{' '}
              <span className="bg-gradient-to-l from-[#7a4a2c] via-[#b9825a] to-[#7a4a2c] bg-clip-text text-transparent">
                ماندگار
              </span>{' '}
              زیبایی
            </h2>
            <p className="mx-auto mt-5 max-w-[470px] text-[14px] leading-[2.2] text-[#4a2f20]">
              ما در پرتو باور داریم که زیورآلات، تنها یک اکسسوری نیستند؛
              <br />
              بلکه داستانی از عشق، زیبایی و اعتماد هستند.
              <br />
              با بیش از چندین سال تجربه در طراحی و عرضه جواهرات خاص و باکیفیت،
              <br />
              همواره در تلاشیم تا درخشش لحظه‌های خاص زندگی شما باشیم.
            </p>
            <DarkBtn href="/product" className="mt-7 h-[46px] px-9">
              بیشتر بدانید <Ico name="arrowL" className="h-[18px] w-[18px]" sw={1.8} />
            </DarkBtn>
          </Reveal>

          <IntroShowcase />
        </section>

        <Reveal><MarqueeStrip words={marquee} /></Reveal>

        {/* آمار */}
        <Reveal>
          <ul className="border border-[#e8d6c4] bg-white/90 shadow-[0_10px_30px_rgba(90,58,40,0.08)] relative grid grid-cols-2 overflow-hidden rounded-[26px] py-7 lg:grid-cols-4">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#c9946e] to-transparent"
            />
            {stats.map((s) => (
              <li
                key={s.sub}
                className="group flex flex-col items-center gap-1 border-[#a67a5c]/35 px-3 py-3 text-center lg:border-l lg:py-0 lg:first:border-l-0"
              >
                <span className="grid h-[58px] w-[58px] place-items-center rounded-full border border-[#a67a5c]/40 bg-white/40 transition duration-500 group-hover:-translate-y-1 group-hover:bg-white/70 group-hover:shadow-[0_10px_22px_rgba(110,72,46,0.22)]">
                  <Ico name={s.icon} className="h-[30px] w-[30px] text-[#3a2418]" sw={1.2} />
                </span>
                <div className="mt-2 text-[21px] font-bold text-[#2a170e]">
                  {s.node}
                  {s.unit && <span className="mr-1.5">{s.unit}</span>}
                </div>
                <div className="text-[12px] text-[#7a5a48]">{s.sub}</div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* چرا پرتو؟ */}
        <section aria-labelledby="why-title">
          <Reveal>
            <div className="flex items-center gap-4 py-2">
              <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-[#7a4a2c]/55 to-transparent" />
              <h2 id="why-title" className="text-[23px] font-bold text-[#2a170e]">
                چرا پرتو؟
              </h2>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[#7a4a2c]/55 to-transparent" />
            </div>
          </Reveal>
          <ul className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {why.map((w, i) => (
              <li key={w.title}>
                <Reveal delay={i * 0.1}>
                  <div className="border border-[#e8d6c4] bg-white/90 shadow-[0_10px_30px_rgba(90,58,40,0.08)] group relative flex h-full flex-col items-center overflow-hidden rounded-[22px] px-4 pb-6 pt-6 text-center transition duration-500 hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(110,72,46,0.25)]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[#d9b99a]/0 blur-2xl transition duration-700 group-hover:bg-[#d9b99a]/50"
                    />
                    <span className="relative grid h-[58px] w-[58px] place-items-center rounded-full border border-[#a67a5c]/40 bg-white/40 transition duration-700 group-hover:rotate-[360deg] group-hover:bg-white/80">
                      <Ico name={w.icon} className="h-[30px] w-[30px] text-[#3a2418]" sw={1.2} />
                    </span>
                    <h3 className="relative mt-3 text-[16px] font-bold text-[#2a170e]">{w.title}</h3>
                    <p className="relative mt-1.5 text-[12px] text-[#7a5a48]">{w.sub}</p>
                    <span
                      aria-hidden
                      className="absolute inset-x-6 bottom-0 h-[2px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#7a4a2c] to-transparent transition duration-700 group-hover:scale-x-100"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* مسیر یک قطعه */}
        <section aria-labelledby="steps-title" className="pt-4">
          <Reveal>
            <div className="mb-8 flex items-center gap-4">
              <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-[#7a4a2c]/55 to-transparent" />
              <h2 id="steps-title" className="text-[23px] font-bold text-[#2a170e]">از انتخاب تا درخشش</h2>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[#7a4a2c]/55 to-transparent" />
            </div>
          </Reveal>
          <ProcessSteps steps={steps} />
        </section>

        {/* ارزش‌ها */}
        <section aria-labelledby="values-title" className="pt-4">
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-[#7a4a2c]/55 to-transparent" />
              <h2 id="values-title" className="text-[23px] font-bold text-[#2a170e]">آنچه به آن باور داریم</h2>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[#7a4a2c]/55 to-transparent" />
            </div>
          </Reveal>
          <GlowCards items={values} />
        </section>

        {/* رویای ما */}
        <Reveal>
          <section className="border border-[#e8d6c4] bg-white/90 shadow-[0_10px_30px_rgba(90,58,40,0.08)] relative overflow-hidden rounded-[26px]">
            <Bg
              src={IMG.bracelet}
              fallback="linear-gradient(135deg,#f3d5bd,#d6a783)"
              pos="right center"
              className="absolute inset-y-0 right-0 w-full opacity-90 lg:w-[60%]"
              style={{
                WebkitMaskImage: 'linear-gradient(to left,#000 55%,transparent)',
                maskImage: 'linear-gradient(to left,#000 55%,transparent)',
              }}
            />
            <Sparkles count={8} />
            <div className="relative px-6 py-12 text-center sm:px-10 lg:mr-auto lg:w-[46%] lg:py-14">
              <h2 className="text-[25px] font-bold text-[#2a170e]">رویای ما، درخشش شماست...</h2>
              <p className="mx-auto mt-3 max-w-[380px] text-[13px] leading-8 text-[#4a2f20]">
                در پرتو: هر قطعه جواهر با دقت و عشق انتخاب می‌شود
                <br />
                تا بخشی از زیباترین لحظات زندگی شما باشد.
              </p>
              <Ornament className="mx-auto mt-5 w-full max-w-[330px]" />
            </div>
          </section>
        </Reveal>

        {/* دعوت نهایی */}
        <Reveal>
          <section className="border border-[#e8d6c4] bg-white/90 shadow-[0_10px_30px_rgba(90,58,40,0.08)] relative overflow-hidden rounded-[26px] px-6 py-12 text-center">
            <Sparkles count={6} />
            <Ornament className="mx-auto mb-5 w-full max-w-[300px]" />
            <h2 className="text-[24px] font-bold text-[#2a170e]">آماده‌اید که بدرخشید؟</h2>
            <p className="mx-auto mt-3 max-w-[420px] text-[13px] leading-8 text-[#4a2f20]">
              مجموعه‌ی جواهرات پرتو را ببینید و قطعه‌ای را انتخاب کنید که داستان شما را روایت کند.
            </p>
            <DarkBtn href="/product" className="mt-6 h-[46px] px-9">
              مشاهده محصولات <Ico name="arrowL" className="h-[18px] w-[18px]" sw={1.8} />
            </DarkBtn>
          </section>
        </Reveal>
      </div>

      <Footer className="mt-6" />
    </main>
  );
}
