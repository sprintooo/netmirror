/**
 * "NetMirror" wordmark + glyph. The glyph is a stylized red "N" ribbon
 * mark drawn as a crisp vector so it stays sharp at any resolution.
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
            <stop offset="0%" stopColor="#ff3b46" />
            <stop offset="55%" stopColor="#e50914" />
            <stop offset="100%" stopColor="#a30009" />
          </linearGradient>
          <linearGradient id="logoShine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Flowing "N" ribbon: curved left post, sweeping diagonal, rising right post */}
        <path
          d="M8 24 C6.8 16.5 7.2 9.5 10 9 C12.8 8.5 13.8 14.5 15.5 18.5 C17.5 23.2 19.6 24.8 22 22.5 C24.4 20.2 25 12.5 24 8"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 24 C6.8 16.5 7.2 9.5 10 9 C12.8 8.5 13.8 14.5 15.5 18.5 C17.5 23.2 19.6 24.8 22 22.5 C24.4 20.2 25 12.5 24 8"
          fill="none"
          stroke="url(#logoShine)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withText && (
        <span className="logo-wordmark text-xl sm:text-2xl">
          Net<span className="text-white/90">Mirror</span>
        </span>
      )}
    </span>
  );
}
