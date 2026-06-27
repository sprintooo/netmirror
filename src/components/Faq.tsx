import Link from "next/link";

/**
 * Reusable FAQ section.
 *
 * Renders an accessible, no-JavaScript accordion (native <details>) AND emits
 * matching FAQPage JSON-LD so the questions are eligible for rich results in
 * Google. Answers are plain text (so the structured data stays clean), with an
 * optional list of internal links shown under each answer to strengthen
 * internal linking and topical clustering.
 *
 * Styling mirrors the existing FAQ blocks on the blog and movie pages so the
 * UI stays consistent.
 */

export interface FaqLink {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  /** Plain-text answer — used both in the visible UI and the JSON-LD. */
  answer: string;
  /** Optional "learn more" internal links rendered beneath the answer. */
  links?: FaqLink[];
}

export default function Faq({
  items,
  heading = "Frequently asked questions",
  id = "faq-heading",
  className = "",
}: {
  items: FaqItem[];
  heading?: string;
  id?: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section aria-labelledby={id} className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id={id}
          className="text-center font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {heading}
        </h2>
        <div className="mt-8 space-y-3">
          {items.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/10 bg-ink-900/60 p-5 open:bg-ink-900"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className="text-brand-400 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {faq.answer}
              </p>
              {faq.links && faq.links.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {faq.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
                      >
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
