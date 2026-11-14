import { DiamondLogo } from '@/components/icons/Ico';

export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 text-[#7a4a2c] ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-l from-[#7a4a2c]/70 to-transparent" />
      <DiamondLogo className="h-[20px] w-[24px]" />
      <span className="h-px flex-1 bg-gradient-to-r from-[#7a4a2c]/70 to-transparent" />
    </div>
  );
}
