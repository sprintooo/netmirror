/**
 * Original, lightweight inline SVG icons drawn for this clone.
 * No third-party / copyrighted artwork is used.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5 16 12l-6 3.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HdIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M7 10v4M7 12h2.4M9.4 10v4" />
      <path d="M13 10v4h1.6a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2H13z" />
    </svg>
  );
}

export function NoAdsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8" />
      <path d="M9 14v-4l3 4v-4" />
    </svg>
  );
}

export function DevicesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="13" height="9" rx="1.6" />
      <path d="M2.5 17h13" />
      <rect x="16.5" y="9" width="5" height="9" rx="1.2" />
    </svg>
  );
}

export function OttIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16.5V20" />
      <path d="M10.5 8.3 14 10.5l-3.5 2.2z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function AudioIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9v6h3l5 4V5L7 9H4z" />
      <path d="M16 8.5a4 4 0 0 1 0 7" />
      <path d="M18.5 6a7 7 0 0 1 0 12" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function AndroidGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 9.5a1 1 0 0 0-1 1V16a1 1 0 0 0 1 1h.5v2.2a1.3 1.3 0 0 0 2.6 0V17h1.8v2.2a1.3 1.3 0 0 0 2.6 0V17h.5a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1H6zM3.8 9.5a1.3 1.3 0 0 0-1.3 1.3v4.4a1.3 1.3 0 0 0 2.6 0v-4.4A1.3 1.3 0 0 0 3.8 9.5zM20.2 9.5a1.3 1.3 0 0 0-1.3 1.3v4.4a1.3 1.3 0 0 0 2.6 0v-4.4a1.3 1.3 0 0 0-1.3-1.3zM15.5 8.3H8.5c.1-1.7 1-3.1 2.3-3.9l-.9-1.6a.3.3 0 0 1 .5-.3l1 1.7c.5-.2 1-.3 1.6-.3s1.1.1 1.6.3l1-1.7a.3.3 0 0 1 .5.3l-.9 1.6c1.3.8 2.2 2.2 2.3 3.9h-.5zM10 6.6a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2zM14 6.6a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2z" />
    </svg>
  );
}

export function AppleGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.4 12.8c0-2 1.6-2.9 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.4 2 2.5 2 1 0 1.3-.6 2.5-.6s1.5.6 2.5.6c1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.2-.8-2.4-3.1zM14.6 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.7-.4 2.3-1.1z" />
    </svg>
  );
}

export function ComputerGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="11" rx="1.8" />
      <path d="M8.5 20h7M12 15.5V20" />
    </svg>
  );
}

export function TvGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="12" rx="1.8" />
      <path d="M8 20.5l4-3 4 3" />
    </svg>
  );
}
