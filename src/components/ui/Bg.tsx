import React from 'react';

/** تصویر پس‌زمینه با گرادیانت جایگزین تا اگر فایل نبود، صفحه خالی نماند */
export function Bg({
  src, fallback = 'linear-gradient(135deg,#ecd0b6,#b98d68)', pos = 'center', size = 'cover', className = '', style, children,
}: {
  src: string; fallback?: string; pos?: string; size?: string; className?: string; style?: React.CSSProperties; children?: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{ backgroundImage: `url("${src}"), ${fallback}`, backgroundSize: `${size}, cover`, backgroundPosition: `${pos}, center`, backgroundRepeat: 'no-repeat', ...style }}
    >
      {children}
    </div>
  );
}
