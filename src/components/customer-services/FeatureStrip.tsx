import { Ico } from '@/components/icons/Ico';

/** نوار چند ستونی با جداکننده عمودی (مزایا) */
export function FeatureStrip({
  items, className = '',
}: { items: { icon: string; title: string; sub: string }[]; className?: string }) {
  return (
    <div className={`parto-card grid grid-cols-2 rounded-[26px] py-5 lg:grid-cols-4 lg:py-6 ${className}`}>
      {items.map((f) => (
        <div key={f.title} className="flex flex-col items-center gap-1 border-[#a67a5c]/35 px-3 py-3 text-center lg:border-l lg:py-0 lg:first:border-l-0">
          <Ico name={f.icon} className="h-[34px] w-[34px] text-[#3a2418]" sw={1.2} />
          <div className="mt-1 text-[15px] font-bold text-[#2a170e]">{f.title}</div>
          <div className="text-[12px] text-[#7a5a48]">{f.sub}</div>
        </div>
      ))}
    </div>
  );
}
