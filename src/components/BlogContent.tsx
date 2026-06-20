import Link from "next/link";
import type { ContentBlock, TextSpan } from "@/content/blog/types";

/** Render a single text span — a plain string or an inline link. */
function renderSpan(span: TextSpan, key: number) {
  if (typeof span === "string") return <span key={key}>{span}</span>;
  const isInternal = span.href.startsWith("/") || span.href.startsWith("#");
  const className =
    "font-medium text-brand-400 underline decoration-brand-500/40 underline-offset-2 transition-colors hover:text-brand-300";
  return isInternal ? (
    <Link key={key} href={span.href} className={className}>
      {span.text}
    </Link>
  ) : (
    <a
      key={key}
      href={span.href}
      className={className}
      rel="noopener noreferrer"
    >
      {span.text}
    </a>
  );
}

/**
 * Renders an article body (an ordered list of typed blocks) into clean,
 * crawlable, semantic HTML with proper H2/H3 headings, lists and quotes.
 * Server component — no client JS — so the markup is fully present in the
 * statically generated page for search engines.
 */
export default function BlogContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="font-display text-xl font-semibold tracking-tight text-white"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-base leading-relaxed text-white/75">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="ml-1 space-y-2 text-base leading-relaxed text-white/75"
              >
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={i}
                className="ml-1 space-y-2 text-base leading-relaxed text-white/75"
              >
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
                      {j + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-brand-500 pl-5 text-lg font-medium italic text-white/85"
              >
                {block.text}
              </blockquote>
            );
          case "rich":
            return (
              <p key={i} className="text-base leading-relaxed text-white/75">
                {block.spans.map((span, j) => renderSpan(span, j))}
              </p>
            );
          case "links":
            return (
              <ul
                key={i}
                className="ml-1 space-y-2 text-base leading-relaxed text-white/75"
              >
                {block.items.map((item, j) => {
                  const isInternal =
                    item.href.startsWith("/") || item.href.startsWith("#");
                  const label = (
                    <span className="font-semibold text-brand-400 transition-colors group-hover:text-brand-300">
                      {item.label}
                    </span>
                  );
                  return (
                    <li key={j} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                      <span>
                        {isInternal ? (
                          <Link href={item.href} className="group">
                            {label}
                          </Link>
                        ) : (
                          <a href={item.href} className="group" rel="noopener noreferrer">
                            {label}
                          </a>
                        )}
                        {item.description ? (
                          <span className="text-white/65"> — {item.description}</span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
