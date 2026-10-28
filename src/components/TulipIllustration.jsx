import React from 'react';

const PALETTES = {
  'rose-pastel': {
    outerStart: '#F9DCE5',
    outerEnd: '#EC95B2',
    innerStart: '#FCEEF2',
    innerEnd: '#E06C93',
    centerStart: '#FFF5F8',
    centerEnd: '#F4BFD0',
    glow: 'rgba(236, 149, 178, 0.45)',
  },
  'blush-pink': {
    outerStart: '#FCEEF2',
    outerEnd: '#F4BFD0',
    innerStart: '#FFF8FA',
    innerEnd: '#EC95B2',
    centerStart: '#FFFFFF',
    centerEnd: '#F9DCE5',
    glow: 'rgba(244, 191, 208, 0.5)',
  },
  'cream-pearl': {
    outerStart: '#FFFDFB',
    outerEnd: '#F5E1DA',
    innerStart: '#FFFFFF',
    innerEnd: '#F4BFD0',
    centerStart: '#FFFDFB',
    centerEnd: '#FCEEF2',
    glow: 'rgba(249, 220, 229, 0.5)',
  },
  'coral-soft': {
    outerStart: '#FDE8E8',
    outerEnd: '#F096A5',
    innerStart: '#FFF2F2',
    innerEnd: '#E37488',
    centerStart: '#FFF9F9',
    centerEnd: '#F7BDC6',
    glow: 'rgba(240, 150, 165, 0.45)',
  },
  'berry-silk': {
    outerStart: '#F4BFD0',
    outerEnd: '#C94B76',
    innerStart: '#F9DCE5',
    innerEnd: '#A8385E',
    centerStart: '#FCEEF2',
    centerEnd: '#E06C93',
    glow: 'rgba(201, 75, 118, 0.42)',
  },
};

export function TulipIllustration({
  variant = 'rose-pastel',
  isBloomed = false,
  size = 'md',
  className = '',
  idSuffix = '1',
}) {
  const palette = PALETTES[variant] || PALETTES['rose-pastel'];
  const uid = `tulip-${variant}-${idSuffix}`;

  const dimensions = {
    sm: 'w-20 h-32',
    md: 'w-28 h-44',
    lg: 'w-40 h-60',
  }[size] || 'w-28 h-44';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Soft Halo Glow when bloomed */}
      <div
        className={`absolute top-2 w-20 h-20 rounded-full blur-xl transition-all duration-700 pointer-events-none ${
          isBloomed ? 'opacity-90 scale-125' : 'opacity-25 scale-90 group-hover:opacity-60'
        }`}
        style={{ background: palette.glow }}
      />

      <svg
        viewBox="0 0 140 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        <defs>
          <linearGradient id={`${uid}-stem`} x1="70" y1="90" x2="70" y2="215" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#769B80" />
            <stop offset="100%" stopColor="#35503D" />
          </linearGradient>

          <linearGradient id={`${uid}-leaf`} x1="40" y1="120" x2="95" y2="215" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#89AC92" />
            <stop offset="50%" stopColor="#557D60" />
            <stop offset="100%" stopColor="#35503D" />
          </linearGradient>

          <linearGradient id={`${uid}-inner`} x1="70" y1="15" x2="70" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={palette.innerStart} />
            <stop offset="100%" stopColor={palette.innerEnd} />
          </linearGradient>

          <linearGradient id={`${uid}-outer`} x1="45" y1="20" x2="95" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={palette.outerStart} />
            <stop offset="100%" stopColor={palette.outerEnd} />
          </linearGradient>

          <linearGradient id={`${uid}-center`} x1="70" y1="18" x2="70" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={palette.centerStart} />
            <stop offset="65%" stopColor={palette.outerStart} />
            <stop offset="100%" stopColor={palette.centerEnd} />
          </linearGradient>
        </defs>

        {/* Botanical Stem */}
        <path
          d="M70 98 C69 135, 72 175, 70 215"
          stroke={`url(#${uid}-stem)`}
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* Left Graceful Tulip Leaf */}
        <path
          d="M69 212 C48 188, 26 156, 32 118 C44 138, 60 165, 69 194 Z"
          fill={`url(#${uid}-leaf)`}
          className="transition-transform duration-700 origin-bottom"
          style={{
            transform: isBloomed ? 'rotate(-5deg)' : 'rotate(0deg)',
          }}
        />

        {/* Right Graceful Tulip Leaf */}
        <path
          d="M71 208 C92 182, 114 148, 106 112 C92 134, 78 162, 71 190 Z"
          fill={`url(#${uid}-leaf)`}
          opacity="0.92"
          className="transition-transform duration-700 origin-bottom"
          style={{
            transform: isBloomed ? 'rotate(5deg)' : 'rotate(0deg)',
          }}
        />

        {/* Back Inner Petal */}
        <path
          d="M70 16 C52 34, 48 68, 70 98 C92 68, 88 34, 70 16 Z"
          fill={`url(#${uid}-inner)`}
          className="transition-all duration-700 origin-bottom"
          style={{
            transform: isBloomed ? 'scaleY(1.04) translateY(-3px)' : 'scaleY(0.95)',
          }}
        />

        {/* Subtle Golden Stamens visible when bloomed */}
        <g
          className={`transition-opacity duration-700 ${
            isBloomed ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <line x1="65" y1="62" x2="62" y2="38" stroke="#E6B655" strokeWidth="2" strokeLinecap="round" />
          <circle cx="62" cy="36" r="3" fill="#F4C96B" />
          <line x1="70" y1="60" x2="70" y2="33" stroke="#E6B655" strokeWidth="2" strokeLinecap="round" />
          <circle cx="70" cy="31" r="3.2" fill="#FFE08A" />
          <line x1="75" y1="62" x2="78" y2="38" stroke="#E6B655" strokeWidth="2" strokeLinecap="round" />
          <circle cx="78" cy="36" r="3" fill="#F4C96B" />
        </g>

        {/* Left Wing Petal (Opens outward on bloom) */}
        <path
          d="M70 99 C42 96, 32 66, 45 26 C58 36, 68 62, 70 99 Z"
          fill={`url(#${uid}-outer)`}
          className="transition-transform duration-700 ease-out"
          style={{
            transformOrigin: '70px 99px',
            transform: isBloomed ? 'rotate(-18deg) translateX(-3px)' : 'rotate(-3deg)',
          }}
        />

        {/* Right Wing Petal (Opens outward on bloom) */}
        <path
          d="M70 99 C98 96, 108 66, 95 26 C82 36, 72 62, 70 99 Z"
          fill={`url(#${uid}-outer)`}
          className="transition-transform duration-700 ease-out"
          style={{
            transformOrigin: '70px 99px',
            transform: isBloomed ? 'rotate(18deg) translateX(3px)' : 'rotate(3deg)',
          }}
        />

        {/* Front Cupped Center Petal */}
        <path
          d="M70 22 C49 42, 47 82, 70 101 C93 82, 91 42, 70 22 Z"
          fill={`url(#${uid}-center)`}
          stroke="rgba(255, 255, 255, 0.65)"
          strokeWidth="1"
          className="transition-transform duration-700"
          style={{
            transformOrigin: '70px 101px',
            transform: isBloomed ? 'scaleX(1.06)' : 'scaleX(0.96)',
          }}
        />

        {/* Botanical Silk Vein Highlight on Front Petal */}
        <path
          d="M70 30 C68 52, 68 76, 70 95"
          stroke="rgba(255, 255, 255, 0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Sparkle Dewdrops when bloomed */}
        {isBloomed && (
          <g className="animate-pulse">
            <circle cx="34" cy="28" r="2.5" fill="#F4BFD0" />
            <circle cx="106" cy="24" r="2" fill="#EC95B2" />
            <path
              d="M70 4 L72 9 L77 11 L72 13 L70 18 L68 13 L63 11 L68 9 Z"
              fill="#E5B869"
              opacity="0.85"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

export function HeroTulipBouquet() {
  return (
    <div className="relative w-72 h-80 sm:w-80 sm:h-96 flex items-center justify-center select-none">
      {/* Warm Romantic Aura */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-tulip-200/60 via-tulip-100/40 to-cream-100/20 blur-2xl animate-pulse-soft" />

      {/* Back Left Tulip */}
      <div className="absolute -left-2 top-8 -rotate-12 scale-90 animate-sway-slow">
        <TulipIllustration variant="cream-pearl" isBloomed={true} size="md" idSuffix="hero-1" />
      </div>

      {/* Back Right Tulip */}
      <div className="absolute -right-2 top-8 rotate-12 scale-90 animate-sway">
        <TulipIllustration variant="coral-soft" isBloomed={true} size="md" idSuffix="hero-2" />
      </div>

      {/* Mid Left Tulip */}
      <div className="absolute left-6 top-4 -rotate-6 scale-95 animate-sway">
        <TulipIllustration variant="blush-pink" isBloomed={true} size="md" idSuffix="hero-3" />
      </div>

      {/* Mid Right Tulip */}
      <div className="absolute right-6 top-4 rotate-6 scale-95 animate-sway-slow">
        <TulipIllustration variant="berry-silk" isBloomed={true} size="md" idSuffix="hero-4" />
      </div>

      {/* Center Queen Tulip */}
      <div className="relative z-10 -top-2 scale-110 animate-float">
        <TulipIllustration variant="rose-pastel" isBloomed={true} size="lg" idSuffix="hero-center" />
      </div>

      {/* Silk Ribbon Bow at the stems */}
      <div className="absolute bottom-7 z-20 flex flex-col items-center">
        <div className="px-4 py-1 rounded-full bg-gradient-to-r from-tulip-300 via-tulip-200 to-tulip-300 border border-white/80 shadow-md text-[11px] font-medium tracking-widest uppercase text-tulip-900">
          18 Meses · Para Ti
        </div>
      </div>
    </div>
  );
}
