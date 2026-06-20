/**
 * Original "NetMirror" wordmark + glyph. The glyph is an original
 * mirrored play-arrow mark drawn for this clone (not a copied logo).
 */
interface LogoProps {
  className?: string;
  withText?: boolean;
}

export default function Logo({ className = "", withText = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="drop-shadow-[0_0_12px_rgba(229,9,20,0.6)]"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff4d57" />
            <stop offset="100%" stopColor="#c1070f" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="28" height="28" rx="8" fill="#0b0b0f" stroke="rgba(255,255,255,0.08)" />
        <path d="M11 9 L17 16 L11 23 Z" fill="url(#logoGrad)" />
        <path d="M21 9 L15 16 L21 23 Z" fill="url(#logoGrad)" opacity="0.45" />
      </svg>
      {withText && (
        <span className="logo-wordmark text-xl sm:text-2xl">
          Net<span className="text-white/90">Mirror</span>
        </span>
      )}
    </span>
  );
}
