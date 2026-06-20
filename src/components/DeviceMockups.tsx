/**
 * Original SVG device mockups used as visually-similar placeholders.
 * They depict a generic streaming UI (rows of poster tiles) — no
 * real posters, logos, or copyrighted artwork are included.
 */
import type { SVGProps } from "react";

const tile = (x: number, y: number, w: number, h: number, o = 0.9) => (
  <rect
    key={`${x}-${y}`}
    x={x}
    y={y}
    width={w}
    height={h}
    rx="3"
    fill="url(#tileGrad)"
    opacity={o}
  />
);

function Defs() {
  return (
    <defs>
      <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#16161d" />
        <stop offset="100%" stopColor="#0a0a0e" />
      </linearGradient>
      <linearGradient id="tileGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2a2a36" />
        <stop offset="100%" stopColor="#181820" />
      </linearGradient>
      <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff3b46" />
        <stop offset="60%" stopColor="#E50914" />
        <stop offset="100%" stopColor="#7d0710" />
      </linearGradient>
      <linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2c2c34" />
        <stop offset="100%" stopColor="#0c0c10" />
      </linearGradient>
    </defs>
  );
}

export function PhoneMockup(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 440" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Defs />
      <rect x="8" y="6" width="204" height="428" rx="34" fill="url(#bezel)" />
      <rect x="14" y="12" width="192" height="416" rx="28" fill="url(#screenGrad)" />
      {/* notch */}
      <rect x="86" y="20" width="48" height="9" rx="4.5" fill="#000" />
      {/* hero banner */}
      <rect x="24" y="40" width="172" height="96" rx="8" fill="url(#heroGrad)" opacity="0.92" />
      <rect x="34" y="100" width="70" height="8" rx="4" fill="#fff" opacity="0.85" />
      <rect x="34" y="114" width="46" height="6" rx="3" fill="#fff" opacity="0.55" />
      {/* row 1 */}
      <rect x="24" y="150" width="60" height="7" rx="3.5" fill="#fff" opacity="0.5" />
      {tile(24, 164, 50, 70)}
      {tile(80, 164, 50, 70)}
      {tile(136, 164, 50, 70)}
      {/* row 2 */}
      <rect x="24" y="248" width="48" height="7" rx="3.5" fill="#fff" opacity="0.5" />
      {tile(24, 262, 50, 70)}
      {tile(80, 262, 50, 70)}
      {tile(136, 262, 50, 70)}
      {/* tab bar */}
      <rect x="14" y="396" width="192" height="32" rx="0" fill="#0c0c12" />
      <circle cx="50" cy="412" r="5" fill="#E50914" />
      <circle cx="92" cy="412" r="5" fill="#3a3a44" />
      <circle cx="134" cy="412" r="5" fill="#3a3a44" />
      <circle cx="176" cy="412" r="5" fill="#3a3a44" />
    </svg>
  );
}

export function DesktopMockup(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 460 320" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Defs />
      {/* screen */}
      <rect x="10" y="8" width="440" height="270" rx="14" fill="url(#bezel)" />
      <rect x="18" y="16" width="424" height="254" rx="10" fill="url(#screenGrad)" />
      {/* top bar */}
      <rect x="18" y="16" width="424" height="26" rx="0" fill="#0c0c12" />
      <circle cx="34" cy="29" r="3.5" fill="#E50914" />
      <rect x="46" y="26" width="34" height="6" rx="3" fill="#fff" opacity="0.5" />
      <rect x="352" y="25" width="74" height="9" rx="4.5" fill="#E50914" opacity="0.9" />
      {/* hero */}
      <rect x="34" y="56" width="392" height="118" rx="10" fill="url(#heroGrad)" opacity="0.92" />
      <rect x="50" y="120" width="150" height="11" rx="5.5" fill="#fff" opacity="0.9" />
      <rect x="50" y="138" width="96" height="8" rx="4" fill="#fff" opacity="0.55" />
      {/* row */}
      <rect x="34" y="188" width="90" height="8" rx="4" fill="#fff" opacity="0.5" />
      {tile(34, 202, 70, 56)}
      {tile(112, 202, 70, 56)}
      {tile(190, 202, 70, 56)}
      {tile(268, 202, 70, 56)}
      {tile(346, 202, 70, 56)}
      {/* stand */}
      <rect x="200" y="278" width="60" height="16" fill="#1a1a22" />
      <rect x="160" y="294" width="140" height="10" rx="5" fill="#23232e" />
    </svg>
  );
}

export function TvMockup(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 460 320" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Defs />
      <rect x="6" y="6" width="448" height="268" rx="16" fill="url(#bezel)" />
      <rect x="16" y="16" width="428" height="248" rx="10" fill="url(#screenGrad)" />
      <rect x="36" y="40" width="260" height="150" rx="10" fill="url(#heroGrad)" opacity="0.9" />
      <rect x="312" y="40" width="108" height="150" rx="10" fill="url(#tileGrad)" />
      <rect x="52" y="150" width="150" height="12" rx="6" fill="#fff" opacity="0.9" />
      <rect x="52" y="170" width="92" height="8" rx="4" fill="#fff" opacity="0.55" />
      {tile(36, 206, 84, 44)}
      {tile(128, 206, 84, 44)}
      {tile(220, 206, 84, 44)}
      {tile(312, 206, 108, 44)}
      {/* legs */}
      <rect x="70" y="274" width="14" height="26" rx="3" fill="#1a1a22" />
      <rect x="376" y="274" width="14" height="26" rx="3" fill="#1a1a22" />
    </svg>
  );
}
